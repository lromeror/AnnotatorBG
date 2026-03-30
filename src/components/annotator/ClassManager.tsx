import { useState } from 'react'
import { useAnnotator } from '../../context/AnnotatorContext'
import type { AnnotationClass } from '../../types/index'

const PRESET_COLORS = [
  '#E5007D', '#1B2B4B', '#f59e0b', '#22c55e',
  '#3b82f6', '#a855f7', '#ef4444', '#06b6d4',
]

export function ClassManager() {
  const { classes, setClasses, activeClassId, setActiveClassId } = useAnnotator()
  const [newName, setNewName] = useState('')
  const [newColor, setNewColor] = useState('#E5007D')
  const [error, setError] = useState('')

  function handleAdd() {
    const name = newName.trim().toLowerCase()
    if (!name) { setError('El nombre no puede estar vacío'); return }
    if (classes.find(c => c.name === name)) { setError('Ya existe esa clase'); return }

    const newClass: AnnotationClass = {
      id: classes.length,
      name,
      color: newColor,
    }
    setClasses([...classes, newClass])
    setNewName('')
    setError('')
  }

  function handleRemove(id: number) {
    const updated = classes
      .filter(c => c.id !== id)
      .map((c, i) => ({ ...c, id: i }))
    setClasses(updated)
    if (activeClassId >= updated.length) {
      setActiveClassId(Math.max(0, updated.length - 1))
    }
  }

  return (
    <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)' }}>
      <div style={{
        fontSize: 10, color: 'var(--text-muted)',
        textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8
      }}>
        Clases
      </div>

      {/* Lista de clases */}
      {classes.length === 0 && (
        <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 8 }}>
          Sin clases aún
        </div>
      )}

      {classes.map(cls => (
        <div
          key={cls.id}
          style={{
            display: 'flex', alignItems: 'center',
            gap: 8, padding: '4px 0', cursor: 'pointer',
          }}
          onClick={() => setActiveClassId(cls.id)}
        >
          <div style={{
            width: 10, height: 10, borderRadius: 2,
            background: cls.color, flexShrink: 0,
            outline: activeClassId === cls.id ? `2px solid ${cls.color}` : 'none',
            outlineOffset: 2,
          }}/>
          <span style={{
            flex: 1, fontSize: 12,
            color: activeClassId === cls.id ? cls.color : 'var(--text-muted)',
            fontWeight: activeClassId === cls.id ? 600 : 400,
          }}>
            {cls.id} · {cls.name}
          </span>
          <button
            onClick={e => { e.stopPropagation(); handleRemove(cls.id) }}
            style={{
              background: 'none', border: 'none',
              color: 'var(--text-faint)', cursor: 'pointer',
              fontSize: 14, lineHeight: 1, padding: '0 2px',
            }}
          >
            ×
          </button>
        </div>
      ))}

      {/* Formulario nueva clase */}
      <div style={{
        marginTop: 10, padding: '10px',
        background: 'var(--surface2)', borderRadius: 6,
      }}>
        <input
          value={newName}
          onChange={e => { setNewName(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="nombre de clase"
          style={{
            width: '100%', background: 'var(--surface)',
            border: '1px solid var(--border-md)',
            borderRadius: 4, padding: '5px 8px',
            fontSize: 12, color: 'var(--text)',
            marginBottom: 8, outline: 'none',
          }}
        />

        {/* Selector de color */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
          {PRESET_COLORS.map(color => (
            <div
              key={color}
              onClick={() => setNewColor(color)}
              style={{
                width: 18, height: 18, borderRadius: 3,
                background: color, cursor: 'pointer',
                outline: newColor === color ? `2px solid white` : 'none',
                outlineOffset: 1,
              }}
            />
          ))}
          <input
            type="color"
            value={newColor}
            onChange={e => setNewColor(e.target.value)}
            style={{ width: 18, height: 18, padding: 0, border: 'none', cursor: 'pointer', borderRadius: 3 }}
            title="Color personalizado"
          />
        </div>

        {error && (
          <div style={{ fontSize: 11, color: 'var(--danger)', marginBottom: 6 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleAdd}
          style={{
            width: '100%', padding: '6px',
            background: 'var(--mg)', color: 'white',
            border: 'none', borderRadius: 4,
            fontSize: 12, fontWeight: 500, cursor: 'pointer',
          }}
        >
          + Agregar clase
        </button>
      </div>
    </div>
  )
}