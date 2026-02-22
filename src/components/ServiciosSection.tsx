import { useState } from 'react'
import { Link } from 'react-router-dom'

const servicios = [
    {
        titulo: 'Construcción, Montaje, Mantenimiento y Conservación de Puentes',
        descripcion:
            'Entendemos que los puentes son las arterias vitales que conectan comunidades. Ejecutamos proyectos con los más altos estándares de ingeniería.',
        imagen: '/img_1.png',
    },
    {
        titulo: 'Mantenimiento y Conservación de Obras de Arte en Carreteras',
        descripcion:
            'Aseguramos la integridad estructural y operativa de la infraestructura vial con tecnología de primer nivel.',
        imagen: '/img_2.jpg',
    },
    {
        titulo: 'Conservación Vial',
        descripcion:
            'Preservamos la infraestructura vial del país, asegurando carreteras en óptimas condiciones para el tránsito seguro.',
        imagen: '/img_1.png',
    },
    {
        titulo: 'Señalización Vial',
        descripcion:
            'Diseño, suministro e instalación de señalética para garantizar la seguridad en carreteras, obras y espacios urbanos.',
        imagen: '/img_2.jpg',
    },
    {
        titulo: 'Alquiler de Maquinaria Pesada',
        descripcion:
            'Moderna flota de maquinaria pesada disponible con operadores altamente capacitados para cada tipo de proyecto.',
        imagen: '/img_1.png',
    },
]

export default function ServiciosSection() {
    const [current, setCurrent] = useState(0)
    const [hovered, setHovered] = useState<number | null>(null)

    const visible = 3
    const maxIndex = servicios.length - visible

    const next = () => setCurrent((c) => Math.min(c + 1, maxIndex))

    return (
        <section id="servicios" className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-px w-10 bg-[#cc0000]" />
                        <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Lo que hacemos</span>
                        <div className="h-px w-10 bg-[#cc0000]" />
                    </div>
                    <h2
                        className="text-gray-900 text-4xl md:text-5xl font-black uppercase tracking-tight mb-4"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        Nuestros <span className="text-[#cc0000]">Servicios</span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
                        Encuentra información sobre nuestros servicios y conoce lo que nuestra compañía puede hacer con tus proyectos.
                    </p>
                </div>

                {/* Cards + right arrow overlay */}
                <div className="relative">
                    <div className="grid grid-cols-3 gap-1">
                        {servicios.slice(current, current + visible).map((s, idx) => {
                            const globalIdx = current + idx
                            return (
                                <Link
                                    key={globalIdx}
                                    to="/servicios"
                                    className="group relative overflow-hidden block"
                                    style={{ paddingTop: '90%' }}
                                    onMouseEnter={() => setHovered(globalIdx)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {/* Image */}
                                    <img
                                        src={s.imagen}
                                        alt={s.titulo}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                                    />

                                    {/* Dark gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                                    {/* Red bottom accent line */}
                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#cc0000] group-hover:w-full transition-all duration-500" />

                                    {/* Content at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3
                                            className="text-white text-base font-bold uppercase leading-snug mb-0 line-clamp-3"
                                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                        >
                                            {s.titulo}
                                        </h3>

                                        {/* Description on hover */}
                                        <div
                                            className={`overflow-hidden transition-all duration-400 ${hovered === globalIdx ? 'max-h-24 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
                                                }`}
                                        >
                                            <p className="text-white/70 text-sm leading-relaxed mb-3">{s.descripcion}</p>
                                            <span className="text-[#ff3333] text-xs font-bold uppercase tracking-wider">
                                                + Información
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Right arrow — overlaid on right edge */}
                    {current < maxIndex && (
                        <button
                            onClick={next}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 bg-white hover:bg-[#cc0000] border border-gray-200 hover:border-[#cc0000] shadow-lg flex items-center justify-center transition-all duration-300 group"
                            aria-label="Siguiente"
                        >
                            <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Ver todos */}
                <div className="text-center mt-8">
                    <Link
                        to="/servicios"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#cc0000] text-sm font-semibold uppercase tracking-wider transition-colors duration-300 group border-b border-transparent hover:border-[#cc0000] pb-0.5"
                    >
                        Ver todos los servicios
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}
