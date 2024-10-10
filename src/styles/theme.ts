const theme = {
    colors: {
        main: "#2979FF",
        hover_main: "#1469F7",
        mainBack:{
            main:'#cadeffdd',
            hover:"#b3caf0dd"
        },
        neutral: {
            f: "#fff",
            fa: "#fafafa",
            e: "#eee",
            c: "#ccc",
            9: "#999",
            7: "#777",
            6: "#666",
            4: "#444",
            3: "#333",
            2: "#222",
            hover: "#f1f2ff"
        }
    },
    breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
} as const;

export type Theme = typeof theme;

export default theme;