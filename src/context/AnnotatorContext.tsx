import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { ImageFile, AnnotationClass, BoundingBox } from '../types/index'

const DEFAULT_CLASSES: AnnotationClass[] = [
  { id: 0, name: 'monto',  color: '#E5007D' },
  { id: 1, name: 'fecha',  color: '#2d4270' },
  { id: 2, name: 'firma',  color: '#f59e0b' },
  { id: 3, name: 'cuenta', color: '#22c55e' },
]

interface AnnotatorContextType {
  images: ImageFile[]
  activeImageId: string | null
  activeClassId: number
  classes: AnnotationClass[]
  addImages: (files: ImageFile[]) => void
  setActiveImageId: (id: string) => void
  setActiveClassId: (id: number) => void
  saveAnnotations: (imageId: string, boxes: BoundingBox[]) => void
  removeImage: (id: string) => void
}

const AnnotatorContext = createContext<AnnotatorContextType | null>(null)

export function AnnotatorProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageFile[]>([])
  const [activeImageId, setActiveImageId] = useState<string | null>(null)
  const [activeClassId, setActiveClassId] = useState(0)
  const [classes] = useState<AnnotationClass[]>(DEFAULT_CLASSES)

  function addImages(newImages: ImageFile[]) {
    setImages(prev => {
      const existingNames = new Set(prev.map(i => i.name))
      const filtered = newImages.filter(i => !existingNames.has(i.name))
      const updated = [...prev, ...filtered]
      if (!activeImageId && updated.length > 0) {
        setActiveImageId(updated[0].id)
      }
      return updated
    })
  }

  function saveAnnotations(imageId: string, boxes: BoundingBox[]) {
    setImages(prev => prev.map(img => {
      if (img.id !== imageId) return img
      return {
        ...img,
        annotations: boxes,
        status: boxes.length > 0 ? 'done' : 'pending'
      }
    }))
  }

  function removeImage(id: string) {
    setImages(prev => {
      const updated = prev.filter(i => i.id !== id)
      if (activeImageId === id) {
        setActiveImageId(updated[0]?.id ?? null)
      }
      return updated
    })
  }

  return (
    <AnnotatorContext.Provider value={{
      images,
      activeImageId,
      activeClassId,
      classes,
      addImages,
      setActiveImageId,
      setActiveClassId,
      saveAnnotations,
      removeImage,
    }}>
      {children}
    </AnnotatorContext.Provider>
  )
}

export function useAnnotator() {
  const ctx = useContext(AnnotatorContext)
  if (!ctx) throw new Error('useAnnotator debe usarse dentro de AnnotatorProvider')
  return ctx
}