import { useState } from 'react'
import { useAnnotator } from './context/AnnotatorContext'
import { Navbar } from './components/layout/Navbar'
import { Sidebar } from './components/layout/Sidebar'
import { UploadPage } from './pages/UploadPage'
import { AnnotatorPage } from './pages/AnnotatorPage'
import { ExportPage } from './pages/ExportPage'

type Page = 'upload' | 'annotate' | 'export'

function App() {
  const [page, setPage] = useState<Page>('upload')
  const { images } = useAnnotator()

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar page={page} onPageChange={setPage} imageCount={images.length} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'hidden' }}>
          {page === 'upload'   && <UploadPage />}
          {page === 'annotate' && <AnnotatorPage />}
          {page === 'export' && <ExportPage />}
        </main>
      </div>
    </div>
  )
}

export default App