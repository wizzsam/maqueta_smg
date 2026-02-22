import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ServiciosPage from './pages/ServiciosPage'
import ProyectosPage from './pages/ProyectosPage'
import ContactoPage from './pages/ContactoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/proyectos" element={<ProyectosPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
