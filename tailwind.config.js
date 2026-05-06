/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['JetBrains Mono', 'Space Grotesk', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 70px rgba(109, 94, 252, 0.32)',
        glass: '0 24px 80px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'radial-premium': 'radial-gradient(circle at top left, rgba(105, 93, 255, 0.32), transparent 32%), radial-gradient(circle at 70% 20%, rgba(0, 229, 255, 0.18), transparent 26%), radial-gradient(circle at 20% 80%, rgba(255, 70, 170, 0.17), transparent 28%)',
      },
    },
  },
  plugins: [],
};
