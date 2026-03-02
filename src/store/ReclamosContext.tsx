import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type EstadoReclamo = 'Pendiente' | 'En Proceso' | 'Atendido' | 'Rechazado'
export type TipoReclamo = 'Reclamo' | 'Queja' | 'Sugerencia'

export interface Reclamo {
    id: string
    nombre: string
    dni: string
    correo: string
    tipo: TipoReclamo
    detalle: string
    pedido: string
    estado: EstadoReclamo
    fecha: string // ISO
}

interface ReclamosContextType {
    reclamos: Reclamo[]
    addReclamo: (r: Omit<Reclamo, 'id' | 'estado' | 'fecha'>) => Reclamo
    updateEstado: (id: string, estado: EstadoReclamo) => void
    getByCorreo: (correo: string) => Reclamo[]
}

const ReclamosContext = createContext<ReclamosContextType | null>(null)

const STORAGE_KEY = 'smg_reclamos'

function generateId() {
    return '#' + Math.floor(10000000 + Math.random() * 90000000)
}

function load(): Reclamo[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function save(reclamos: Reclamo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reclamos))
}

export function ReclamosProvider({ children }: { children: ReactNode }) {
    const [reclamos, setReclamos] = useState<Reclamo[]>(load)

    useEffect(() => {
        save(reclamos)
    }, [reclamos])

    const addReclamo = (data: Omit<Reclamo, 'id' | 'estado' | 'fecha'>): Reclamo => {
        const nuevo: Reclamo = {
            ...data,
            id: generateId(),
            estado: 'Pendiente',
            fecha: new Date().toISOString(),
        }
        setReclamos(prev => [nuevo, ...prev])
        return nuevo
    }

    const updateEstado = (id: string, estado: EstadoReclamo) => {
        setReclamos(prev => prev.map(r => (r.id === id ? { ...r, estado } : r)))
    }

    const getByCorreo = (correo: string) =>
        reclamos.filter(r => r.correo.toLowerCase() === correo.toLowerCase())

    return (
        <ReclamosContext.Provider value={{ reclamos, addReclamo, updateEstado, getByCorreo }}>
            {children}
        </ReclamosContext.Provider>
    )
}

export function useReclamos() {
    const ctx = useContext(ReclamosContext)
    if (!ctx) throw new Error('useReclamos must be used inside ReclamosProvider')
    return ctx
}
