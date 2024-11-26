/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            container: {
                center: true,
                padding: "1rem",
                screens: {
                    lg: "1200px",
                },
            },
            fontFamily: {
                nerko: ["Nerko One", "cursive"],
            },
            boxShadow: {
                search: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            },
            backgroundImage: {
                "custom-image": "url('/image/bg-image.jpg')",
                "endow-image": "url('/image/350960127.jpeg')",
            },
        },
    },
    plugins: [],
};
