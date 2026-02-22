import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const servicios = [
    {
        num: '01',
        titulo: 'Construcción, Montaje, Mantenimiento y Conservación de Puentes',
        descripcion:
            'En SGM Montajes entendemos que los puentes son más que estructuras; son las arterias vitales que conectan comunidades y reactivan economías. Ejecutamos proyectos de alta complejidad con los más altos estándares de ingeniería, asegurando durabilidad y seguridad estructural.',
        imagen: '/img_1.png',
        tag: 'Ingeniería Civil',
        icono: '🌉',
        detalle: [
            'Construcción de puentes de concreto y metálicos',
            'Mantenimiento preventivo y correctivo',
            'Evaluación estructural y diagnóstico',
            'Rehabilitación de puentes existentes',
        ],
    },
    {
        num: '02',
        titulo: 'Mantenimiento y Conservación de Obras de Arte en Carreteras',
        descripcion:
            'Nos dedicamos a la conservación y mantenimiento de obras de arte vial, asegurando la integridad estructural y operativa de toda la infraestructura. Aplicamos tecnología de primer nivel para garantizar la durabilidad de cada obra.',
        imagen: '/img_2.jpg',
        tag: 'Conservación Vial',
        icono: '🛣️',
        detalle: [
            'Mantenimiento de alcantarillas y drenajes',
            'Reparación de muros de contención',
            'Inspección y evaluación de estructuras',
            'Conservación de túneles y pasos a desnivel',
        ],
    },
    {
        num: '03',
        titulo: 'Conservación Vial',
        descripcion:
            'Preservamos la infraestructura vial de nuestra nación, asegurando que las carreteras y caminos estén en óptimas condiciones para el tránsito seguro de personas y mercancías, contribuyendo al desarrollo económico del país.',
        imagen: '/img_1.png',
        tag: 'Infraestructura',
        icono: '🏗️',
        detalle: [
            'Bacheo y reencarpetado de calzadas',
            'Mantenimiento periódico de vías',
            'Control de erosión y taludes',
            'Gestión integral de carreteras concesionadas',
        ],
    },
    {
        num: '04',
        titulo: 'Señalización Vial',
        descripcion:
            'Ofrecemos un servicio completo de señalización vial que incluye diseño, suministro e instalación de toda la señalética necesaria para garantizar la seguridad en carreteras, obras y espacios urbanos.',
        imagen: '/img_2.jpg',
        tag: 'Seguridad Vial',
        icono: '🚧',
        detalle: [
            'Diseño e instalación de señalética horizontal',
            'Señalización vertical preventiva e informativa',
            'Dispositivos de control de tráfico temporal',
            'Demarcación de carriles y zonas de seguridad',
        ],
    },
    {
        num: '05',
        titulo: 'Alquiler de Maquinaria Pesada',
        descripcion:
            'Contamos con una moderna flota de maquinaria pesada disponible para proyectos de construcción, minería y vialidad. Nuestros equipos se adaptan a las exigencias de cada obra con operadores altamente capacitados.',
        imagen: '/img_1.png',
        tag: 'Equipos',
        icono: '🚜',
        detalle: [
            'Excavadoras, cargadores y volquetes',
            'Grúas y plataformas elevadoras',
            'Equipos de compactación y nivelación',
            'Operadores certificados incluidos',
        ],
    },
]

export default function ServiciosPage() {
    const [active, setActive] = useState(0)

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
            <Navbar />

            {/* Hero banner */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                    src="/img_1.png"
                    alt="Servicios SGM"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-10 w-full">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-px w-8 bg-[#cc0000]" />
                            <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">SGM Montajes</span>
                        </div>
                        <h1
                            className="text-white text-5xl md:text-6xl font-black uppercase"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            Nuestros <span className="text-[#cc0000]">Servicios</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

                {/* Intro */}
                <p className="text-gray-500 text-base max-w-2xl mb-16 leading-relaxed">
                    En <strong className="text-gray-900">SGM Servicios Generales y Montajes S.A.C.</strong> ofrecemos soluciones integrales
                    de ingeniería de infraestructura vial. Aquí encontrarás información detallada sobre todos nuestros servicios.
                </p>

                {/* Desktop: split layout */}
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left: list */}
                    <div className="lg:w-1/2">
                        {servicios.map((s, idx) => (
                            <button
                                key={s.num}
                                onClick={() => setActive(idx)}
                                className={`w-full text-left group border-b transition-all duration-300 ${active === idx ? 'border-[#cc0000]' : 'border-gray-100 hover:border-gray-300'
                                    }`}
                            >
                                <div className={`flex items-center gap-5 py-6 transition-all duration-300 ${active === idx ? 'pl-3' : 'pl-0'}`}>
                                    <span
                                        className={`text-3xl font-black transition-colors duration-300 flex-shrink-0 ${active === idx ? 'text-[#cc0000]' : 'text-gray-200'
                                            }`}
                                        style={{ fontFamily: "'Barlow Condensed', sans-serif", minWidth: 48 }}
                                    >
                                        {s.num}
                                    </span>
                                    <div className="flex-1">
                                        <span
                                            className={`text-xs font-semibold uppercase tracking-widest mb-1 block transition-colors ${active === idx ? 'text-[#cc0000]' : 'text-gray-400'
                                                }`}
                                        >
                                            {s.tag}
                                        </span>
                                        <h3
                                            className={`text-base md:text-lg font-bold uppercase leading-tight transition-colors duration-300 ${active === idx ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-800'
                                                }`}
                                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                        >
                                            {s.titulo}
                                        </h3>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${active === idx ? 'text-[#cc0000] translate-x-1' : 'text-gray-300'
                                            }`}
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right: detail panel */}
                    <div className="lg:w-1/2">
                        <div className="sticky top-28" key={active}>
                            {/* Image */}
                            <div className="relative overflow-hidden h-64 md:h-72 mb-8" style={{ animation: 'fadeUp 0.4s ease' }}>
                                <img
                                    src={servicios[active].imagen}
                                    alt={servicios[active].titulo}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute top-4 left-4 bg-[#cc0000] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                    {servicios[active].tag}
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span
                                        className="text-white/20 text-8xl font-black leading-none"
                                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                    >
                                        {servicios[active].num}
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h2
                                className="text-gray-900 text-2xl md:text-3xl font-black uppercase leading-tight mb-4"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                {servicios[active].titulo}
                            </h2>

                            {/* Red divider */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-0.5 w-12 bg-[#cc0000]" />
                                <span className="text-[#cc0000] text-xs font-semibold uppercase tracking-widest">{servicios[active].tag}</span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-500 leading-relaxed mb-8">{servicios[active].descripcion}</p>

                            {/* Detail list */}
                            <ul className="space-y-3 mb-8">
                                {servicios[active].detalle.map((d, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#cc0000] flex-shrink-0" />
                                        <span className="text-gray-600 text-sm">{d}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <a
                                href="#contacto"
                                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#cc0000] hover:bg-[#aa0000] text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-[0_4px_15px_rgba(204,0,0,0.35)] hover:-translate-y-0.5 group"
                            >
                                Solicitar información
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* WhatsApp global */}
            <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="fixed bottom-8 right-6 z-50 w-14 h-14 bg-[#25d366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:scale-110 transition-all duration-300"
            >
                <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    )
}
