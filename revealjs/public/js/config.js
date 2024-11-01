const presentationConfig = {
    plugins: [RevealMarkdown],
    transition: 'slide',
    center: true,
    overview: true,
    keyboard: true,
    touch: true,
    progress: true,
    slideNumber: false,
    markdown: {
        separator: '\n# ',
        verticalSeparator: '\n## ',
        highlight: (code, language) => {
            return language ? 
                hljs.highlight(code, { language }).value : 
                hljs.highlightAuto(code).value;
        }
    }
};