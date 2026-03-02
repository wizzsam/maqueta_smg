import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePostulantes } from '../store/PostulantesContext'
import { useConvocatoriasAdmin } from '../store/ConvocatoriasAdminContext'



const profesiones = [
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

const puestos = [
    'Analista Junior',
    'Analista Senior',
    'Coordinador',
    'Jefe de Área',
    'Subgerente',
    'Gerente',
    'Especialista TI',
    'Consultor',
    'Supervisor',
    'Operador',
]

interface FormState {
    nombre: string
    dni: string
    profesion: string
    experiencia: string
    correo: string
    puestosSeleccionados: string[]
}

export default function ConvocatoriasPage() {
    const [form, setForm] = useState<FormState>({
        nombre: '',
        dni: '',
        profesion: '',
        experiencia: '',
        correo: '',
        puestosSeleccionados: [],
    })
    const [sent, setSent] = useState(false)
    const [reviewing, setReviewing] = useState(false)
    const [showActivas, setShowActivas] = useState(false)
    const { addPostulante } = usePostulantes()
    const { convocatorias: convocatoriasActivas } = useConvocatoriasAdmin()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const togglePuesto = (puesto: string) => {
        setForm(prev => ({
            ...prev,
            puestosSeleccionados: prev.puestosSeleccionados.includes(puesto)
                ? prev.puestosSeleccionados.filter(p => p !== puesto)
                : [...prev.puestosSeleccionados, puesto],
        }))
    }

    const isValid =
        form.nombre.trim() &&
        form.dni.trim().length === 8 &&
        form.profesion &&
        form.experiencia.trim() &&
        form.correo.includes('@') &&
        form.puestosSeleccionados.length > 0

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isValid) return
        addPostulante({
            nombre: form.nombre,
            dni: form.dni,
            profesion: form.profesion,
            experiencia: form.experiencia,
            correo: form.correo,
            puestos: form.puestosSeleccionados,
        })
        setSent(true)
        setReviewing(false)
        setForm({ nombre: '', dni: '', profesion: '', experiencia: '', correo: '', puestosSeleccionados: [] })
        setTimeout(() => setSent(false), 5000)
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
            <Navbar />

            {/* Hero banner */}
            <div className="relative h-56 md:h-72 overflow-hidden">
                <img src="/img_1.png" alt="Portal de Convocatorias" className="w-full h-full object-cover" />
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
                            Portal de <span className="text-[#cc0000]">Convocatorias</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* ── Convocatorias Activas Banner ── */}
            <div className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <button
                        onClick={() => setShowActivas(v => !v)}
                        className="w-full flex items-center justify-between py-5 group"
                    >
                        <div className="flex items-center gap-3">
                            {/* megaphone icon */}
                            <div className="w-9 h-9 bg-[#cc0000]/10 group-hover:bg-[#cc0000] flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                                <svg className="w-4 h-4 text-[#cc0000] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </div>
                            <span
                                className="font-bold text-gray-800 text-base"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.05em' }}
                            >
                                CONVOCATORIAS ACTIVAS
                            </span>
                            {/* badge */}
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#cc0000] text-white text-xs font-bold">
                                {convocatoriasActivas.length}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-[#cc0000] transition-colors">
                            <span className="font-semibold uppercase tracking-wider text-xs">{showActivas ? 'Ocultar' : 'Ver todas'}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${showActivas ? 'rotate-180' : ''}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>

                    {/* Expandable cards */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showActivas ? 'max-h-[800px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {convocatoriasActivas.map(conv => (
                                <div
                                    key={conv.id}
                                    className="border border-gray-100 hover:border-[#cc0000]/30 bg-white hover:shadow-[0_4px_20px_rgba(204,0,0,0.08)] transition-all duration-300 p-5 flex flex-col gap-3 relative"
                                >
                                    {/* Header */}
                                    <div>
                                        <h3 className="font-bold text-gray-800 leading-snug" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem' }}>
                                            {conv.titulo}
                                        </h3>
                                        <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">{conv.descripcion}</p>
                                    </div>

                                    {/* Category + Requisitos */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs font-semibold border border-[#cc0000] text-[#cc0000] px-2.5 py-0.5 rounded-full">
                                            {conv.profesionObjetivo === 'Todas las profesiones' ? 'General' : conv.profesionObjetivo}
                                        </span>
                                        {conv.requisitos && (
                                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                <span className="font-semibold text-gray-700">{conv.requisitos.split(',').length}</span> requisitos
                                            </span>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-gray-100" />

                                    {/* Dates */}
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        {conv.limite && (
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>Límite: <strong className="text-gray-600">{conv.limite}</strong></span>
                                            </span>
                                        )}
                                        <span>Publicada: {new Date(conv.fecha).toLocaleDateString('es-PE')}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* LEFT — Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-10 bg-[#cc0000]" />
                            <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Únete a nosotros</span>
                        </div>
                        <h2
                            className="text-gray-900 text-4xl font-black uppercase leading-tight mb-5"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            Forma parte de<br />nuestro equipo
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            En SGM Montajes valoramos el talento y el compromiso. Regístrate en nuestra base de datos
                            y te contactaremos cuando tengamos una vacante que se ajuste a tu perfil.
                        </p>

                        {/* Beneficios */}
                        <div className="space-y-5">
                            {[
                                { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Proceso transparente', desc: 'Evaluaciones claras y justas para todos los postulantes.' },
                                { icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', title: 'Crecimiento profesional', desc: 'Oportunidades de desarrollo en proyectos de infraestructura vial.' },
                                { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Ambiente de trabajo', desc: 'Equipo multicultural y comprometido con la excelencia.' },
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
                    </div>

                    {/* RIGHT — Formulario */}
                    <div className="border-l border-gray-100 lg:pl-16">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-10 bg-[#cc0000]" />
                            <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Registro</span>
                        </div>
                        <h2
                            className="text-gray-900 text-4xl font-black uppercase leading-tight mb-8"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            Regístrate en<br />nuestra base de talento
                        </h2>

                        {sent ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-4">
                                <div className="w-16 h-16 bg-green-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-700 font-semibold text-lg">¡Registro enviado!</p>
                                <p className="text-gray-400 text-sm text-center max-w-xs">
                                    Tu información ha sido recibida. Te contactaremos cuando tengamos una vacante disponible.
                                </p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="mt-2 px-8 py-2.5 border border-gray-300 text-gray-600 text-sm font-semibold uppercase tracking-wider hover:border-[#cc0000] hover:text-[#cc0000] transition-colors"
                                >
                                    Nuevo registro
                                </button>
                            </div>
                        ) : reviewing ? (
                            /* Review panel */
                            <div className="space-y-5">
                                <div className="bg-gray-50 border border-gray-200 p-6 space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Confirma tu información</h3>
                                    {[
                                        { label: 'Nombre completo', value: form.nombre },
                                        { label: 'DNI', value: form.dni },
                                        { label: 'Profesión', value: form.profesion },
                                        { label: 'Años de experiencia', value: form.experiencia },
                                        { label: 'Correo', value: form.correo },
                                        { label: 'Puestos de interés', value: form.puestosSeleccionados.join(', ') },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                                            <span className="text-gray-400 font-medium">{label}</span>
                                            <span className="text-gray-800 font-semibold text-right max-w-[55%]">{value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 py-3.5 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-[0_4px_15px_rgba(204,0,0,0.35)] flex items-center justify-center gap-2"
                                    >
                                        Confirmar y enviar
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setReviewing(false)}
                                        className="px-6 py-3.5 border border-gray-300 hover:border-gray-500 text-gray-500 font-bold uppercase tracking-wider text-sm transition-all"
                                    >
                                        Editar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={e => { e.preventDefault(); if (isValid) setReviewing(true) }} className="space-y-5">

                                {/* Nombre + DNI */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                            Nombre completo <span className="text-[#cc0000]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={form.nombre}
                                            onChange={handleChange}
                                            required
                                            placeholder="Ej. Ana García López"
                                            className="w-full px-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm placeholder-gray-300 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                            DNI <span className="text-[#cc0000]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="dni"
                                            value={form.dni}
                                            onChange={handleChange}
                                            required
                                            maxLength={8}
                                            placeholder="8 dígitos"
                                            className="w-full px-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm placeholder-gray-300 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Profesión + Experiencia */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                            Profesión <span className="text-[#cc0000]">*</span>
                                        </label>
                                        <select
                                            name="profesion"
                                            value={form.profesion}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm transition-colors bg-white appearance-none"
                                        >
                                            <option value="">Seleccionar...</option>
                                            {profesiones.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                            Años de experiencia <span className="text-[#cc0000]">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="experiencia"
                                            value={form.experiencia}
                                            onChange={handleChange}
                                            required
                                            min={0}
                                            max={50}
                                            placeholder="Ej. 5"
                                            className="w-full px-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm placeholder-gray-300 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Correo */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                        Correo Gmail <span className="text-[#cc0000]">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="correo"
                                        value={form.correo}
                                        onChange={handleChange}
                                        required
                                        placeholder="tucorreo@gmail.com"
                                        className="w-full px-4 py-3.5 border border-gray-200 focus:border-[#cc0000] focus:outline-none text-gray-800 text-sm placeholder-gray-300 transition-colors"
                                    />
                                </div>

                                {/* Puestos */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                                        Puestos a los que aspiras <span className="text-[#cc0000]">*</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {puestos.map(p => {
                                            const selected = form.puestosSeleccionados.includes(p)
                                            return (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => togglePuesto(p)}
                                                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wide border transition-all duration-200 ${selected
                                                        ? 'bg-[#cc0000] border-[#cc0000] text-white'
                                                        : 'border-gray-300 text-gray-600 hover:border-[#cc0000] hover:text-[#cc0000]'
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <p className="text-gray-400 text-xs">Los campos con <span className="text-[#cc0000]">*</span> son obligatorios.</p>

                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className={`w-full py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 ${isValid
                                        ? 'bg-[#cc0000] hover:bg-[#aa0000] text-white hover:shadow-[0_4px_15px_rgba(204,0,0,0.35)] hover:-translate-y-0.5'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Revisar y enviar registro
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            {/* WhatsApp */}
            <a
                href="https://wa.me/51941532345"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="fixed bottom-8 right-6 z-50 w-14 h-14 bg-[#25d366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:scale-110 transition-all duration-300"
            >
                <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </div>
    )
}
