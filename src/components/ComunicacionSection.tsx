const items = [
    {
        id: 1,
        image: '/img_1.png',
        titulo: 'Orgullo que Construye: Programa de Incentivos',
    },
    {
        id: 2,
        image: '/img_2.jpg',
        titulo: 'Capacitamos a todo nuestro equipo sobre Brigadas de Emergencia',
    },
    {
        id: 3,
        image: '/img_1.png',
        titulo: 'Día Mundial del Medio Ambiente',
    },
    {
        id: 4,
        image: '/img_2.jpg',
        titulo: 'En SGM SAC la Seguridad es Primordial',
    },
]

export default function ComunicacionSection() {
    return (
        <section id="comunicacion" className="bg-gray-950 py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-[#cc0000]" />
                        <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Galería</span>
                        <div className="h-px w-12 bg-[#cc0000]" />
                    </div>
                    <h2
                        className="text-white text-4xl md:text-5xl font-black uppercase tracking-tight mb-4"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        Comuni<span className="text-[#cc0000]">cación</span>
                    </h2>
                    <p className="text-white/50 text-base max-w-xl mx-auto">
                        Encuentra más información audiovisual de nuestros proyectos y conoce más sobre nuestro trabajo.
                    </p>
                </div>

                {/* Grid uniforme 4 columnas — todas igual altura */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group relative overflow-hidden"
                            style={{ paddingTop: '120%' }} // aspect ratio cuadrado-alto
                        >
                            <img
                                src={item.image}
                                alt={item.titulo}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay siempre visible abajo */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            {/* Barra roja hover */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#cc0000] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <h3
                                    className="text-white text-sm font-bold uppercase leading-snug"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    {item.titulo}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-10">
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 px-8 py-3.5 border-2 border-white/20 hover:border-[#cc0000] text-white/70 hover:text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 group"
                    >
                        Ver toda la galería
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
