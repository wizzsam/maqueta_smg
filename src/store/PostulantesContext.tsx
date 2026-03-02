import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface Postulante {
    id: string
    nombre: string
    dni: string
    profesion: string
    experiencia: string
    correo: string
    puestos: string[]
    fecha: string // ISO
}

interface PostulantesContextType {
    postulantes: Postulante[]
    addPostulante: (data: Omit<Postulante, 'id' | 'fecha'>) => Postulante
}

const PostulantesContext = createContext<PostulantesContextType | null>(null)
const STORAGE_KEY = 'smg_postulantes'

function generateId() {
    return 'P-' + Math.floor(10000000 + Math.random() * 90000000)
}

function load(): Postulante[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export function PostulantesProvider({ children }: { children: ReactNode }) {
    const [postulantes, setPostulantes] = useState<Postulante[]>(load)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(postulantes))
    }, [postulantes])

    const addPostulante = (data: Omit<Postulante, 'id' | 'fecha'>): Postulante => {
        const nuevo: Postulante = {
            ...data,
            id: generateId(),
            fecha: new Date().toISOString(),
        }
        setPostulantes(prev => [nuevo, ...prev])
        return nuevo
    }

    return (
        <PostulantesContext.Provider value={{ postulantes, addPostulante }}>
            {children}
        </PostulantesContext.Provider>
    )
}

export function usePostulantes() {
    const ctx = useContext(PostulantesContext)
    if (!ctx) throw new Error('usePostulantes must be inside PostulantesProvider')
    return ctx
}
