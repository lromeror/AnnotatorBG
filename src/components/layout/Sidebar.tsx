import { useAnnotator } from '../../context/AnnotatorContext'

export function Sidebar() {
  const { images, activeImageId, setActiveImageId, classes, activeClassId, setActiveClassId } = useAnnotator()

  const done  = images.filter(i => i.status === 'done').length
  const total = images.length

  return (
    <aside style={{
      width: 200,
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      overflow: 'hidden',
    }}>

      {/* Progreso */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
            Progreso
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{done}/{total}</span>
        </div>
        <div style={{ height: 4, background: 'var(--surface3)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: total > 0 ? `${(done / total) * 100}%` : '0%',
            background: 'var(--mg)',
            borderRadius: 2,
            transition: 'width 0.3s',
          }}/>
        </div>
      </div>

      {/* Lista de imágenes */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 10 }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>
          Imágenes
        </div>

        {images.length === 0 && (
          <div style={{ fontSize: 12, color: 'var(--text-faint)', textAlign: 'center', marginTop: 20 }}>
            Sin imágenes aún
          </div>
        )}

        {images.map(img => (
          <div
            key={img.id}
            onClick={() => setActiveImageId(img.id)}
            style={{
              borderRadius: 6,
              overflow: 'hidden',
              marginBottom: 8,
              border: `2px solid ${activeImageId === img.id ? 'var(--mg)' : 'transparent'}`,
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{
              height: 52,
              background: 'var(--surface2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <img
                src={img.url}
                alt={img.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {img.status === 'done' && (
                <div style={{
                  position: 'absolute', top: 4, right: 4,
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'var(--success)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, color: 'white', fontWeight: 700,
                }}>✓</div>
              )}
              {img.status === 'in_progress' && (
                <div style={{
                  position: 'absolute', top: 4, right: 4,
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'var(--warning)',
                }}/>
              )}
            </div>
            <div style={{
              padding: '4px 8px',
              fontSize: 10,
              color: activeImageId === img.id ? 'var(--mg)' : 'var(--text-muted)',
              background: 'var(--surface)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {img.name}
            </div>
          </div>
        ))}
      </div>

      {/* Clases */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>
          Clases
        </div>
        {classes.map(cls => (
          <div
            key={cls.id}
            onClick={() => setActiveClassId(cls.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 0', cursor: 'pointer',
            }}
          >
            <div style={{
              width: 10, height: 10, borderRadius: 2,
              background: cls.color, flexShrink: 0,
              outline: activeClassId === cls.id ? `2px solid ${cls.color}` : 'none',
              outlineOffset: 2,
            }}/>
            <span style={{
              fontSize: 12,
              color: activeClassId === cls.id ? cls.color : 'var(--text-muted)',
              fontWeight: activeClassId === cls.id ? 600 : 400,
            }}>
              {cls.id} · {cls.name}
            </span>
          </div>
        ))}
      </div>

    </aside>
  )
}