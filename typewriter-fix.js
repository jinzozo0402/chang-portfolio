/**
 * ENHANCED TYPEWRITER EFFECT
 * Supports HTML tags and creates smooth typing animation
 */

class TypewriterEffect {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.options = {
            speed: 100,
            deleteSpeed: 50,
            pauseTime: 200,
            cursorClass: 'typewriter-cursor',
            showCursor: true,
            ...options
        };
        
        this.isTyping = false;
        this.currentIndex = 0;
        this.currentTextIndex = 0;
        this.content = [];
    }
    
    // Parse HTML content into structured format
    parseContent(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${htmlString}</div>`, 'text/html');
        const container = doc.body.firstChild;
        
        return this.parseNode(container);
    }
    
    parseNode(node) {
        const result = [];
        
        for (let child of node.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent;
                if (text.trim()) {
                    result.push({ type: 'text', content: text });
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                const tagName = child.tagName.toLowerCase();
                
                if (tagName === 'br') {
                    result.push({ type: 'break' });
                } else {
                    // Open tag
                    const attributes = Array.from(child.attributes)
                        .map(attr => `${attr.name}="${attr.value}"`)
                        .join(' ');
                    
                    result.push({ 
                        type: 'open', 
                        tag: tagName, 
                        attributes: attributes 
                    });
                    
                    // Recursive content
                    result.push(...this.parseNode(child));
                    
                    // Close tag
                    result.push({ type: 'close', tag: tagName });
                }
            }
        }
        
        return result;
    }
    
    // Type content with structured format
    typeContent(content) {
        if (!this.element) return Promise.reject('Element not found');
        
        this.content = Array.isArray(content) ? content : this.parseContent(content);
        this.element.innerHTML = '';
        this.currentIndex = 0;
        this.currentTextIndex = 0;
        this.isTyping = true;
        
        // Add cursor if enabled
        if (this.options.showCursor) {
            this.addCursor();
        }
        
        return new Promise((resolve) => {
            this.typeStep(resolve);
        });
    }
    
    typeStep(resolve) {
        if (this.currentIndex >= this.content.length) {
            this.isTyping = false;
            if (this.options.showCursor) {
                this.removeCursor();
            }
            resolve();
            return;
        }
        
        const current = this.content[this.currentIndex];
        
        switch (current.type) {
            case 'open':
                this.addOpenTag(current);
                this.nextStep(this.options.pauseTime, resolve);
                break;
                
            case 'close':
                this.addCloseTag(current);
                this.nextStep(this.options.pauseTime, resolve);
                break;
                
            case 'break':
                this.addBreak();
                this.nextStep(this.options.pauseTime, resolve);
                break;
                
            case 'text':
                this.typeText(current, resolve);
                break;
        }
    }
    
    addOpenTag(tagInfo) {
        const cursor = this.element.querySelector(`.${this.options.cursorClass}`);
        const tagHTML = tagInfo.attributes ? 
            `<${tagInfo.tag} ${tagInfo.attributes}>` : 
            `<${tagInfo.tag}>`;
        
        if (cursor) {
            cursor.insertAdjacentHTML('beforebegin', tagHTML);
        } else {
            this.element.insertAdjacentHTML('beforeend', tagHTML);
        }
        
        this.currentIndex++;
    }
    
    addCloseTag(tagInfo) {
        const cursor = this.element.querySelector(`.${this.options.cursorClass}`);
        const tagHTML = `</${tagInfo.tag}>`;
        
        if (cursor) {
            cursor.insertAdjacentHTML('beforebegin', tagHTML);
        } else {
            this.element.insertAdjacentHTML('beforeend', tagHTML);
        }
        
        this.currentIndex++;
    }
    
    addBreak() {
        const cursor = this.element.querySelector(`.${this.options.cursorClass}`);
        
        if (cursor) {
            cursor.insertAdjacentHTML('beforebegin', '<br>');
        } else {
            this.element.insertAdjacentHTML('beforeend', '<br>');
        }
        
        this.currentIndex++;
    }
    
    typeText(textInfo, resolve) {
        if (this.currentTextIndex < textInfo.content.length) {
            const char = textInfo.content.charAt(this.currentTextIndex);
            const cursor = this.element.querySelector(`.${this.options.cursorClass}`);
            
            if (cursor) {
                cursor.insertAdjacentText('beforebegin', char);
            } else {
                this.element.insertAdjacentText('beforeend', char);
            }
            
            this.currentTextIndex++;
            setTimeout(() => this.typeStep(resolve), this.options.speed);
        } else {
            this.currentTextIndex = 0;
            this.currentIndex++;
            this.nextStep(this.options.pauseTime, resolve);
        }
    }
    
    nextStep(delay, resolve) {
        setTimeout(() => this.typeStep(resolve), delay);
    }
    
    addCursor() {
        this.element.insertAdjacentHTML('beforeend', `<span class="${this.options.cursorClass}">|</span>`);
        
        // Add CSS for cursor animation
        if (!document.querySelector('#typewriter-cursor-style')) {
            const style = document.createElement('style');
            style.id = 'typewriter-cursor-style';
            style.textContent = `
                .${this.options.cursorClass} {
                    animation: typewriter-blink 1s infinite;
                    color: var(--color-accent, #ff6b6b);
                }
                
                @keyframes typewriter-blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    removeCursor() {
        const cursor = this.element.querySelector(`.${this.options.cursorClass}`);
        if (cursor) {
            cursor.remove();
        }
    }
    
    // Clear all content
    clear() {
        if (this.element) {
            this.element.innerHTML = '';
        }
    }
    
    // Stop current typing
    stop() {
        this.isTyping = false;
    }
}

// Enhanced initialization function for portfolio
function initEnhancedTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const typewriter = new TypewriterEffect(heroTitle, {
        speed: 80,
        pauseTime: 150,
        showCursor: true
    });
    
    const content = `<span class="highlight">VIDEO EDITOR</span><br>JUNIOR`;
    
    // Start typing after page load
    setTimeout(() => {
        typewriter.typeContent(content).then(() => {
            console.log('🎬 Typewriter effect completed!');
        });
    }, 1500);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TypewriterEffect, initEnhancedTypewriter };
} else if (typeof window !== 'undefined') {
    window.TypewriterEffect = TypewriterEffect;
    window.initEnhancedTypewriter = initEnhancedTypewriter;
}