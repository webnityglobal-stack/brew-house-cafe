/** @type {import('tailwindcss').Config} */
export default { content: ['./index.html','./src/**/*.{js,jsx}'], theme: { extend: { colors: { cream:'#f6f1e8', ink:'#24231f', coffee:'#6f4935', rust:'#bd704b', sage:'#7b8064' }, fontFamily: { sans:['DM Sans','sans-serif'], display:['Playfair Display','serif'] }, boxShadow:{ soft:'0 16px 45px rgba(50,35,25,.09)' } } }, plugins: [] };
