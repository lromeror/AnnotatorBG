export type AnnotationStatus = 'pending' | 'in_progress' | 'done'

export interface BoundingBox {
  id: string
  classId: number
  cx: number   // centro x normalizado 0-1
  cy: number   // centro y normalizado 0-1
  w: number    // ancho normalizado 0-1
  h: number    // alto normalizado 0-1
}

export interface AnnotationClass {
  id: number
  name: string
  color: string
}

export interface ImageFile {
  id: string
  name: string
  url: string
  width: number
  height: number
  annotations: BoundingBox[]
  status: AnnotationStatus
}

export interface ExportOptions {
  format: 'yolo'
  includeImages: boolean
}