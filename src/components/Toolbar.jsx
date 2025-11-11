import { Download, Eye, EyeOff, Monitor, Tablet, Smartphone, Save, Undo, Redo, Copy, Clipboard } from 'lucide-react'
import { exportToHTML } from '../utils/export'

export default function Toolbar({ 
  isPreviewMode, 
  setIsPreviewMode, 
  previewDevice, 
  setPreviewDevice,
  editDevice,
  setEditDevice,
  pageData,
  exportHTML,
  undo,
  redo,
  canUndo,
  canRedo,
  copyElement,
  pasteElement,
  canPaste,
}) {
  const handleExport = () => {
    const html = exportToHTML(pageData)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'landing-page.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSave = () => {
    const data = JSON.stringify(pageData, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'landing-page-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-16 bg-gray-900 flex flex-col items-center py-4 gap-4 border-r border-gray-800">
      <button
        onClick={() => setIsPreviewMode(!isPreviewMode)}
        className={`p-3 rounded-lg transition-colors ${
          isPreviewMode 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
        title={isPreviewMode ? 'Exit Preview' : 'Preview'}
      >
        {isPreviewMode ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            if (isPreviewMode) {
              setPreviewDevice('desktop')
            } else {
              setEditDevice('desktop')
            }
          }}
          className={`p-2 rounded-lg transition-colors ${
            (isPreviewMode ? previewDevice : editDevice) === 'desktop'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          title="Desktop"
        >
          <Monitor size={18} />
        </button>
        <button
          onClick={() => {
            if (isPreviewMode) {
              setPreviewDevice('tablet')
            } else {
              setEditDevice('tablet')
            }
          }}
          className={`p-2 rounded-lg transition-colors ${
            (isPreviewMode ? previewDevice : editDevice) === 'tablet'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          title="Tablet"
        >
          <Tablet size={18} />
        </button>
        <button
          onClick={() => {
            if (isPreviewMode) {
              setPreviewDevice('mobile')
            } else {
              setEditDevice('mobile')
            }
          }}
          className={`p-2 rounded-lg transition-colors ${
            (isPreviewMode ? previewDevice : editDevice) === 'mobile'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          title="Mobile"
        >
          <Smartphone size={18} />
        </button>
      </div>

      {!isPreviewMode && (
        <>
          <div className="border-t border-gray-700 my-2 w-full" />
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`p-3 rounded-lg transition-colors ${
              canUndo
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo size={20} />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className={`p-3 rounded-lg transition-colors ${
              canRedo
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
            }`}
            title="Redo (Ctrl+Y)"
          >
            <Redo size={20} />
          </button>
          <button
            onClick={copyElement}
            className="p-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            title="Copy Element (Ctrl+C)"
          >
            <Copy size={20} />
          </button>
          <button
            onClick={() => {
              // Paste to first section if no selection, or to selected section
              if (pageData.sections.length > 0) {
                pasteElement(pageData.sections[0].id)
              }
            }}
            disabled={!canPaste}
            className={`p-3 rounded-lg transition-colors ${
              canPaste
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
            }`}
            title="Paste Element (Ctrl+V)"
          >
            <Clipboard size={20} />
          </button>
        </>
      )}

      <div className="flex-1" />

      <button
        onClick={handleSave}
        className="p-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
        title="Save Project"
      >
        <Save size={20} />
      </button>

      <button
        onClick={handleExport}
        className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        title="Export HTML"
      >
        <Download size={20} />
      </button>
    </div>
  )
}

