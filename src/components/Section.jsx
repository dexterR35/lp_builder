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
    
    // Handle responsive section heights based on device
    if (section.id === 'hero') {
      if (editDevice === 'mobile') {
        styles.height = '90vh'
        styles.minHeight = '90vh'
      } else if (editDevice === 'tablet') {
        styles.height = '85vh'
        styles.minHeight = '85vh'
      } else {
        // Desktop: calc(100vh - 4em)
        styles.height = 'calc(100vh - 4em)'
        styles.minHeight = 'calc(100vh - 4em)'
      }
    } else if (section.id === 'steps') {
      if (editDevice === 'mobile') {
        styles.height = 'auto'
        styles.minHeight = '400px'
        styles.padding = '40px 0'
      } else if (editDevice === 'tablet') {
        styles.height = 'auto'
        styles.minHeight = '450px'
        styles.padding = '60px 0'
      } else {
        styles.height = '500px'
        styles.minHeight = '500px'
        styles.padding = '80px 0'
      }
    } else if (section.id === 'payment') {
      if (editDevice === 'mobile') {
        styles.padding = '40px 0'
      } else if (editDevice === 'tablet') {
        styles.padding = '60px 0'
      } else {
        styles.padding = '80px 0'
      }
    } else if (section.id === 'footer') {
      if (editDevice === 'mobile') {
        styles.padding = '40px 0 20px'
      } else if (editDevice === 'tablet') {
        styles.padding = '50px 0 25px'
      } else {
        styles.padding = '60px 0 30px'
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
      <div 
        className="container mx-auto" 
        style={{ 
          height: section.id === 'header' ? '100%' : 'auto',
          paddingLeft: editDevice === 'mobile' ? 'clamp(12px, 3vw, 16px)' : editDevice === 'tablet' ? 'clamp(16px, 2.5vw, 20px)' : 'clamp(20px, 2vw, 24px)',
          paddingRight: editDevice === 'mobile' ? 'clamp(12px, 3vw, 16px)' : editDevice === 'tablet' ? 'clamp(16px, 2.5vw, 20px)' : 'clamp(20px, 2vw, 24px)',
          paddingTop: section.id === 'header' ? '0' : (editDevice === 'mobile' ? 'clamp(20px, 3vw, 30px)' : editDevice === 'tablet' ? 'clamp(30px, 2.5vw, 40px)' : 'clamp(40px, 2vw, 50px)'),
          paddingBottom: section.id === 'header' ? '0' : (editDevice === 'mobile' ? 'clamp(20px, 3vw, 30px)' : editDevice === 'tablet' ? 'clamp(30px, 2.5vw, 40px)' : 'clamp(40px, 2vw, 50px)'),
        }}
      >
        <div 
          className="relative"
          style={{ 
            minHeight: section.id === 'header' ? '4em' : (editDevice === 'mobile' ? 'clamp(80px, 15vh, 120px)' : editDevice === 'tablet' ? 'clamp(120px, 20vh, 180px)' : 'clamp(200px, 25vh, 300px)'),
            height: section.id === 'header' ? '4em' : 'auto',
            width: '100%',
            maxWidth: editDevice === 'mobile' ? '100%' : editDevice === 'tablet' ? 'clamp(600px, 90vw, 800px)' : 'clamp(1200px, 85vw, 1400px)',
            margin: '0 auto',
            display: section.id === 'header' ? 'flex' : 'block',
            alignItems: section.id === 'header' ? 'center' : 'normal',
            justifyContent: section.id === 'header' ? 'space-between' : 'normal',
            padding: '0',
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
              editDevice={editDevice}
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

