interface ToolbarProps {
  imageIndex: number
  totalImages: number
  boxCount: number
  onPrev: () => void
  onNext: () => void
  onUndo: () => void
  onClear: () => void
  onSave: () => void
}

export function Toolbar({
  imageIndex, totalImages, boxCount,
  onPrev, onNext, onUndo, onClear, onSave
}: ToolbarProps) {

  const btnBase: React.CSSProperties = {
    padding: '5px 12px',
    borderRadius: 5,
    fontSize: 12,
    border: '1px solid var(--border-md)',
    background: 'transparent',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  }

  const btnPrimary: React.CSSProperties = {
    ...btnBase,
    background: 'var(--mg)',
    color: 'white',
    border: 'none',
    fontWeight: 600,
  }

  const sep: React.CSSProperties = {
    width: 1, height: 20,
    background: 'var(--border)',
    margin: '0 4px',
  }

  return (
    <div style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '0 14px',
      height: 44,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0,
    }}>

      <button style={btnBase} onClick={onPrev} disabled={imageIndex === 0}>← Anterior</button>
      <span style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 80, textAlign: 'center' }}>
        {imageIndex + 1} / {totalImages}
      </span>
      <button style={btnBase} onClick={onNext} disabled={imageIndex === totalImages - 1}>Siguiente →</button>

      <div style={sep}/>

      <button style={btnBase} onClick={onUndo}>↩ Deshacer</button>
      <button style={btnBase} onClick={onClear}>Limpiar</button>

      <div style={sep}/>

      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
        {boxCount} box{boxCount !== 1 ? 'es' : ''}
      </span>

      <div style={{ flex: 1 }}/>

      <button style={btnPrimary} onClick={onSave}>Guardar</button>

    </div>
  )
}