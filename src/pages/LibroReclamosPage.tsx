import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useReclamos, type Reclamo, type EstadoReclamo } from '../store/ReclamosContext'

const tiposSolicitud = ['Reclamo', 'Queja', 'Sugerencia']

const estadoColors: Record<EstadoReclamo, string> = {
    Pendiente: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'En Proceso': 'bg-blue-100 text-blue-700 border-blue-200',
    Atendido: 'bg-green-100 text-green-700 border-green-200',
    Rechazado: 'bg-red-100 text-red-700 border-red-200',
}

function formatFecha(iso: string) {
    return new Date(iso).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ---- Success Modal ----
function SuccessModal({ reclamo, onClose }: { reclamo: Reclamo; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-md shadow-2xl text-center p-8 z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 mx-auto mb-5">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    ¡Solicitud Registrada!
                </h3>
                <p className="text-gray-500 text-sm mb-5">
                    Tu {reclamo.tipo.toLowerCase()} fue recibido correctamente.
                </p>

                <div className="bg-gray-50 border border-gray-200 p-4 mb-5 text-left space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-medium">ID de seguimiento</span>
                        <span className="font-black text-[#cc0000]">{reclamo.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-medium">Estado inicial</span>
                        <span className="font-semibold text-yellow-600">Pendiente</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-medium">Plazo de respuesta</span>
                        <span className="font-semibold text-gray-700">15 días hábiles</span>
                    </div>
                </div>

                <p className="text-xs text-gray-400 mb-5">
                    Guarda tu ID de seguimiento. Puedes consultarlo debajo del formulario.
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-3.5 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold uppercase tracking-wider text-sm transition-all"
                >
                    Ver mis reclamos
                </button>
            </div>
        </div>
    )
}

export default function LibroReclamosPage() {
    const { addReclamo, getByCorreo } = useReclamos()

    const [form, setForm] = useState({
        nombre: '',
        dni: '',
        correo: '',
        tipo: 'Reclamo' as 'Reclamo' | 'Queja' | 'Sugerencia',
        detalle: '',
        pedido: '',
    })
    const [nuevoReclamo, setNuevoReclamo] = useState<Reclamo | null>(null)
    const [showModal, setShowModal] = useState(false)

    // Tracking section
    const [correoTracking, setCorreoTracking] = useState('')
    const [misReclamos, setMisReclamos] = useState<Reclamo[] | null>(null)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const isValid =
        form.nombre.trim() &&
        form.dni.trim().length >= 8 &&
        form.correo.includes('@') &&
        form.tipo &&
        form.detalle.trim().length >= 20 &&
        form.pedido.trim().length >= 5

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isValid) return
        const nuevo = addReclamo({ ...form })
        setNuevoReclamo(nuevo)
        setShowModal(true)
        setCorreoTracking(form.correo)
        setForm({ nombre: '', dni: '', correo: '', tipo: 'Reclamo', detalle: '', pedido: '' })
    }

    const handleTracking = (e: React.FormEvent) => {
        e.preventDefault()
        setMisReclamos(getByCorreo(correoTracking))
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
            <Navbar />

            {/* Success modal */}
            {showModal && nuevoReclamo && (
                <SuccessModal
                    reclamo={nuevoReclamo}
                    onClose={() => {
                        setShowModal(false)
                        setMisReclamos(getByCorreo(correoTracking))
                        document.getElementById('seguimiento')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                />
            )}

            {/* Hero banner */}
            <div className="relative h-56 md:h-72 overflow-hidden">
                <img src="/img_2.jpg" alt="Libro de Reclamos" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-10 w-full">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-px w-8 bg-[#cc0000]" />
                            <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Responsabilidad Social</span>
                        </div>
                        <h1
                            className="text-white text-5xl md:text-6xl font-black uppercase"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            Libro de <span className="text-[#cc0000]">Reclamos</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* LEFT — Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-10 bg-[#cc0000]" />
                            <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Portal Oficial</span>
                        </div>
                        <h2
                            className="text-gray-900 text-4xl font-black uppercase leading-tight mb-5"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            SGM Montajes<br />S.A.C.
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            Completa el formulario con precisión. Atendemos tu solicitud en un plazo máximo de{' '}
                            <strong className="text-gray-800">15 días hábiles</strong> conforme a la Ley N° 29571.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Proceso protegido', desc: 'Tu reclamo es registrado conforme al Código de Protección y Defensa del Consumidor.' },
                                { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Respuesta en 15 días', desc: 'Garantizamos respuesta dentro del plazo legal establecido por la Ley N° 29571.' },
                                { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Notificación por correo', desc: 'Recibirás confirmación y seguimiento de tu solicitud en el correo registrado.' },
                            ].map(({ icon, title, desc }) => (
                                <div key={title} className="flex items-start gap-4 group">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#cc0000]/10 group-hover:bg-[#cc0000] flex items-center justify-center transition-colors duration-300">
                                        <svg className="w-5 h-5 text-[#cc0000] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-800 font-semibold text-sm mb-0.5">{title}</p>
                                        <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-start gap-3 bg-[#cc0000]/5 border border-[#cc0000]/20 p-4">
                            <svg className="w-4 h-4 text-[#cc0000] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                <span className="font-bold text-[#cc0000]">Aviso legal: </span>
                                Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571), esta solicitud será atendida en un plazo máximo de <strong>15 días hábiles</strong> calendario.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT — Form */}
                    <div className="border-l border-gray-100 lg:pl-16">
                        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
                            <div className="w-12 h-12 bg-[#cc0000] flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-gray-900 text-2xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                                    Libro de Reclamaciones
                                </h2>
                                <p className="text-gray-400 text-xs">SGM Montajes S.A.C. – Portal oficial</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                        Nombre completo <span className="text-[#cc0000]">*</span>
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Juan Pérez García"
                                            className="w-full pl-9 pr-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm placeholder-gray-300 transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                        DNI / CE <span className="text-[#cc0000]">*</span>
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                        </svg>
                                        <input type="text" name="dni" value={form.dni} onChange={handleChange} required maxLength={12} placeholder="12345678"
                                            className="w-full pl-9 pr-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm placeholder-gray-300 transition-colors" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                        Correo Gmail <span className="text-[#cc0000]">*</span>
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <input type="email" name="correo" value={form.correo} onChange={handleChange} required placeholder="nombre@gmail.com"
                                            className="w-full pl-9 pr-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm placeholder-gray-300 transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                        Tipo de solicitud <span className="text-[#cc0000]">*</span>
                                    </label>
                                    <select name="tipo" value={form.tipo} onChange={handleChange}
                                        className="w-full px-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm bg-white appearance-none transition-colors">
                                        {tiposSolicitud.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Detalle del incidente <span className="text-[#cc0000]">*</span>
                                </label>
                                <textarea name="detalle" value={form.detalle} onChange={handleChange} required rows={4}
                                    placeholder="Describe con detalle lo ocurrido, incluyendo fecha, hora y circunstancias del incidente..."
                                    className="w-full px-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm placeholder-gray-300 transition-colors resize-none" />
                                <div className={`text-right text-xs mt-1 ${form.detalle.length < 20 ? 'text-gray-400' : 'text-green-500'}`}>
                                    {form.detalle.length} / mín. 20 caracteres
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Pedido del consumidor <span className="text-[#cc0000]">*</span>
                                </label>
                                <textarea name="pedido" value={form.pedido} onChange={handleChange} required rows={3}
                                    placeholder="¿Qué solución, compensación o acción solicitas a la empresa?"
                                    className="w-full px-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm placeholder-gray-300 transition-colors resize-none" />
                            </div>

                            <div className="flex items-start gap-3 bg-[#cc0000]/5 border border-[#cc0000]/20 p-4">
                                <svg className="w-4 h-4 text-[#cc0000] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    <span className="font-bold text-[#cc0000]">Aviso legal: </span>
                                    Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571), esta solicitud será atendida en un plazo máximo de <strong>15 días hábiles</strong> calendario.
                                </p>
                            </div>

                            <button type="submit" disabled={!isValid}
                                className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-3 ${isValid
                                    ? 'bg-[#cc0000] hover:bg-[#aa0000] text-white hover:shadow-[0_4px_20px_rgba(204,0,0,0.4)] hover:-translate-y-0.5'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Enviar solicitud
                            </button>
                        </form>
                    </div>
                </div>

                {/* ── Seguimiento section ── */}
                <div id="seguimiento" className="mt-20 pt-10 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-px w-10 bg-[#cc0000]" />
                        <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Seguimiento</span>
                    </div>
                    <h2 className="text-gray-900 text-3xl font-black uppercase mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Mis Reclamos
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">Ingresa tu correo para consultar el estado de tus solicitudes.</p>

                    <form onSubmit={handleTracking} className="flex gap-3 max-w-md mb-8">
                        <input
                            type="email"
                            value={correoTracking}
                            onChange={e => setCorreoTracking(e.target.value)}
                            placeholder="tucorreo@gmail.com"
                            required
                            className="flex-1 px-4 py-3 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-sm text-gray-800 placeholder-gray-300 transition-colors"
                        />
                        <button type="submit"
                            className="px-6 py-3 bg-[#cc0000] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#aa0000] transition-colors">
                            Buscar
                        </button>
                    </form>

                    {misReclamos !== null && (
                        misReclamos.length === 0 ? (
                            <div className="flex items-center gap-3 text-gray-400 text-sm py-6">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                No se encontraron solicitudes con ese correo.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {misReclamos.map(r => (
                                    <div key={r.id} className="border border-gray-100 hover:border-[#cc0000]/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">ID</p>
                                                <p className="font-black text-[#cc0000] text-sm">{r.id}</p>
                                            </div>
                                            <div className="h-8 w-px bg-gray-200 self-center hidden sm:block" />
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">{formatFecha(r.fecha)}</p>
                                                <p className="font-semibold text-gray-800 text-sm line-clamp-1">{r.detalle}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span className={`text-xs font-bold px-2.5 py-1 border rounded-full ${estadoColors[r.estado]}`}>
                                                {r.estado}
                                            </span>
                                            <span className="text-xs text-gray-400">{r.tipo}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>

            <Footer />

            {/* WhatsApp */}
            <a href="https://wa.me/51941532345" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="fixed bottom-8 right-6 z-40 w-14 h-14 bg-[#25d366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </div>
    )
}
