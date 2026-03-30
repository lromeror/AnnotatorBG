import JSZip from 'jszip'
import type { ImageFile, AnnotationClass } from '../types/index'
import { formatYoloLine, boxToYolo } from './yoloFormat'

export async function exportYoloZip(
  images: ImageFile[],
  classes: AnnotationClass[]
): Promise<void> {
  const zip = new JSZip()
  const imgFolder = zip.folder('images')!
  const lblFolder = zip.folder('labels')!

  const annotated = images.filter(i => i.annotations.length > 0)

  for (const img of annotated) {
    const response = await fetch(img.url)
    const blob = await response.blob()
    imgFolder.file(img.name, blob)

    const lines = img.annotations.map(box =>
      formatYoloLine(boxToYolo(box))
    )
    const txtName = img.name.replace(/\.[^.]+$/, '.txt')
    lblFolder.file(txtName, lines.join('\n'))
  }

  const namesContent = classes.map(c => c.name).join('\n')
  zip.file('obj.names', namesContent)

  const trainContent = annotated.map(i => `images/${i.name}`).join('\n')
  zip.file('train.txt', trainContent)

  const dataContent = [
    `classes = ${classes.length}`,
    `train = train.txt`,
    `names = obj.names`,
    `backup = backup/`,
  ].join('\n')
  zip.file('obj.data', dataContent)

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'dataset_yolo.zip'
  a.click()
  URL.revokeObjectURL(url)
}