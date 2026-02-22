import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const proyectos = [
    {
        id: 1,
        titulo: 'Mantenimiento Mayor de Puentes y Obras de Arte en la Red Vial N°04',
        cliente: 'Autopista del Norte',
        imagen: '/img_1.png',
        categoria: 'Mantenimiento Vial',
        estado: 'Finalizado',
    },
    {
        id: 2,
        titulo: 'Desmontaje de Estructuras Metálicas Tipo Pórtico Porta Señal',
        cliente: 'Rutas de Lima',
        imagen: '/img_2.jpg',
        categoria: 'Señalización',
        estado: 'Finalizado',
    },
    {
        id: 3,
        titulo: 'Reubicación de Señales Verticales, New Jersey e Instalación de Gibas',
        cliente: 'Lima Expresa',
        imagen: '/img_1.png',
        categoria: 'Señalización Vial',
        estado: 'Finalizado',
    },
    {
        id: 4,
        titulo: 'Control de Tránsito en el Puente Santa (KM 449+000) y Coishco (KM 443+660)',
        cliente: 'Autopista del Norte',
        imagen: '/img_2.jpg',
        categoria: 'Conservación Vial',
        estado: 'En Curso',
    },
    {
        id: 5,
        titulo: 'Mantenimiento Mayor de Puentes; Virú, Chao, Santa, Coishco, Huambacho, Culebras y Fortaleza por Razones de Seguridad Vial',
        cliente: 'MTC',
        imagen: '/img_1.png',
        categoria: 'Mantenimiento Vial',
        estado: 'Finalizado',
    },
    {
        id: 6,
        titulo: 'Mantenimiento de Puentes Peatonales en la Panamericana Norte',
        cliente: 'Provías Nacional',
        imagen: '/img_2.jpg',
        categoria: 'Infraestructura',
        estado: 'En Curso',
    },
    {
        id: 7,
        titulo: 'Conservación Vial en la Carretera Longitudinal de la Costa Norte',
        cliente: 'Autopista del Norte',
        imagen: '/img_1.png',
        categoria: 'Conservación Vial',
        estado: 'Finalizado',
    },
    {
        id: 8,
        titulo: 'Señalización y Seguridad Vial en la Red Vial N°06',
        cliente: 'Rutas de Lima',
        imagen: '/img_2.jpg',
        categoria: 'Señalización',
        estado: 'En Curso',
    },
]

const categorias = ['Todos', 'Mantenimiento Vial', 'Señalización', 'Señalización Vial', 'Conservación Vial', 'Infraestructura']

export default function ProyectosPage() {
    const [filtro, setFiltro] = useState('Todos')
    const [hovered, setHovered] = useState<number | null>(null)

    const filtrados = filtro === 'Todos' ? proyectos : proyectos.filter(p => p.categoria === filtro)

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
            <Navbar />

            {/* Hero banner */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <img src="/img_1.png" alt="Proyectos SGM" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
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
                            Nuestros <span className="text-[#cc0000]">Proyectos</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Intro */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-6 text-center">
                <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
                    ¡Bienvenidos al área de "Proyectos"! Aquí encontrarás información ordenada y detallada sobre todos los proyectos
                    finalizados y en curso de <span className="text-[#cc0000] font-medium">nuestra compañía</span>.
                </p>
            </div>

            {/* Filtros */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-10">
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFiltro(cat)}
                            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${filtro === cat
                                    ? 'bg-[#cc0000] border-[#cc0000] text-white'
                                    : 'bg-white border-gray-200 text-gray-500 hover:border-[#cc0000] hover:text-[#cc0000]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de proyectos */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtrados.map((p) => (
                        <div
                            key={p.id}
                            className="group relative overflow-hidden cursor-pointer"
                            style={{ paddingTop: '56%' }}
                            onMouseEnter={() => setHovered(p.id)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Imagen de fondo */}
                            <img
                                src={p.imagen}
                                alt={p.titulo}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Overlay oscuro suave */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

                            {/* Caja blanca inferior — efecto del diseño original */}
                            <div
                                className={`absolute left-0 right-0 bottom-0 bg-white/95 transition-all duration-400 ${hovered === p.id ? 'py-7' : 'py-5'
                                    }`}
                                style={{ maxWidth: '80%' }}
                            >
                                {/* Barra roja superior de la caja */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-[#cc0000]" />

                                <div className="px-6">
                                    {/* Categoría */}
                                    <span className="text-[#cc0000] text-[10px] font-bold uppercase tracking-widest block mb-2">
                                        {p.categoria}
                                    </span>

                                    {/* Título */}
                                    <h3
                                        className="text-gray-900 text-sm md:text-base font-black uppercase leading-snug mb-3"
                                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                    >
                                        {p.titulo}
                                    </h3>

                                    {/* Separador rojo */}
                                    <div className="h-px w-12 bg-[#cc0000] mb-3" />

                                    {/* Cliente */}
                                    <p className="text-gray-500 text-xs mb-3">
                                        Al servicio de <span className="font-semibold text-gray-700">{p.cliente}</span>
                                    </p>

                                    {/* Estado + CTA */}
                                    <div
                                        className={`overflow-hidden transition-all duration-400 ${hovered === p.id ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${p.estado === 'En Curso'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {p.estado}
                                            </span>
                                            <Link
                                                to="#"
                                                className="text-[#cc0000] text-xs font-bold uppercase tracking-wider hover:underline"
                                            >
                                                + Información
                                            </Link>
                                        </div>
                                    </div>

                                    {/* CTA visible por defecto */}
                                    {hovered !== p.id && (
                                        <span className="text-[#cc0000] text-xs font-bold uppercase tracking-wider">
                                            + Información
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />

            {/* WhatsApp */}
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
        </div>
    )
}
