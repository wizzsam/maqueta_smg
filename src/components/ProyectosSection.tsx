// Reemplaza las imágenes con las reales de cada proyecto
const proyectos = [
    {
        id: 1,
        image: '/img_1.png',
        titulo: 'Mantenimiento Mayor de Puentes y Obras de Arte en la Red Vial N°04',
        cliente: 'Al servicio de Autopista del Norte',
        destacado: true,
    },
    {
        id: 2,
        image: '/img_2.jpg',
        titulo: 'Control de Tránsito en el Puente Santa (KM 449+000) y Coishco (KM 443+660)',
        cliente: 'Al servicio de Autopista del Norte',
        destacado: false,
    },
    {
        id: 3,
        image: '/img_1.png',
        titulo: 'Conservación Vial de la Carretera Longitudinal de la Sierra',
        cliente: 'Al servicio de Provías Nacional',
        destacado: false,
    },
]

export default function ProyectosSection() {
    return (
        <section id="proyectos" className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-[#cc0000]" />
                        <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Portafolio</span>
                        <div className="h-px w-12 bg-[#cc0000]" />
                    </div>
                    <h2
                        className="text-[#111] text-4xl md:text-5xl font-black uppercase tracking-tight mb-4"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        Nuestros <span className="text-[#cc0000]">Proyectos</span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-xl mx-auto">
                        Descubre nuestra lista ordenada y detallada de nuestros proyectos empresariales.
                    </p>
                </div>

                {/* Asymmetric grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-auto lg:h-[560px]">

                    {/* Proyecto destacado — col 3/5 */}
                    <div className="lg:col-span-3 group relative overflow-hidden h-72 lg:h-full">
                        <img
                            src={proyectos[0].image}
                            alt={proyectos[0].titulo}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        {/* Badge */}
                        <div className="absolute top-5 left-5 bg-[#cc0000] text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
                            Proyecto Destacado
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="h-0.5 w-10 bg-[#cc0000] mb-4" />
                            <h3
                                className="text-white text-2xl font-bold uppercase leading-tight mb-3"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                {proyectos[0].titulo}
                            </h3>
                            <p className="text-white/60 text-sm mb-4">{proyectos[0].cliente}</p>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 text-[#cc0000] hover:text-white text-sm font-semibold uppercase tracking-wider transition-colors duration-300 group/link"
                            >
                                Ver proyecto
                                <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* 2 proyectos apilados — col 2/5 */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {proyectos.slice(1).map((p) => (
                            <div key={p.id} className="group relative overflow-hidden flex-1 h-56 lg:h-auto">
                                <img
                                    src={p.image}
                                    alt={p.titulo}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="h-0.5 w-8 bg-[#cc0000] mb-3" />
                                    <h3
                                        className="text-white text-base font-bold uppercase leading-tight mb-1.5"
                                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                    >
                                        {p.titulo}
                                    </h3>
                                    <p className="text-white/50 text-xs mb-3">{p.cliente}</p>
                                    <a href="#" className="text-[#cc0000] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-300">
                                        + Información
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ver todos */}
                <div className="text-center mt-10">
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 px-8 py-3.5 border-2 border-[#111] hover:bg-[#111] hover:text-white text-[#111] font-semibold uppercase tracking-wider text-sm transition-all duration-300 group"
                    >
                        Ver todos los proyectos
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
