import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ServiciosPage from './pages/ServiciosPage'
import ProyectosPage from './pages/ProyectosPage'
import ContactoPage from './pages/ContactoPage'
import ConvocatoriasPage from './pages/ConvocatoriasPage'
import LibroReclamosPage from './pages/LibroReclamosPage'
import AdminPage from './pages/AdminPage'
import RoleSelector from './components/RoleSelector'
import { ReclamosProvider } from './store/ReclamosContext'
import { PostulantesProvider } from './store/PostulantesContext'
import { ConvocatoriasAdminProvider } from './store/ConvocatoriasAdminContext'

type ViewMode = 'select' | 'user' | 'admin'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('select')

  if (viewMode === 'select') {
    return (
      <RoleSelector
        onSelectUser={() => setViewMode('user')}
        onSelectAdmin={() => setViewMode('admin')}
      />
    )
  }

  if (viewMode === 'admin') {
    return (
      <ReclamosProvider>
        <PostulantesProvider>
          <ConvocatoriasAdminProvider>
            <AdminPage onBack={() => setViewMode('select')} />
          </ConvocatoriasAdminProvider>
        </PostulantesProvider>
      </ReclamosProvider>
    )
  }

  return (
    <ReclamosProvider>
      <PostulantesProvider>
        <ConvocatoriasAdminProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/servicios" element={<ServiciosPage />} />
              <Route path="/proyectos" element={<ProyectosPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/convocatorias" element={<ConvocatoriasPage />} />
              <Route path="/libro-reclamos" element={<LibroReclamosPage />} />
            </Routes>
          </BrowserRouter>
        </ConvocatoriasAdminProvider>
      </PostulantesProvider>
    </ReclamosProvider>
  )
}

export default App
