import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './results.css'
import './dashboard.css'
import './quality.css'
import './features/charts/charts.css'
import './features/history/history.css'
import './features/badges/badges.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
