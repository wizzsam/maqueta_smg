import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Servicios navega a su propia ruta; el resto son anclas en el home
const navLinks = [
    { label: 'Nosotros', href: '#nosotros', route: false },
    { label: 'Servicios', href: '/servicios', route: true },
    { label: 'Proyectos', href: '/proyectos', route: true },
    { label: 'Noticias', href: '#noticias', route: false },
    { label: 'Resp. Social', href: '#responsabilidad-social', route: false },
    { label: 'Comunicación', href: '#comunicacion', route: false },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // En páginas internas siempre fondo blanco
    const isHome = location.pathname === '/'
    const transparent = isHome && !scrolled

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${transparent
                ? 'bg-gradient-to-b from-black/70 to-transparent'
                : 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.12)] border-b border-gray-100'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 group">
                        <img
                            src={transparent ? '/logo_smg_blanco.png' : '/logo_smg.png'}
                            alt="SGM Montajes"
                            className="h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) =>
                            link.route ? (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className={`relative px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-all duration-300 group ${transparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-[#cc0000]'
                                        }`}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#cc0000] group-hover:w-3/4 transition-all duration-300 rounded-full" />
                                </Link>
                            ) : (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-all duration-300 group ${transparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-[#cc0000]'
                                        }`}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#cc0000] group-hover:w-3/4 transition-all duration-300 rounded-full" />
                                </a>
                            )
                        )}

                        {/* CTA */}
                        <Link
                            to="/contacto"
                            className="ml-4 px-6 py-2.5 bg-[#cc0000] hover:bg-[#aa0000] text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_4px_15px_rgba(204,0,0,0.4)] hover:-translate-y-0.5"
                        >
                            Contáctanos
                        </Link>
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <span className={`block h-0.5 transition-all duration-300 ${transparent ? 'bg-white' : 'bg-gray-800'} ${mobileOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
                        <span className={`block h-0.5 transition-all duration-300 ${transparent ? 'bg-white' : 'bg-gray-800'} ${mobileOpen ? 'w-0 opacity-0' : 'w-5'}`} />
                        <span className={`block h-0.5 transition-all duration-300 ${transparent ? 'bg-white' : 'bg-gray-800'} ${mobileOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } ${transparent ? 'bg-black/95' : 'bg-white border-t border-gray-100'}`}
            >
                <div className="px-6 pb-6 pt-2 flex flex-col gap-1">
                    {navLinks.map((link) =>
                        link.route ? (
                            <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`py-3 text-sm font-medium uppercase tracking-wider border-b transition-colors duration-200 hover:text-[#cc0000] ${transparent ? 'text-white/80 border-white/5' : 'text-gray-700 border-gray-100'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`py-3 text-sm font-medium uppercase tracking-wider border-b transition-colors duration-200 hover:text-[#cc0000] ${transparent ? 'text-white/80 border-white/5' : 'text-gray-700 border-gray-100'
                                    }`}
                            >
                                {link.label}
                            </a>
                        )
                    )}
                    <Link
                        to="/contacto"
                        onClick={() => setMobileOpen(false)}
                        className="mt-4 py-3 text-center bg-[#cc0000] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#aa0000] transition-colors"
                    >
                        Contáctanos
                    </Link>
                </div>
            </div>
        </header>
    )
}
