class PresentationManager {
    constructor(config) {
        this.deck = new Reveal(config);
        this.initialize();
        this.setupEventListeners();
    }

    async initialize() {
        await this.deck.initialize();
        this.updateAll();
    }

    setupEventListeners() {
        this.deck.addEventListener('slidechanged', () => this.updateAll());
        document.addEventListener('scroll', this.handleScroll.bind(this), true);
    }

    updateAll() {
        this.updateChapterIndicator();
        this.updatePageNumber();
        this.updateNavigationVisibility();
        this.highlightCode();
        this.processTextBlocks();
        this.scrollToTop(); // Reset scroll position on slide change
    }

    updateChapterIndicator() {
        const indices = this.deck.getIndices();
        const currentSection = document.querySelector('.reveal .slides').children[indices.h];
        const chapterTitle = currentSection?.getAttribute('data-chapter') || `Chapter ${indices.h + 1}`;
        
        document.getElementById('current-chapter').textContent = chapterTitle;
        
        const subsections = currentSection?.querySelectorAll('section');
        const subsectionElement = document.getElementById('current-subsection');
        if (subsections?.length > 1 && indices.v > 0) {
            subsectionElement.textContent = subsections[indices.v].getAttribute('data-title') || 
                `Section ${indices.v}`;
        } else {
            subsectionElement.textContent = '';
        }
    }

    updatePageNumber() {
        const indices = this.deck.getIndices();
        let currentPage = 1;
        let totalPages = 0;

        const sections = document.querySelectorAll('.reveal .slides > section');
        
        // Calculate total pages
        sections.forEach(section => {
            const verticalSlides = section.querySelectorAll('section');
            totalPages += verticalSlides.length || 1;
        });

        // Calculate current page
        for (let h = 0; h < indices.h; h++) {
            const section = sections[h];
            const verticalSlides = section.querySelectorAll('section');
            currentPage += verticalSlides.length || 1;
        }
        
        // Add current vertical slide position
        if (indices.v > 0) {
            currentPage += indices.v;
        }

        document.querySelector('.page-number').textContent = `Page ${currentPage} of ${totalPages}`;
    }

    updateNavigationVisibility() {
        const indices = this.deck.getIndices();
        const currentSection = document.querySelector('.reveal .slides').children[indices.h];
        const upButton = document.querySelector('.nav-up');
        const downButton = document.querySelector('.nav-down');

        if (currentSection) {
            const verticalSlides = currentSection.querySelectorAll('section');
            const hasVerticalSlides = verticalSlides.length > 1;
            
            upButton.style.display = hasVerticalSlides && indices.v > 0 ? 'flex' : 'none';
            downButton.style.display = hasVerticalSlides && indices.v < verticalSlides.length - 1 ? 'flex' : 'none';
        }
    }

    processTextBlocks() {
        document.querySelectorAll('code.language-text').forEach(code => {
            if (code.textContent.includes('Examples:')) {
                code.parentElement.classList.add('example-block');
                code.innerHTML = code.textContent
                    .split('\n')
                    .map(line => line.trim().startsWith('-') ? 
                        `<span class="list-item">${line.trim().substring(1).trim()}</span>` : 
                        line)
                    .join('\n');
            }
        });
    }

    highlightCode() {
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightBlock(block);
        });
    }

    handleScroll(event) {
        const currentSlide = document.querySelector('.reveal .slides section.present');
        const scrollTopButton = document.querySelector('.scroll-top');
        
        if (currentSlide && scrollTopButton) {
            scrollTopButton.classList.toggle('visible', currentSlide.scrollTop > 100);
        }
    }

    scrollToTop() {
        const currentSlide = document.querySelector('.reveal .slides section.present');
        if (currentSlide) {
            currentSlide.scrollTop = 0;
        }
    }

    navigate(direction) {
        switch(direction) {
            case 'left':
                this.deck.left();
                break;
            case 'right':
                this.deck.right();
                break;
            case 'up':
                this.deck.up();
                break;
            case 'down':
                this.deck.down();
                break;
        }
    }
}