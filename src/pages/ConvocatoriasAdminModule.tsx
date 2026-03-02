import { useState, useMemo } from 'react'
import { usePostulantes, type Postulante } from '../store/PostulantesContext'
import { useConvocatoriasAdmin } from '../store/ConvocatoriasAdminContext'

const PROFESIONES = [
    'Todas las profesiones',
    'Ingeniero Civil',
    'Ingeniero Mecánico',
    'Ingeniero Eléctrico',
    'Técnico en Mantenimiento',
    'Operador de Maquinaria',
    'Topógrafo',
    'Administrador',
    'Contador',
    'Abogado',
    'Otro',
]

function initials(nombre: string) {
    return nombre
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

function avatarColor(nombre: string) {
    const colors = [
        'bg-gray-800', 'bg-[#cc0000]', 'bg-blue-600',
        'bg-green-600', 'bg-purple-600', 'bg-orange-500',
    ]
    const idx = nombre.charCodeAt(0) % colors.length
    return colors[idx]
}

function formatFecha(iso: string) {
    return new Date(iso).toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

// ─── Postulantes Tab ─────────────────────────────────────────────────────────
function PostulantesTab({ convocatoriasActivas }: { convocatoriasActivas: number }) {
    const { postulantes } = usePostulantes()
    const [busqueda, setBusqueda] = useState('')
    const [filtroProfesion, setFiltroProfesion] = useState('Todas las profesiones')

    const profesionesUnicas = useMemo(
        () => ['Todas las profesiones', ...new Set(postulantes.map(p => p.profesion))],
        [postulantes]
    )

    const filtrados = useMemo(() => {
        return postulantes.filter(p => {
            const q = busqueda.toLowerCase()
            const matchQuery =
                !q ||
                p.nombre.toLowerCase().includes(q) ||
                p.correo.toLowerCase().includes(q) ||
                p.dni.includes(q) ||
                p.puestos.some(j => j.toLowerCase().includes(q))
            const matchProfesion =
                filtroProfesion === 'Todas las profesiones' || p.profesion === filtroProfesion
            return matchQuery && matchProfesion
        })
    }, [postulantes, busqueda, filtroProfesion])

    const profesionesRegistradas = new Set(postulantes.map(p => p.profesion)).size

    return (
        <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total postulantes', value: postulantes.length, color: 'bg-gray-800', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
                    { label: 'Convocatorias activas', value: convocatoriasActivas, color: 'bg-[#cc0000]', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
                    { label: 'Profesiones registradas', value: profesionesRegistradas, color: 'bg-gray-700', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                ].map(({ label, value, color, icon }) => (
                    <div key={label} className="bg-white border border-gray-100 p-4 flex items-center gap-4 shadow-sm">
                        <div className={`w-11 h-11 ${color} flex items-center justify-center flex-shrink-0`}>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">{value}</p>
                            <p className="text-xs text-gray-500 font-medium">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table card */}
            <div className="bg-white border border-gray-100 shadow-sm">
                {/* Header + filters */}
                <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 flex-wrap">
                    <div className="flex items-center gap-2 mr-2">
                        <svg className="w-4 h-4 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-bold text-gray-800 text-sm">Base de Talento</span>
                    </div>
                    {/* Search */}
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                            placeholder="Buscar..."
                            className="pl-8 pr-3 py-1.5 border border-gray-200 text-sm focus:outline-none focus:border-[#cc0000] w-44"
                        />
                    </div>
                    {/* Profesion filter */}
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                        </svg>
                        <select
                            value={filtroProfesion}
                            onChange={e => setFiltroProfesion(e.target.value)}
                            className="border border-gray-200 text-sm px-2 py-1.5 text-gray-700 focus:outline-none focus:border-[#cc0000] bg-white"
                        >
                            {profesionesUnicas.map(p => <option key={p}>{p}</option>)}
                        </select>
                    </div>
                </div>

                {filtrados.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-14 gap-2 text-gray-400">
                        <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm font-medium">No hay postulantes registrados</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    {['Postulante', 'Profesión', 'Exp.', 'Puestos aspirados', 'Correo', 'Fecha'].map(h => (
                                        <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtrados.map((p: Postulante) => (
                                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-full ${avatarColor(p.nombre)} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                                                    {initials(p.nombre)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 text-sm">{p.nombre}</p>
                                                    <p className="text-xs text-gray-400">DNI: {p.dni}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700">
                                                {p.profesion}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{p.experiencia} años</td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {p.puestos.map(j => (
                                                    <span key={j} className="text-[10px] font-bold px-2 py-0.5 border border-[#cc0000]/40 text-[#cc0000] bg-[#cc0000]/5">
                                                        {j}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-gray-500">{p.correo}</td>
                                        <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">{formatFecha(p.fecha)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="px-5 py-3 border-t border-gray-50 text-xs text-gray-400">
                            Mostrando {filtrados.length} de {postulantes.length} postulantes
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

// ─── Convocatorias Tab ────────────────────────────────────────────────────────
function ConvocatoriasTab() {
    const { convocatorias, addConvocatoria, removeConvocatoria } = useConvocatoriasAdmin()
    const { postulantes } = usePostulantes()
    const [form, setForm] = useState({ titulo: '', profesionObjetivo: 'Todas las profesiones', descripcion: '', requisitos: '', limite: '' })
    const [published, setPublished] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const isValid = form.titulo.trim() && form.descripcion.trim()

    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isValid) return
        addConvocatoria(form)
        setForm({ titulo: '', profesionObjetivo: 'Todas las profesiones', descripcion: '', requisitos: '', limite: '' })
        setPublished(true)
        setTimeout(() => setPublished(false), 2000)
    }

    function perfilesCompatibles(conv: { profesionObjetivo: string }) {
        if (conv.profesionObjetivo === 'Todas las profesiones') return postulantes.length
        return postulantes.filter(p => p.profesion === conv.profesionObjetivo).length
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
            {/* LEFT — Form */}
            <div className="bg-white border border-gray-100 shadow-sm">
                <div className="px-5 py-4 bg-gray-900 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-bold text-white text-sm uppercase tracking-wider">Nueva Convocatoria</span>
                </div>
                <form onSubmit={handlePublish} className="p-5 space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                            Título del puesto <span className="text-[#cc0000]">*</span>
                        </label>
                        <input name="titulo" value={form.titulo} onChange={handleChange} required
                            placeholder="Ej. Desarrollador Backend Senior"
                            className="w-full px-3 py-2.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-sm text-gray-800 placeholder-gray-300" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                            Profesión objetivo
                        </label>
                        <select name="profesionObjetivo" value={form.profesionObjetivo} onChange={handleChange}
                            className="w-full px-3 py-2.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-sm text-gray-800 bg-white appearance-none">
                            {PROFESIONES.map(p => <option key={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                            Descripción <span className="text-[#cc0000]">*</span>
                        </label>
                        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required rows={4}
                            placeholder="Describe el rol y responsabilidades..."
                            className="w-full px-3 py-2.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-sm text-gray-800 placeholder-gray-300 resize-none" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Requisitos</label>
                        <textarea name="requisitos" value={form.requisitos} onChange={handleChange} rows={3}
                            placeholder="Ej. 3+ años de experiencia, inglés B2..."
                            className="w-full px-3 py-2.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-sm text-gray-800 placeholder-gray-300 resize-none" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Fecha límite</label>
                        <input type="date" name="limite" value={form.limite} onChange={handleChange}
                            className="w-full px-3 py-2.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-sm text-gray-800" />
                    </div>
                    <button type="submit" disabled={!isValid}
                        className={`w-full py-3 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${isValid
                            ? published
                                ? 'bg-green-500 text-white'
                                : 'bg-[#cc0000] hover:bg-[#aa0000] text-white hover:shadow-[0_4px_15px_rgba(204,0,0,0.35)]'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                        {published ? (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                ¡Publicada!
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                                Publicar convocatoria
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* RIGHT — List */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                    <span className="font-bold text-gray-800 text-sm uppercase tracking-wider">Convocatorias activas</span>
                    <span className="w-6 h-6 rounded-full bg-[#cc0000] text-white text-xs font-bold flex items-center justify-center">
                        {convocatorias.length}
                    </span>
                </div>

                {convocatorias.length === 0 ? (
                    <div className="bg-white border border-gray-100 p-10 text-center text-gray-400 shadow-sm">
                        <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                        <p className="text-sm font-medium">No hay convocatorias activas</p>
                        <p className="text-xs mt-1">Crea una usando el formulario de la izquierda</p>
                    </div>
                ) : (
                    convocatorias.map(conv => {
                        const compat = perfilesCompatibles(conv)
                        return (
                            <div key={conv.id} className="bg-white border border-gray-100 p-5 shadow-sm hover:border-[#cc0000]/20 transition-colors">
                                <div className="flex items-start justify-between mb-1">
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-base">{conv.titulo}</h3>
                                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{conv.descripcion}</p>
                                    </div>
                                    <button onClick={() => removeConvocatoria(conv.id)}
                                        className="text-gray-300 hover:text-red-500 transition-colors ml-3 flex-shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 mt-3 flex-wrap text-xs text-gray-500">
                                    {conv.requisitos && (
                                        <span>Requisitos: <strong className="text-gray-700">{conv.requisitos.split(',').length}</strong></span>
                                    )}
                                    <span className="px-2.5 py-0.5 border border-[#cc0000]/40 text-[#cc0000] text-[10px] font-bold bg-[#cc0000]/5">
                                        {conv.profesionObjetivo === 'Todas las profesiones' ? 'Administrador' : conv.profesionObjetivo}
                                    </span>
                                    {conv.limite && (
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {conv.limite}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <strong className="text-gray-700">{compat}</strong> perfiles compatibles
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                                    <span className="text-xs text-gray-400">Publicada el {formatFecha(conv.fecha)}</span>
                                    <button className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-gray-900 text-white hover:bg-[#cc0000] transition-colors uppercase tracking-wider">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        Notificar perfiles compatibles
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function ConvocatoriasAdminModule() {
    const [tab, setTab] = useState<'postulantes' | 'convocatorias'>('postulantes')
    const { convocatorias } = useConvocatoriasAdmin()

    return (
        <div className="space-y-5">
            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 w-full max-w-sm">
                {([
                    { key: 'postulantes', label: 'Postulantes', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
                    { key: 'convocatorias', label: 'Convocatorias', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
                ] as const).map(({ key, label, icon }) => (
                    <button
                        key={key}
                        onClick={() => setTab(key)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-all duration-200 ${tab === key
                            ? 'bg-white shadow-sm text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                        </svg>
                        {label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {tab === 'postulantes'
                ? <PostulantesTab convocatoriasActivas={convocatorias.length} />
                : <ConvocatoriasTab />}
        </div>
    )
}
