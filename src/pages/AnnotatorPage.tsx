import { useAnnotator } from '../context/AnnotatorContext'
import { Canvas } from '../components/annotator/Canvas'
import { Toolbar } from '../components/annotator/Toolbar'
import { useCanvas } from '../hooks/useCanvas'
import { useKeyboard } from '../hooks/useKeyboard'

export function AnnotatorPage() {
  const {
    images, activeImageId, setActiveImageId,
    saveAnnotations, classes, setActiveClassId, activeClassId,
  } = useAnnotator()

  const activeIndex = images.findIndex(i => i.id === activeImageId)
  const activeImage = images[activeIndex] ?? null

  const {
    canvasRef, boxes, drawing,
    onMouseDown, onMouseMove, onMouseUp,
    undo, clearBoxes,
  } = useCanvas({
    imageWidth:  activeImage?.width  ?? 800,
    imageHeight: activeImage?.height ?? 600,
    activeClassId,
    initialBoxes: activeImage?.annotations ?? [],
  })

  useKeyboard({
    onUndo: undo,
    onClassChange: setActiveClassId,
    maxClassId: classes.length - 1,
  })

  function goTo(index: number) {
    if (index < 0 || index >= images.length) return
    saveAnnotations(images[activeIndex].id, boxes)
    setActiveImageId(images[index].id)
  }

  function handleSave() {
    if (!activeImage) return
    saveAnnotations(activeImage.id, boxes)
  }

  if (images.length === 0) {
    return (
      <div style={{
        height: '100%', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 12,
      }}>
        <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>No hay imágenes cargadas</div>
        <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>Andá a "Subir imágenes" primero</div>
      </div>
    )
  }

  if (!activeImage) return null

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar
        imageIndex={activeIndex}
        totalImages={images.length}
        boxCount={boxes.length}
        onPrev={() => goTo(activeIndex - 1)}
        onNext={() => goTo(activeIndex + 1)}
        onUndo={undo}
        onClear={clearBoxes}
        onSave={handleSave}
      />
      <Canvas
        key={activeImage.id}
        canvasRef={canvasRef}
        imageUrl={activeImage.url}
        imageWidth={activeImage.width}
        imageHeight={activeImage.height}
        boxes={boxes}
        drawing={drawing}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
    </div>
  )
}