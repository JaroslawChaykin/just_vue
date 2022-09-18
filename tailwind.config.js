module.exports = {
    purge: {content: ['./public/**/*.html', './src/**/*.vue']},
    theme: {
        extends: {}
    },
    variants: {
        extends: {}
    },
    plugins: [
      require("@tailwindcss/forms")
    ]
}