import { useState, useEffect, useCallback, useRef } from 'react'
import '../styles/animations.css'

interface Slide {
    image: string
    eyebrow: string
    titleRed: string
    titleWhite: string
    subtitle: string
    cta: string
    ctaLink: string
}

const slides: Slide[] = [
    {
        image: '/img_1.png',
        eyebrow: 'Infraestructura Vial',
        titleRed: 'MANTENIMIENTO',
        titleWhite: 'EN LAS REDES VIALES\nMÁS IMPORTANTES\nDEL PAÍS',
        subtitle: 'Garantizamos la seguridad y eficiencia en cada kilómetro de carretera.',
        cta: 'Ver Proyectos',
        ctaLink: '#proyectos',
    },
    {
        image: '/img_2.jpg',
        eyebrow: 'Maquinaria y Operaciones',
        titleRed: 'SOLUCIONES',
        titleWhite: 'INTEGRALES EN\nMAQUINARIA Y\nOPERACIONES',
        subtitle: 'Contamos con una flota moderna y operativa para cada necesidad vial y de construcción.',
        cta: 'Nuestros Servicios',
        ctaLink: '#servicios',
    },
]

const SLIDE_DURATION = 6000

export default function HeroSlider() {
    const [current, setCurrent] = useState(0)
    const [transitioning, setTransitioning] = useState(false)
    const [progress, setProgress] = useState(0)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const goTo = useCallback((index: number) => {
        if (transitioning) return
        setTransitioning(true)
        setProgress(0)
        setTimeout(() => {
            setCurrent(index)
            setTransitioning(false)
        }, 600)
    }, [transitioning])


    const startProgress = useCallback(() => {
        setProgress(0)
        if (progressRef.current) clearInterval(progressRef.current)
        const step = 100 / (SLIDE_DURATION / 50)
        progressRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100
                return prev + step
            })
        }, 50)
    }, [])

    useEffect(() => {
        startProgress()
        intervalRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length)
            startProgress()
        }, SLIDE_DURATION)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
            if (progressRef.current) clearInterval(progressRef.current)
        }
    }, [startProgress])

    const handleDotClick = (i: number) => {
        if (i === current) return
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (progressRef.current) clearInterval(progressRef.current)
        goTo(i)
        startProgress()
        intervalRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length)
            startProgress()
        }, SLIDE_DURATION)
    }

    const slide = slides[current]

    return (
        <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
            {/* Background Images */}
            {slides.map((s, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                    style={{ opacity: i === current ? 1 : 0 }}
                >
                    <img
                        src={s.image}
                        alt={s.titleWhite}
                        className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${i === current ? 'scale-110' : 'scale-100'
                            }`}
                    />
                </div>
            ))}

            {/* Multi-layer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

            {/* Red accent bar - left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#cc0000] z-10" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-10">
                <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full pt-20">
                    <div key={current} className="max-w-2xl">

                        {/* Eyebrow */}
                        <div className="anim-fade-up flex items-center gap-3 mb-5">
                            <div className="h-px w-10 bg-[#cc0000]" />
                            <span className="text-[#cc0000] text-xs font-semibold tracking-[0.3em] uppercase">
                                {slide.eyebrow}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="anim-fade-up-d1 font-['Barlow_Condensed',_sans-serif] leading-none mb-5">
                            <span className="block text-[#cc0000] text-5xl md:text-6xl lg:text-7xl font-900 tracking-tight">
                                {slide.titleRed}
                            </span>
                            {slide.titleWhite.split('\n').map((line, i) => (
                                <span key={i} className="block text-white text-4xl md:text-5xl lg:text-6xl font-800 tracking-tight">
                                    {line}
                                </span>
                            ))}
                        </h1>

                        {/* Divider */}
                        <div className="anim-width-expand h-1 bg-[#cc0000] mb-6" style={{ width: '5rem' }} />

                        {/* Subtitle */}
                        <p className="anim-fade-up-d2 text-white/70 text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg">
                            {slide.subtitle}
                        </p>

                        {/* CTA Buttons */}
                        <div className="anim-fade-up-d3 flex flex-wrap gap-4">
                            <a
                                href={slide.ctaLink}
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#cc0000] hover:bg-[#ff1a1a] text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(204,0,0,0.5)] hover:-translate-y-0.5"
                            >
                                {slide.cta}
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a
                                href="#nosotros"
                                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 hover:border-white text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
                            >
                                Conoce más
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress bars */}
            <div className="absolute bottom-6 left-0 right-0 z-20">
                <div className="flex gap-1.5 px-8 lg:px-16 max-w-7xl mx-auto">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className="flex-1 h-0.5 bg-white/25 rounded-full overflow-hidden cursor-pointer"
                            aria-label={`Slide ${i + 1}`}
                        >
                            <div
                                className="h-full bg-[#cc0000] rounded-full"
                                style={{
                                    width: i === current ? `${progress}%` : i < current ? '100%' : '0%',
                                    transition: 'none',
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>

        </section>
    )
}

