import { useDroppable } from '@dnd-kit/core'
import Element from './Element'
import { Plus } from 'lucide-react'

export default function Section({
  section,
  selectedElement,
  setSelectedElement,
  updateElement,
  updateSection,
  addElement,
  deleteElement,
  moveElement,
  editDevice,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: section.id,
  })

  const getSectionStyles = () => {
    const styles = { ...section.styles }
    
    // Handle responsive hero height
    if (section.id === 'hero') {
      if (editDevice === 'mobile' || editDevice === 'tablet') {
        styles.height = '100%'
        styles.minHeight = '100%'
      } else {
        // Desktop: keep calc(100vh - 4em)
        styles.height = styles.height || 'calc(100vh - 4em)'
        styles.minHeight = styles.minHeight || 'calc(100vh - 4em)'
      }
    }
    
    if (styles.backgroundImage) {
      return {
        ...styles,
        backgroundImage: `url(${styles.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
    // Handle gradient backgrounds
    if (styles.background && styles.background.includes('gradient')) {
      return {
        ...styles,
        background: styles.background,
      }
    }
    return styles
  }

  return (
    <div
      ref={setNodeRef}
      className={`relative group ${isOver ? 'ring-2 ring-blue-500' : ''} ${
        selectedElement === section.id ? 'ring-2 ring-blue-500' : ''
      }`}
      style={getSectionStyles()}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target.closest('.container')) {
          setSelectedElement(section.id)
        }
      }}
    >
      <div className="container mx-auto px-5" style={{ height: section.id === 'header' ? '100%' : 'auto' }}>
        <div 
          className="relative"
          style={{ 
            minHeight: section.id === 'header' ? '4em' : '200px',
            height: section.id === 'header' ? '4em' : 'auto',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            display: section.id === 'header' ? 'flex' : 'block',
            alignItems: section.id === 'header' ? 'center' : 'normal',
            justifyContent: section.id === 'header' ? 'space-between' : 'normal',
          }}
          onClick={(e) => {
            // Select section when clicking on empty area, but not if clicking delete button
            if (e.target === e.currentTarget && !e.target.closest('button[title="Delete"]')) {
              setSelectedElement(section.id)
            }
          }}
        >
          {section.children?.map((element) => (
            <Element
              key={element.id}
              element={element}
              sectionId={section.id}
              isSelected={selectedElement === element.id}
              onSelect={() => setSelectedElement(element.id)}
              onUpdate={(updates) => updateElement(element.id, updates)}
              onDelete={() => deleteElement(element.id)}
              onMove={(position) => moveElement(element.id, position)}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => addElement(section.id, 'text')}
          className="p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          title="Add Text"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => {
            setSelectedElement(section.id)
          }}
          className={`p-2 rounded-lg shadow-lg transition-colors ${
            selectedElement === section.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
          title="Select Section"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}

