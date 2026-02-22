import { Link } from 'react-router-dom'

const serviciosResumen = [
    {
        num: '01',
        titulo: 'Construcción y Mantenimiento de Puentes',
        imagen: '/img_1.png',
        tag: 'Ingeniería Civil',
    },
    {
        num: '02',
        titulo: 'Conservación de Obras de Arte en Carreteras',
        imagen: '/img_2.jpg',
        tag: 'Conservación Vial',
    },
    {
        num: '03',
        titulo: 'Conservación Vial',
        imagen: '/img_1.png',
        tag: 'Infraestructura',
    },
    {
        num: '04',
        titulo: 'Señalización Vial',
        imagen: '/img_2.jpg',
        tag: 'Seguridad Vial',
    },
    {
        num: '05',
        titulo: 'Alquiler de Maquinaria Pesada',
        imagen: '/img_1.png',
        tag: 'Equipos',
    },
]

export default function ServiciosPreview() {
    return (
        <section id="servicios" className="bg-[#0d0d0d] py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-12 bg-[#cc0000]" />
                            <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Lo que hacemos</span>
                        </div>
                        <h2
                            className="text-white text-5xl md:text-6xl font-black uppercase leading-none tracking-tight"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            Nuestros<br /><span className="text-[#cc0000]">Servicios</span>
                        </h2>
                    </div>
                    <Link
                        to="/servicios"
                        className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-[#cc0000] text-white/60 hover:text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300 group self-start md:self-auto"
                    >
                        Ver todos
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Numbered list */}
                {serviciosResumen.map((s) => (
                    <Link
                        key={s.num}
                        to="/servicios"
                        className="flex items-center gap-6 py-5 border-b border-white/8 hover:pl-3 group transition-all duration-300"
                    >
                        <span
                            className="text-4xl font-black text-white/15 group-hover:text-[#cc0000] transition-colors duration-300 flex-shrink-0"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif", minWidth: 56 }}
                        >
                            {s.num}
                        </span>
                        <h3
                            className="flex-1 text-lg md:text-xl font-bold uppercase text-white/60 group-hover:text-white leading-tight transition-colors duration-300"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            {s.titulo}
                        </h3>
                        <span className="hidden md:block text-[10px] font-semibold uppercase tracking-widest border border-white/10 group-hover:border-[#cc0000] group-hover:text-[#cc0000] text-white/30 px-3 py-1 transition-all duration-300">
                            {s.tag}
                        </span>
                        <svg
                            className="w-5 h-5 text-white/20 group-hover:text-[#cc0000] flex-shrink-0 transition-colors duration-300"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                ))}
            </div>
        </section>
    )
}
