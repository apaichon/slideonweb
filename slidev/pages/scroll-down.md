# 1. Basic Code Scrolling
```html
<style>
/* Enable scrolling for code blocks */
.slidev-code-scroll .slidev-code {
  max-height: 400px;
  overflow-y: auto;
}

/* Add a fade effect at the bottom */
.slidev-code-scroll .slidev-code::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(transparent, var(--slidev-code-background));
  pointer-events: none;
}
</style>
```

```javascript
// Your long code here
const config = {
  // Basic settings
  plugins: [RevealMarkdown],
  transition: 'slide',
  center: true,
  overview: true,
  keyboard: true,
  touch: true,
  progress: true,
  slideNumber: false,

  // Markdown settings
  markdown: {
    separator: '\n# ',
    verticalSeparator: '\n## ',
    highlight: (code, language) => {
      return language ? 
        hljs.highlight(code, { language }).value : 
        hljs.highlightAuto(code).value;
    }
  },

  // Additional configuration
  dependencies: [
    { src: 'plugin/markdown/marked.js' },
    { src: 'plugin/markdown/markdown.js' },
    { src: 'plugin/notes/notes.js', async: true },
    { src: 'plugin/highlight/highlight.js', async: true }
  ],

  // Theme settings
  theme: {
    colors: {
      primary: '#42b883',
      secondary: '#35495e'
    },
    fonts: {
      sans: 'Roboto, sans-serif',
      mono: 'Fira Code, monospace'
    }
  },

  // More settings...
  // This code block will scroll
};
```