import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ItemStore from './ItemStore'
import ItemWidget from './ItemWidget'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ItemStore />
  </React.StrictMode>
)
