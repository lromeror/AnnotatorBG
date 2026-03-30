const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/bmp']
const MAX_SIZE_MB = 10

export function validateImage(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `Formato no soportado: ${file.type}. Usá JPG, PNG o BMP.`
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `La imagen ${file.name} supera los ${MAX_SIZE_MB}MB.`
  }
  return null
}