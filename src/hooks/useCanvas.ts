import { useRef, useState, useCallback } from 'react'
import type { BoundingBox } from '../types/index'
import { pixelsToYolo } from '../utils/yoloFormat'

function generateId(): string {
  return Math.random().toString(36).slice(2, 10)
}

interface UseCanvasProps {
  imageWidth: number
  imageHeight: number
  activeClassId: number
  initialBoxes?: BoundingBox[]
}

export interface DrawingBox {
  startX: number
  startY: number
  currentX: number
  currentY: number
}

export function useCanvas({
  imageWidth,
  imageHeight,
  activeClassId,
  initialBoxes = [],
}: UseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [boxes, setBoxes] = useState<BoundingBox[]>(initialBoxes)
  const [drawing, setDrawing] = useState<DrawingBox | null>(null)
  const isDrawing = useRef(false)

  function getCanvasPos(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function onMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const { x, y } = getCanvasPos(e)
    isDrawing.current = true
    setDrawing({ startX: x, startY: y, currentX: x, currentY: y })
  }

  function onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing.current) return
    const { x, y } = getCanvasPos(e)
    setDrawing(prev => prev ? { ...prev, currentX: x, currentY: y } : null)
  }

  function onMouseUp() {
    if (!isDrawing.current || !drawing) return
    isDrawing.current = false

    const canvas = canvasRef.current
    if (!canvas) return

    const x = Math.min(drawing.startX, drawing.currentX)
    const y = Math.min(drawing.startY, drawing.currentY)
    const w = Math.abs(drawing.currentX - drawing.startX)
    const h = Math.abs(drawing.currentY - drawing.startY)

    if (w < 8 || h < 8) { setDrawing(null); return }

    const yolo = pixelsToYolo(x, y, w, h, canvas.width, canvas.height)

    const newBox: BoundingBox = {
      id: generateId(),
      classId: activeClassId,
      ...yolo,
    }

    setBoxes(prev => [...prev, newBox])
    setDrawing(null)
  }

  function removeBox(id: string) {
    setBoxes(prev => prev.filter(b => b.id !== id))
  }

  function undo() {
    setBoxes(prev => prev.slice(0, -1))
  }

  function clearBoxes() {
    setBoxes([])
  }

  return {
    canvasRef,
    boxes,
    drawing,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    removeBox,
    undo,
    clearBoxes,
  }
}