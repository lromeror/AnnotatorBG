import { useRef, useState } from 'react'
import { validateImage } from '../../utils/imageValidation'
import { useAnnotator } from '../../context/AnnotatorContext'
import type { ImageFile } from '../../types/index'

function generateId(): string {
  return Math.random().toString(36).slice(2, 10)
}

export function DropZone() {
  const { addImages } = useAnnotator()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  async function processFiles(files: File[]) {
    const errs: string[] = []
    const valid: ImageFile[] = []

    for (const file of files) {
      const error = validateImage(file)
      if (error) { errs.push(error); continue }

      const url = URL.createObjectURL(file)
      const dims = await getImageDimensions(url)

      valid.push({
        id: generateId(),
        name: file.name,
        url,
        width: dims.width,
        height: dims.height,
        annotations: [],
        status: 'pending',
      })
    }

    setErrors(errs)
    if (valid.length > 0) addImages(valid)
  }

  function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
    return new Promise(resolve => {
      const img = new Image()
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
      img.src = url
    })
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    processFiles(files)
    e.target.value = ''
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          width: '100%',
          maxWidth: 520,
          height: 220,
          border: `2px dashed ${dragging ? 'var(--mg)' : 'var(--border-md)'}`,
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          cursor: 'pointer',
          background: dragging ? 'rgba(229,0,125,0.06)' : 'var(--surface)',
          transition: 'all 0.2s',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--mg)" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>
            Arrastrá imágenes aquí
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            o hacé clic para seleccionar · JPG, PNG, BMP · máx 10MB
          </div>
        </div>
        <button style={{
          padding: '8px 20px',
          background: 'var(--mg)',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
        }}>
          Seleccionar archivos
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/bmp"
        multiple
        style={{ display: 'none' }}
        onChange={onFileChange}
      />

      {errors.length > 0 && (
        <div style={{ width: '100%', maxWidth: 520 }}>
          {errors.map((err, i) => (
            <div key={i} style={{
              padding: '8px 12px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 6,
              fontSize: 12,
              color: '#f87171',
              marginBottom: 6,
            }}>
              {err}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}