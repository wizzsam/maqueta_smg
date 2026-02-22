// Logos reales de los clientes de SGM Montajes
const clientes = [
    {
        id: 1,
        name: 'INCOT',
        logo: 'https://www.incot.com.pe/assets/logo-CXpvmAfB.png',
        href: 'https://www.incot.com.pe',
    },
    {
        id: 2,
        name: 'CCECC',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/China_Civil_Engineering_Construction_Corporation_logo.svg/320px-China_Civil_Engineering_Construction_Corporation_logo.svg.png',
        href: 'https://www.ccecc.com.cn',
    },
    {
        id: 3,
        name: 'BERD',
        logo: 'https://berd.eu/wp-content/themes/berd/img/logo.png',
        href: 'https://berd.eu',
    },
    {
        id: 4,
        name: 'AVIC International',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/AVIC_International_Logo.svg/320px-AVIC_International_Logo.svg.png',
        href: 'https://www.avicintl.com',
    },
    {
        id: 5,
        name: 'AIA Ingenieros',
        logo: 'https://www.aia.com.pe/wp-content/uploads/2020/06/logo-aia.png',
        href: 'https://www.aia.com.pe',
    },
    {
        id: 6,
        name: 'Autopista del Norte',
        logo: 'https://autopistadelnorte.com.pe/wp-content/uploads/2021/03/logo-autopista.png',
        href: 'https://autopistadelnorte.com.pe',
    },
]

// Duplicamos para marquee continuo
const duplicated = [...clientes, ...clientes]

export default function ClientesSection() {
    return (
        <section id="clientes" className="bg-white py-20 border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-px w-12 bg-[#cc0000]" />
                    <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">Confianza</span>
                    <div className="h-px w-12 bg-[#cc0000]" />
                </div>
                <h2
                    className="text-[#111] text-4xl md:text-5xl font-black uppercase tracking-tight mb-4"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                    Nuestros <span className="text-[#cc0000]">Clientes</span>
                </h2>
                <p className="text-gray-500 text-base max-w-xl mx-auto">
                    Empresas con las que hemos establecido sólidas relaciones basadas en calidad y excelente servicio.
                </p>
            </div>

            {/* Infinite marquee */}
            <div className="relative py-4">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div
                    className="flex items-center gap-16"
                    style={{
                        animation: 'marquee 32s linear infinite',
                        width: 'max-content',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
                    onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
                >
                    {duplicated.map((c, i) => (
                        <a
                            key={`${c.id}-${i}`}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 flex items-center justify-center px-8 py-5 bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300 hover:scale-105"
                            title={c.name}
                        >
                            <img
                                src={c.logo}
                                alt={c.name}
                                className="h-14 w-auto max-w-[160px] object-contain"
                                onError={(e) => {
                                    const el = e.currentTarget
                                    el.style.display = 'none'
                                    const span = document.createElement('span')
                                    span.textContent = c.name
                                    span.className = 'text-gray-700 font-bold text-sm uppercase tracking-wider whitespace-nowrap'
                                    el.parentElement?.appendChild(span)
                                }}
                            />
                        </a>
                    ))}

                </div>

                <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
            </div>
        </section>
    )
}
