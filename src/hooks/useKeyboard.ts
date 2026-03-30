import { useEffect } from 'react'

interface UseKeyboardProps {
  onUndo: () => void
  onClassChange: (id: number) => void
  maxClassId: number
}

export function useKeyboard({ onUndo, onClassChange, maxClassId }: UseKeyboardProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        onUndo()
        return
      }
      const num = parseInt(e.key)
      if (!isNaN(num) && num >= 0 && num <= maxClassId) {
        onClassChange(num)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onUndo, onClassChange, maxClassId])
}