import { useState, useRef, useEffect } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Toolbar from './components/Toolbar'
import PropertyPanel from './components/PropertyPanel'
import { initialPageData } from './data/initialData'

function App() {
  const [pageData, setPageData] = useState(initialPageData)
  const [selectedElement, setSelectedElement] = useState(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [editDevice, setEditDevice] = useState('desktop') // Device for editing mode
  const [isToolbarOpen, setIsToolbarOpen] = useState(true)
  const [isPropertyPanelOpen, setIsPropertyPanelOpen] = useState(true)
  
  // Undo/Redo functionality
  const historyRef = useRef([initialPageData])
  const historyIndexRef = useRef(0)
  const [copiedElement, setCopiedElement] = useState(null)
  
  const saveToHistory = (newData) => {
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1)
    newHistory.push(JSON.parse(JSON.stringify(newData)))
    historyRef.current = newHistory
    historyIndexRef.current = newHistory.length - 1
    // Limit history to 50 states
    if (historyRef.current.length > 50) {
      historyRef.current.shift()
      historyIndexRef.current--
    }
  }
  
  const undo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--
      setPageData(JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current])))
    }
  }
  
  const redo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++
      setPageData(JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current])))
    }
  }
  
  const findElement = (data, elementId) => {
    if (!elementId) return null
    for (const section of data.sections) {
      if (section.id === elementId) return section
      if (section.children) {
        const found = section.children.find(el => el.id === elementId)
        if (found) return found
      }
    }
    return null
  }
  
  const copyElement = () => {
    if (selectedElement) {
      const element = findElement(pageData, selectedElement)
      if (element && !pageData.sections.some(s => s.id === selectedElement)) {
        setCopiedElement(JSON.parse(JSON.stringify(element)))
      }
    }
  }
  
  const pasteElement = (sectionId) => {
    if (copiedElement) {
      const newElement = {
        ...copiedElement,
        id: `element-${Date.now()}`,
        position: { x: (copiedElement.position?.x || 16) + 20, y: (copiedElement.position?.y || 16) + 20 }
      }
      setPageData(prev => {
        const addToSection = (sections) => {
          return sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                children: [...(section.children || []), newElement]
              }
            }
            return section
          })
        }
        const newData = {
          ...prev,
          sections: addToSection(prev.sections)
        }
        saveToHistory(newData)
        return newData
      })
      setSelectedElement(newElement.id)
    }
  }

  const updateElement = (elementId, updates) => {
    setPageData(prev => {
      const updateRecursive = (elements) => {
        return elements.map(el => {
          if (el.id === elementId) {
            return { ...el, ...updates }
          }
          if (el.children) {
            return { ...el, children: updateRecursive(el.children) }
          }
          return el
        })
      }
      const newData = {
        ...prev,
        sections: prev.sections.map(section => {
          if (section.id === elementId) {
            return { ...section, ...updates }
          }
          if (section.children) {
            return { ...section, children: updateRecursive(section.children) }
          }
          return section
        })
      }
      saveToHistory(newData)
      return newData
    })
  }

  const updateSection = (sectionId, updates) => {
    setPageData(prev => {
      const newData = {
        ...prev,
        sections: prev.sections.map(section =>
          section.id === sectionId ? { ...section, ...updates } : section
        )
      }
      saveToHistory(newData)
      return newData
    })
  }

  const addElement = (sectionId, elementType, position = null) => {
    const safeZone = 16
    const defaultContent = {
      text: 'New Text',
      button: 'Button',
      image: 'https://via.placeholder.com/400x300',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      icon: '⭐',
      divider: '',
      container: '',
    }
    
    const defaultStyles = {
      text: {
        fontSize: '16px',
        color: '#000000',
        backgroundColor: 'transparent',
        padding: '12px 24px',
        borderRadius: '0',
        fontWeight: '400',
        textAlign: 'left',
        margin: '0',
        width: 'auto',
        height: 'auto',
      },
      button: {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#3b82f6',
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: '500',
        textAlign: 'center',
        margin: '0',
        width: 'auto',
        height: 'auto',
        border: 'none',
        cursor: 'pointer',
        background: undefined,
      },
      image: {
        width: '400px',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '8px',
        margin: '0',
      },
      video: {
        width: '560px',
        height: '315px',
        borderRadius: '8px',
        margin: '0',
        border: 'none',
      },
      icon: {
        fontSize: '48px',
        width: 'auto',
        height: 'auto',
        margin: '0',
        textAlign: 'center',
      },
      divider: {
        width: '100%',
        height: '1px',
        backgroundColor: '#e5e7eb',
        margin: '24px 0',
        border: 'none',
      },
      container: {
        width: '100%',
        minHeight: '200px',
        padding: '24px',
        backgroundColor: 'transparent',
        border: '1px dashed #d1d5db',
        borderRadius: '8px',
        margin: '0',
      },
    }
    
    const newElement = {
      id: `element-${Date.now()}`,
      type: elementType,
      content: defaultContent[elementType] || '',
      styles: defaultStyles[elementType] || defaultStyles.text,
      position: position || { x: safeZone, y: safeZone }
    }

    setPageData(prev => {
      const addToSection = (sections) => {
        return sections.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              children: [...(section.children || []), newElement]
            }
          }
          return section
        })
      }
      const newData = {
        ...prev,
        sections: addToSection(prev.sections)
      }
      saveToHistory(newData)
      return newData
    })
    setSelectedElement(newElement.id)
  }

  const deleteElement = (elementId) => {
    setPageData(prev => {
      const newData = {
        ...prev,
        sections: prev.sections.map(section => {
          if (section.children) {
            return {
              ...section,
              children: section.children.filter(el => el.id !== elementId)
            }
          }
          return section
        })
      }
      saveToHistory(newData)
      return newData
    })
    if (selectedElement === elementId) {
      setSelectedElement(null)
    }
  }

  const moveElement = (elementId, newPosition) => {
    updateElement(elementId, { position: newPosition })
  }

  const exportHTML = () => {
    // This will be implemented in the export utility
    return pageData
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault()
        copyElement()
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault()
        if (selectedElement) {
          const element = findElement(pageData, selectedElement)
          if (element && pageData.sections.some(s => s.id === selectedElement)) {
            pasteElement(selectedElement)
          } else if (element) {
            // Find parent section
            for (const section of pageData.sections) {
              if (section.children?.some(el => el.id === selectedElement)) {
                pasteElement(section.id)
                break
              }
            }
          }
        }
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        // Don't delete if user is editing text in an input, textarea, or contenteditable element
        const target = e.target
        const isEditingText = target.tagName === 'INPUT' || 
                              target.tagName === 'TEXTAREA' || 
                              target.isContentEditable ||
                              target.closest('input, textarea, [contenteditable="true"]')
        
        if (!isEditingText && selectedElement && !isPreviewMode) {
          const element = findElement(pageData, selectedElement)
          if (element && !pageData.sections.some(s => s.id === selectedElement)) {
            e.preventDefault()
            deleteElement(selectedElement)
          }
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedElement, pageData, isPreviewMode, undo, redo, copyElement, pasteElement, deleteElement])

  return (
    <div className="flex h-screen bg-gray-50">
      {isToolbarOpen && (
        <Toolbar 
          isPreviewMode={isPreviewMode}
          setIsPreviewMode={setIsPreviewMode}
          previewDevice={previewDevice}
          setPreviewDevice={setPreviewDevice}
          editDevice={editDevice}
          setEditDevice={setEditDevice}
          pageData={pageData}
          exportHTML={exportHTML}
          undo={undo}
          redo={redo}
          canUndo={historyIndexRef.current > 0}
          canRedo={historyIndexRef.current < historyRef.current.length - 1}
          copyElement={copyElement}
          pasteElement={pasteElement}
          canPaste={!!copiedElement}
          onClose={() => setIsToolbarOpen(false)}
        />
      )}
      
      {!isToolbarOpen && (
        <button
          onClick={() => setIsToolbarOpen(true)}
          className="fixed left-0 top-4 z-50 p-2 bg-gray-900 text-white rounded-r-lg shadow-lg hover:bg-gray-800 transition-colors"
          title="Open Toolbar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}
      
      <div className="flex-1 flex overflow-hidden">
        {isPreviewMode ? (
          <Preview 
            pageData={pageData} 
            device={previewDevice}
          />
        ) : (
          <Editor
            pageData={pageData}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            updateElement={updateElement}
            updateSection={updateSection}
            addElement={addElement}
            deleteElement={deleteElement}
            moveElement={moveElement}
            setPageData={setPageData}
            editDevice={editDevice}
          />
        )}
        
        {!isPreviewMode && isPropertyPanelOpen && (
          <PropertyPanel
            selectedElement={selectedElement}
            pageData={pageData}
            updateElement={updateElement}
            updateSection={updateSection}
            addElement={addElement}
            deleteElement={deleteElement}
            copyElement={copyElement}
            pasteElement={pasteElement}
            canPaste={!!copiedElement}
            onClose={() => setIsPropertyPanelOpen(false)}
          />
        )}
        
        {!isPreviewMode && !isPropertyPanelOpen && (
          <button
            onClick={() => setIsPropertyPanelOpen(true)}
            className="fixed right-0 top-4 z-50 p-2 bg-white text-gray-700 border border-gray-200 rounded-l-lg shadow-lg hover:bg-gray-50 transition-colors"
            title="Open Properties"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default App

