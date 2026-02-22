// Reemplaza las imágenes con las reales de cada noticia
const noticias = [
    {
        id: 1,
        image: '/img_1.png',
        fecha: '11 Abr 2025',
        categoria: 'Industria',
        titulo: 'Concesionarias Viales Presentan Planes de Negocios para el 2025 ante el Ositran',
        extracto:
            'Las concesionarias viales han proyectado importantes inversiones en el Perú, destinadas a la construcción de nuevas infraestructuras y mejora de la operatividad.',
    },
    {
        id: 2,
        image: '/img_2.jpg',
        fecha: '24 Feb 2025',
        categoria: 'SGM',
        titulo: 'MTC Anuncia Restablecimiento de Tránsito tras Colocación del Puente Modular en Chancay',
        extracto:
            'El tránsito en la Panamericana Norte se reanudó en Chancay, tras instalarse un puente modular como medida de emergencia ante el colapso de la estructura anterior.',
    },
    {
        id: 3,
        image: '/img_1.png',
        fecha: '10 Ene 2025',
        categoria: 'Infraestructura',
        titulo: 'Nuevo Contrato de Mantenimiento en la Red Vial Nacional Fortalece la Conectividad del País',
        extracto:
            'SGM Montajes obtiene contrato para el mantenimiento periódico en tramos clave de la red vial, reforzando el compromiso con la seguridad vial.',
    },
]

export default function NoticiasSection() {
    return (
        <section id="noticias" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-[#cc0000]" />
                        <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Actualidad</span>
                        <div className="h-px w-12 bg-[#cc0000]" />
                    </div>
                    <h2
                        className="text-[#111] text-4xl md:text-5xl font-black uppercase tracking-tight mb-4"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        Últimas <span className="text-[#cc0000]">Noticias</span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-xl mx-auto">
                        Explora nuestras últimas noticias y novedades para mantenerte informado sobre nuestros logros empresariales.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {noticias.map((n, idx) => (
                        <article
                            key={n.id}
                            className={`group flex flex-col overflow-hidden border border-gray-100 hover:border-[#cc0000]/30 hover:shadow-xl transition-all duration-400 ${idx === 0 ? 'md:col-span-1' : ''
                                }`}
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={n.image}
                                    alt={n.titulo}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Categoria badge */}
                                <div className="absolute top-4 left-4 bg-[#cc0000] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                                    {n.categoria}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1 p-6 bg-white">
                                <span className="text-gray-400 text-xs font-medium mb-3 tracking-wide">{n.fecha}</span>
                                <div className="h-0.5 w-8 bg-[#cc0000] mb-4" />
                                <h3
                                    className="text-[#111] text-lg font-bold uppercase leading-snug mb-3 group-hover:text-[#cc0000] transition-colors duration-300"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    {n.titulo}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{n.extracto}</p>
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-[#cc0000] hover:text-[#aa0000] text-sm font-semibold uppercase tracking-wider transition-colors duration-300 group/link"
                                >
                                    Leer más
                                    <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Ver todas */}
                <div className="text-center mt-10">
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#cc0000] hover:bg-[#aa0000] text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(204,0,0,0.35)]"
                    >
                        Ver todas las noticias
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
