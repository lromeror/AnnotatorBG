import { useAnnotator } from '../context/AnnotatorContext'
import { DropZone } from '../components/upload/DropZone'

export function UploadPage() {
  const { images } = useAnnotator()
  const done = images.filter(i => i.status === 'done').length

  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 32,
    }}>

      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, color: 'var(--text)', marginBottom: 8 }}>
          Subir imágenes
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Cargá los documentos bancarios que querés anotar
        </p>
      </div>

      <DropZone />

      {images.length > 0 && (
        <div style={{ width: '100%', maxWidth: 520 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: 12, alignItems: 'center'
          }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {images.length} imagen{images.length !== 1 ? 'es' : ''} cargada{images.length !== 1 ? 's' : ''}
            </span>
            <span style={{ fontSize: 12, color: 'var(--mg)' }}>
              {done} anotada{done !== 1 ? 's' : ''}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {images.map(img => (
              <div key={img.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px',
                background: 'var(--surface)',
                borderRadius: 8,
                border: '1px solid var(--border)',
              }}>
                <img
                  src={img.url}
                  alt={img.name}
                  style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 4 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13, color: 'var(--text)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                  }}>
                    {img.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    {img.width} × {img.height}px
                  </div>
                </div>
                <div style={{
                  fontSize: 11,
                  padding: '2px 8px',
                  borderRadius: 99,
                  background: img.status === 'done'
                    ? 'rgba(34,197,94,0.15)'
                    : 'rgba(255,255,255,0.06)',
                  color: img.status === 'done' ? '#22c55e' : 'var(--text-muted)',
                }}>
                  {img.status === 'done' ? 'anotada' : 'pendiente'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}