/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        //  フェードインアニメーション
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        //  フェネック用の上下アニメーションを追加
        wiggle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        //  既存の fade-in アニメーション（そのまま残す）
        'fade-in-up': 'fade-in-up 0.6s ease-out',

        //  フェネックの wiggle アニメーション（ループ付き）
        'wiggle': 'wiggle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
