import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { AnnotatorProvider } from './context/AnnotatorContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnnotatorProvider>
      <App />
    </AnnotatorProvider>
  </StrictMode>,
)