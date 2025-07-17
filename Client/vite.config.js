import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  define: {
    'process.env': {
      VITE_BACKEND_URL: JSON.stringify(process.env.VITE_BACKEND_URL),
      VITE_RAZORPAY_KEY_ID: JSON.stringify(process.env.VITE_RAZORPAY_KEY_ID),
    },

  }
})