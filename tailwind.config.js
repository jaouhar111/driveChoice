/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './src/toastr-tailwind.css'
  ],
  options: {
    safelist: [
      'toast-container',
      'ngx-toastr',
      'toast-success',
      'toast-error',
      'toast-info',
      'toast-warning'
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

