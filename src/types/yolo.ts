export interface YoloAnnotation {
  classId: number
  cx: number
  cy: number
  w: number
  h: number
}

export interface YoloDataset {
  images: {
    filename: string
    annotations: YoloAnnotation[]
  }[]
  classes: string[]
}