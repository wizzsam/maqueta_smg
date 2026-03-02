import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface ConvocatoriaAdmin {
    id: string
    titulo: string
    profesionObjetivo: string // 'Todas' or specific profession
    descripcion: string
    requisitos: string
    limite: string
    fecha: string // ISO created date
}

interface ConvocatoriasAdminContextType {
    convocatorias: ConvocatoriaAdmin[]
    addConvocatoria: (data: Omit<ConvocatoriaAdmin, 'id' | 'fecha'>) => void
    removeConvocatoria: (id: string) => void
}

const ConvocatoriasAdminContext = createContext<ConvocatoriasAdminContextType | null>(null)
const STORAGE_KEY = 'smg_convocatorias_admin'

function load(): ConvocatoriaAdmin[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export function ConvocatoriasAdminProvider({ children }: { children: ReactNode }) {
    const [convocatorias, setConvocatorias] = useState<ConvocatoriaAdmin[]>(load)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(convocatorias))
    }, [convocatorias])

    const addConvocatoria = (data: Omit<ConvocatoriaAdmin, 'id' | 'fecha'>) => {
        const nueva: ConvocatoriaAdmin = {
            ...data,
            id: 'C-' + Math.floor(10000000 + Math.random() * 90000000),
            fecha: new Date().toISOString(),
        }
        setConvocatorias(prev => [nueva, ...prev])
    }

    const removeConvocatoria = (id: string) => {
        setConvocatorias(prev => prev.filter(c => c.id !== id))
    }

    return (
        <ConvocatoriasAdminContext.Provider value={{ convocatorias, addConvocatoria, removeConvocatoria }}>
            {children}
        </ConvocatoriasAdminContext.Provider>
    )
}

export function useConvocatoriasAdmin() {
    const ctx = useContext(ConvocatoriasAdminContext)
    if (!ctx) throw new Error('useConvocatoriasAdmin must be inside ConvocatoriasAdminProvider')
    return ctx
}
