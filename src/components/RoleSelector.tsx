import { useState } from 'react'
import '../styles/roleSelector.css'

interface RoleSelectorProps {
    onSelectUser: () => void
    onSelectAdmin: () => void
}

export default function RoleSelector({ onSelectUser, onSelectAdmin }: RoleSelectorProps) {
    const [leaving, setLeaving] = useState(false)

    const handleUser = () => {
        setLeaving(true)
        setTimeout(onSelectUser, 600)
    }

    const handleAdmin = () => {
        setLeaving(true)
        setTimeout(onSelectAdmin, 600)
    }

    return (
        <div className={`role-selector-overlay ${leaving ? 'role-selector-leaving' : ''}`}>
            {/* Particle / grid background */}
            <div className="role-selector-grid" aria-hidden="true" />

            {/* Animated red accent lines */}
            <div className="role-accent-left" aria-hidden="true" />
            <div className="role-accent-right" aria-hidden="true" />

            <div className="role-selector-content">

                {/* Logo / Brand */}
                <div className="role-brand">
                    <div className="role-brand-bar" />
                    <div>
                        <div className="role-brand-name">SMG</div>
                        <div className="role-brand-tagline">Sistema de Gestión</div>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="role-headline">
                    <span className="role-headline-accent">SELECCIONA</span>
                    <span className="role-headline-main">TU VISTA</span>
                </h1>

                <p className="role-subtext">
                    Elige el modo de acceso para continuar
                </p>

                {/* Divider */}
                <div className="role-divider" />

                {/* Buttons */}
                <div className="role-buttons">
                    {/* Vista Usuario */}
                    <button
                        className="role-btn role-btn-user"
                        onClick={handleUser}
                    >
                        <span className="role-btn-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                            </svg>
                        </span>
                        <span className="role-btn-label">Vista Usuario</span>
                        <span className="role-btn-desc">Acceso público al sitio</span>
                        <span className="role-btn-arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>

                    {/* Vista Admin */}
                    <button
                        className="role-btn role-btn-admin"
                        onClick={handleAdmin}
                    >
                        <span className="role-btn-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </span>
                        <span className="role-btn-label">Vista Admin</span>
                        <span className="role-btn-desc">Panel de administración</span>
                        <span className="role-btn-arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="role-bottom-bar" />
        </div>
    )
}
