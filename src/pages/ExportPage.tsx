import { useAnnotator } from '../context/AnnotatorContext'
import { exportYoloZip } from '../utils/exportZip'
import { useState } from 'react'

export function ExportPage() {
  const { images, classes } = useAnnotator()
  const [exporting, setExporting] = useState(false)

  const annotated = images.filter(i => i.annotations.length > 0)
  const pending   = images.filter(i => i.annotations.length === 0)

  async function handleExport() {
    if (annotated.length === 0) return
    setExporting(true)
    await exportYoloZip(images, classes)
    setExporting(false)
  }

  return (
    <div style={{
      height: '100%', overflowY: 'auto',
      padding: 40, display: 'flex',
      flexDirection: 'column', alignItems: 'center', gap: 32,
    }}>

      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>Exportar dataset</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Genera el .zip listo para entrenar con darknet
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12, width: '100%', maxWidth: 480,
      }}>
        {[
          { label: 'Total imágenes', value: images.length },
          { label: 'Anotadas', value: annotated.length },
          { label: 'Pendientes', value: pending.length },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'var(--surface)', borderRadius: 8,
            padding: '14px 16px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, fontWeight: 500, color: 'var(--mg)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
          Contenido del .zip
        </div>
        {['images/', 'labels/', 'obj.names', 'train.txt', 'obj.data'].map(f => (
          <div key={f} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 0', borderBottom: '1px solid var(--border)',
            fontSize: 13, color: 'var(--text-muted)',
            fontFamily: 'monospace',
          }}>
            {f}
          </div>
        ))}
      </div>

      <button
        onClick={handleExport}
        disabled={annotated.length === 0 || exporting}
        style={{
          padding: '12px 32px',
          background: annotated.length === 0 ? 'var(--surface2)' : 'var(--mg)',
          color: annotated.length === 0 ? 'var(--text-faint)' : 'white',
          border: 'none', borderRadius: 8,
          fontSize: 14, fontWeight: 600,
          cursor: annotated.length === 0 ? 'not-allowed' : 'pointer',
        }}
      >
        {exporting ? 'Generando...' : 'Descargar dataset YOLO'}
      </button>

      {annotated.length === 0 && (
        <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>
          Anotá al menos una imagen para exportar
        </div>
      )}

    </div>
  )
}