
interface NavbarProps {
  page: string
  onPageChange: (page: 'upload' | 'annotate' | 'export') => void
  imageCount: number
}

const TABS = [
  { id: 'upload',   label: 'Subir imágenes' },
  { id: 'annotate', label: 'Anotar' },
  { id: 'export',   label: 'Exportar' },
] as const

export function Navbar({ page, onPageChange, imageCount }: NavbarProps) {
  return (
    <nav style={{
      background: 'var(--mg)',
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'white', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#E5007D" strokeWidth="2.5"/>
            <circle cx="12" cy="12" r="4" fill="#E5007D"/>
          </svg>
        </div>
        <div>
          <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>Banco Guayaquil</div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10 }}>Anotador de documentos</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 2 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onPageChange(tab.id)}
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              background: page === tab.id ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: page === tab.id ? 'white' : 'rgba(255,255,255,0.65)',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <span style={{
        background: 'rgba(255,255,255,0.2)',
        color: 'white', fontSize: 11,
        padding: '3px 10px', borderRadius: 99,
      }}>
        {imageCount} {imageCount === 1 ? 'imagen' : 'imágenes'}
      </span>

    </nav>
  )
}