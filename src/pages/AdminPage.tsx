import { useState, useMemo } from 'react'
import { useReclamos, type EstadoReclamo, type Reclamo } from '../store/ReclamosContext'
import ConvocatoriasAdminModule from './ConvocatoriasAdminModule'

const ESTADOS: EstadoReclamo[] = ['Pendiente', 'En Proceso', 'Atendido', 'Rechazado']

const estadoColors: Record<EstadoReclamo, string> = {
    Pendiente: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'En Proceso': 'bg-blue-100 text-blue-700 border-blue-300',
    Atendido: 'bg-green-100 text-green-700 border-green-300',
    Rechazado: 'bg-red-100 text-red-700 border-red-300',
}

const tipoColors: Record<string, string> = {
    Reclamo: 'bg-red-50 text-red-600 border-red-300',
    Queja: 'bg-orange-50 text-orange-600 border-orange-300',
    Sugerencia: 'bg-purple-50 text-purple-600 border-purple-300',
}

function formatFecha(iso: string) {
    return new Date(iso).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
}

function GestionModal({ reclamo, onClose, onSave }: {
    reclamo: Reclamo
    onClose: () => void
    onSave: (id: string, estado: EstadoReclamo) => void
}) {
    const [estado, setEstado] = useState<EstadoReclamo>(reclamo.estado)
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        onSave(reclamo.id, estado)
        setSaved(true)
        setTimeout(() => { setSaved(false); onClose() }, 1200)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
                className="relative bg-white w-full max-w-lg shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#cc0000]" />
                        <div>
                            <p className="font-bold text-gray-900 text-base">Gestión de solicitud</p>
                            <p className="text-xs text-gray-400">ID {reclamo.id}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                    {/* Data grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'USUARIO', value: reclamo.nombre },
                            { label: 'DNI / CE', value: reclamo.dni },
                            { label: 'FECHA', value: formatFecha(reclamo.fecha) },
                            { label: 'CORREO', value: reclamo.correo },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-gray-50 px-4 py-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                                <p className="text-gray-800 font-semibold text-sm break-all">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tipo + Estado */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 px-4 py-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">TIPO</p>
                            <span className={`text-xs font-bold px-2.5 py-1 border rounded-full ${tipoColors[reclamo.tipo]}`}>
                                {reclamo.tipo}
                            </span>
                        </div>
                        <div className="bg-gray-50 px-4 py-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">ESTADO ACTUAL</p>
                            <span className={`text-xs font-bold px-2.5 py-1 border rounded-full ${estadoColors[reclamo.estado]}`}>
                                {reclamo.estado}
                            </span>
                        </div>
                    </div>

                    {/* Detalle */}
                    <div className="bg-gray-50 px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">DETALLE DEL INCIDENTE</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{reclamo.detalle}</p>
                    </div>

                    {/* Pedido */}
                    <div className="bg-gray-50 px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">PEDIDO DEL CONSUMIDOR</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{reclamo.pedido}</p>
                    </div>

                    {/* Cambiar estado */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                            Cambiar estado
                        </label>
                        <select
                            value={estado}
                            onChange={e => setEstado(e.target.value as EstadoReclamo)}
                            className="w-full px-4 py-3 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm bg-white"
                        >
                            {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-gray-300 text-gray-600 font-semibold text-sm uppercase tracking-wider hover:border-gray-500 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className={`flex-1 py-3 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${saved
                            ? 'bg-green-500 text-white'
                            : 'bg-[#cc0000] hover:bg-[#aa0000] text-white hover:shadow-[0_4px_15px_rgba(204,0,0,0.35)]'
                            }`}
                    >
                        {saved ? (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Guardado
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                Guardar y notificar
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function AdminPage({ onBack }: { onBack: () => void }) {
    const { reclamos, updateEstado } = useReclamos()
    const [modulo, setModulo] = useState<'reclamos' | 'convocatorias'>('reclamos')
    const [filtroEstado, setFiltroEstado] = useState<'Todos' | EstadoReclamo>('Todos')
    const [filtroTipo, setFiltroTipo] = useState<string>('Todos')
    const [gestionando, setGestionando] = useState<Reclamo | null>(null)

    const filtrados = useMemo(() => {
        return reclamos.filter(r => {
            if (filtroEstado !== 'Todos' && r.estado !== filtroEstado) return false
            if (filtroTipo !== 'Todos' && r.tipo !== filtroTipo) return false
            return true
        })
    }, [reclamos, filtroEstado, filtroTipo])

    const total = reclamos.length
    const atendidos = reclamos.filter(r => r.estado === 'Atendido').length
    const pendientes = reclamos.filter(r => r.estado === 'Pendiente').length
    const enProceso = reclamos.filter(r => r.estado === 'En Proceso').length

    const stats = [
        { label: 'Total registros', value: total, color: 'bg-[#cc0000]', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', sub: null },
        { label: 'Atendidos', value: atendidos, color: 'bg-green-500', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', sub: total ? `${Math.round((atendidos / total) * 100)}% resueltos` : '0% resueltos' },
        { label: 'Pendientes', value: pendientes, color: 'bg-yellow-500', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', sub: null },
        { label: 'En proceso', value: enProceso, color: 'bg-blue-500', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', sub: null },
    ]

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Top bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <button
                            onClick={onBack}
                            className="text-gray-400 hover:text-[#cc0000] transition-colors mr-1"
                            title="Volver"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="h-3 w-0.5 bg-[#cc0000]" />
                        <h1 className="font-black text-xl text-gray-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            Panel de Administración
                        </h1>
                    </div>
                    <p className="text-xs text-gray-400 ml-8">Gestión de quejas y reclamos · SGM Montajes</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Module nav */}
                    {([
                        { key: 'reclamos', label: 'Reclamos', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                        { key: 'convocatorias', label: 'Convocatorias', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
                    ] as const).map(({ key, label, icon }) => (
                        <button
                            key={key}
                            onClick={() => setModulo(key)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${modulo === key
                                    ? 'bg-[#cc0000] text-white'
                                    : 'text-gray-500 hover:text-gray-800 border border-gray-200 bg-white'
                                }`}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                            </svg>
                            {label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Sistema activo
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
                {modulo === 'convocatorias' ? (
                    <ConvocatoriasAdminModule />
                ) : (<>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map(({ label, value, color, icon, sub }) => (
                            <div key={label} className="bg-white border border-gray-100 p-5 shadow-sm">
                                <div className={`w-11 h-11 ${color} flex items-center justify-center mb-3`}>
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                                    </svg>
                                </div>
                                <p className="text-3xl font-black text-gray-900 mb-0.5">{value}</p>
                                <p className="text-sm font-semibold text-gray-600">{label}</p>
                                {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Table card */}
                    <div className="bg-white border border-gray-100 shadow-sm">
                        {/* Filters bar */}
                        <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 flex-wrap">
                            <div className="flex items-center gap-2 text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-wider">Filtros</span>
                            </div>
                            <select
                                value={filtroEstado}
                                onChange={e => setFiltroEstado(e.target.value as any)}
                                className="border border-gray-200 text-sm px-3 py-1.5 text-gray-700 focus:outline-none focus:border-[#cc0000] bg-white"
                            >
                                <option value="Todos">Todos</option>
                                {ESTADOS.map(e => <option key={e}>{e}</option>)}
                            </select>
                            <select
                                value={filtroTipo}
                                onChange={e => setFiltroTipo(e.target.value)}
                                className="border border-gray-200 text-sm px-3 py-1.5 text-gray-700 focus:outline-none focus:border-[#cc0000] bg-white"
                            >
                                <option value="Todos">Todos</option>
                                {['Reclamo', 'Queja', 'Sugerencia'].map(t => <option key={t}>{t}</option>)}
                            </select>
                            <span className="ml-auto text-xs text-gray-400 font-medium">
                                {filtrados.length} / {total} registros
                            </span>
                        </div>

                        {/* Table */}
                        {filtrados.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-sm font-medium">No hay registros con estos filtros</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            {['Fecha', 'Usuario', 'DNI', 'Tipo', 'Estado', 'Acción'].map(h => (
                                                <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtrados.map(r => (
                                            <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {formatFecha(r.fecha)}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="font-bold text-gray-800 text-sm">{r.nombre}</p>
                                                    <p className="text-xs text-gray-400">{r.correo}</p>
                                                </td>
                                                <td className="px-5 py-4 text-gray-600 text-sm">{r.dni}</td>
                                                <td className="px-5 py-4">
                                                    <span className={`text-xs font-bold px-2.5 py-1 border rounded-full ${tipoColors[r.tipo]}`}>
                                                        {r.tipo}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`text-xs font-bold px-2.5 py-1 border rounded-full ${estadoColors[r.estado]}`}>
                                                        {r.estado}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <button
                                                        onClick={() => setGestionando(r)}
                                                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#cc0000] transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        Gestionar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>)}
            </div>

            {/* Gestión modal */}
            {
                gestionando && (
                    <GestionModal
                        reclamo={gestionando}
                        onClose={() => setGestionando(null)}
                        onSave={(id, estado) => {
                            updateEstado(id, estado)
                            setGestionando(prev => prev ? { ...prev, estado } : null)
                        }}
                    />
                )
            }
        </div >
    )
}
