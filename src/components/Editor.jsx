import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import Section from './Section'

export default function Editor({
  pageData,
  selectedElement,
  setSelectedElement,
  updateElement,
  updateSection,
  addElement,
  deleteElement,
  moveElement,
  editDevice,
}) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Small movement to start drag
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  )

  const handleDragStart = (event) => {
    const { active } = event
    // Select element when drag starts
    setSelectedElement(active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over, delta } = event
    
    if (!over) return
    
    // Find the element being dragged
    let activeElement = null
    let sourceSection = null
    
    for (const section of pageData.sections) {
      if (section.children) {
        const found = section.children.find(el => el.id === active.id)
        if (found) {
          activeElement = found
          sourceSection = section
          break
        }
      }
    }
    
    if (!activeElement || !sourceSection) return
    
    // Check if dropping on a section
    const targetSection = pageData.sections.find(s => s.id === over.id)
    
    // Only allow movement within the same section
    if (targetSection && targetSection.id === sourceSection.id) {
      // Calculate new position based on delta
      const safeZone = 16
      const currentPosition = activeElement.position || { x: safeZone, y: safeZone }
      const newPosition = {
        x: Math.max(safeZone, currentPosition.x + (delta?.x || 0)),
        y: Math.max(safeZone, currentPosition.y + (delta?.y || 0)),
      }
      
      // Update position within same section
      updateElement(active.id, { position: newPosition })
    }
  }

  const getDeviceWidth = () => {
    switch (editDevice) {
      case 'mobile':
        return '375px'
      case 'tablet':
        return '768px'
      default:
        return '100%'
    }
  }

  const getDeviceClass = () => {
    switch (editDevice) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
      default:
        return 'w-full'
    }
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-100 p-8">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div 
          className={`bg-white shadow-2xl ${getDeviceClass()}`}
          style={{ 
            width: getDeviceWidth(), 
            minHeight: '100vh',
            transition: 'width 0.3s ease'
          }}
        >
          {pageData.sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              updateElement={updateElement}
              updateSection={updateSection}
              addElement={addElement}
              deleteElement={deleteElement}
              moveElement={moveElement}
              editDevice={editDevice}
            />
          ))}
        </div>
      </DndContext>
    </div>
  )
}

