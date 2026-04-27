import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1a1614',
          color: '#faf8f4',
          borderRadius: '0.5rem',
          fontFamily: 'var(--font-body)'
        },
        success: {
          iconTheme: {
            primary: '#8ba378',
            secondary: '#faf8f4',
          },
        },
        error: {
          iconTheme: {
            primary: '#c44536',
            secondary: '#faf8f4',
          },
        },
      }}
    />
  </React.StrictMode>,
)
