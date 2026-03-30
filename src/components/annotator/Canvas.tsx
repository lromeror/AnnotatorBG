import { useEffect } from 'react'
import { useAnnotator } from '../../context/AnnotatorContext'
import type { BoundingBox } from '../../types/index'
import type { DrawingBox } from '../../hooks/useCanvas'

interface CanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>
    imageUrl: string
    imageWidth: number
    imageHeight: number
    boxes: BoundingBox[]
    drawing: DrawingBox | null
    onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void
    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
    onMouseUp: () => void
}

export function Canvas({
    canvasRef, imageUrl, imageWidth, imageHeight,
    boxes, drawing, onMouseDown, onMouseMove, onMouseUp
}: CanvasProps) {
    const { activeClassId, classes } = useAnnotator()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = new Image()
        img.src = imageUrl
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            boxes.forEach(box => {
                const cls = classes.find(c => c.id === box.classId)
                const color = cls?.color ?? '#E5007D'
                const x = (box.cx - box.w / 2) * canvas.width
                const y = (box.cy - box.h / 2) * canvas.height
                const w = box.w * canvas.width
                const h = box.h * canvas.height

                ctx.strokeStyle = color
                ctx.lineWidth = 2
                ctx.strokeRect(x, y, w, h)

                ctx.fillStyle = color
                ctx.fillRect(x, y - 18, ctx.measureText(cls?.name ?? '').width + 10, 18)
                ctx.fillStyle = 'white'
                ctx.font = '11px sans-serif'
                ctx.fillText(cls?.name ?? '', x + 5, y - 5)
            })

            if (drawing) {
                const cls = classes.find(c => c.id === activeClassId)
                const color = cls?.color ?? '#E5007D'
                const x = Math.min(drawing.startX, drawing.currentX)
                const y = Math.min(drawing.startY, drawing.currentY)
                const w = Math.abs(drawing.currentX - drawing.startX)
                const h = Math.abs(drawing.currentY - drawing.startY)
                ctx.strokeStyle = color
                ctx.lineWidth = 2
                ctx.setLineDash([5, 3])
                ctx.strokeRect(x, y, w, h)
                ctx.setLineDash([])
            }
        }
    }, [boxes, drawing, imageUrl, classes, activeClassId, canvasRef])

    return (
        <div style={{
            flex: 1, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg)', overflow: 'hidden', padding: 20,
        }}>
            <canvas
                ref={canvasRef}
                width={imageWidth}
                height={imageHeight}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'crosshair', display: 'block' }}
            />
        </div>
    )
}