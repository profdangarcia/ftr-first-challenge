import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { AppRoutes } from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
    <ToastContainer position="top-right" />
  </StrictMode>,
)
