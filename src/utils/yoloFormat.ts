import type { BoundingBox } from '../types/index'
import type { YoloAnnotation } from '../types/yolo'

export function boxToYolo(box: BoundingBox): YoloAnnotation {
  return {
    classId: box.classId,
    cx: box.cx,
    cy: box.cy,
    w: box.w,
    h: box.h,
  }
}

export function formatYoloLine(annotation: YoloAnnotation): string {
  const { classId, cx, cy, w, h } = annotation
  return `${classId} ${cx.toFixed(6)} ${cy.toFixed(6)} ${w.toFixed(6)} ${h.toFixed(6)}`
}

export function pixelsToYolo(
  x: number, y: number,
  width: number, height: number,
  canvasWidth: number, canvasHeight: number
): Pick<BoundingBox, 'cx' | 'cy' | 'w' | 'h'> {
  return {
    cx: (x + width / 2) / canvasWidth,
    cy: (y + height / 2) / canvasHeight,
    w: width / canvasWidth,
    h: height / canvasHeight,
  }
}