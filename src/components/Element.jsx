import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import React, { useState, useRef, useEffect } from 'react'

export default function Element({
  element,
  sectionId,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onMove,
}) {
  const dragStartedRef = React.useRef(false)
  const elementRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 })
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: element.id,
    data: {
      element,
      sectionId,
    },
  })

  // Combine refs
  const combinedRef = (node) => {
    setNodeRef(node)
    elementRef.current = node
  }

  React.useEffect(() => {
    if (isDragging) {
      dragStartedRef.current = true
    } else {
      setTimeout(() => {
        dragStartedRef.current = false
      }, 100)
    }
  }, [isDragging])

  const getElementStyle = () => {
    const position = element.position || { x: 0, y: 0 }
    
    // Safe zone margins (minimum 16px from edges)
    const safeZone = 16
    
    // During drag, apply transform on top of position
    const left = position.x + (transform?.x || 0)
    const top = position.y + (transform?.y || 0)
    
    const baseStyle = {
      position: 'absolute',
      left: `${Math.max(safeZone, left)}px`,
      top: `${Math.max(safeZone, top)}px`,
      cursor: isDragging ? 'grabbing' : 'grab',
      userSelect: 'none',
      zIndex: isDragging ? 1000 : isSelected ? 100 : 'auto',
      minWidth: element.styles?.width || 'auto',
      minHeight: element.styles?.height || 'auto',
    }
    
    // Handle gradient backgrounds
    const styles = { ...element.styles }
    if (styles.background && styles.background.includes('gradient')) {
      return {
        ...baseStyle,
        ...styles,
        background: styles.background,
        backgroundColor: undefined,
        position: 'absolute',
        left: `${Math.max(0, left)}px`,
        top: `${Math.max(0, top)}px`,
      }
    }
    
    return {
      ...baseStyle,
      ...styles,
      position: 'absolute',
      left: `${Math.max(0, left)}px`,
      top: `${Math.max(0, top)}px`,
    }
  }

  const handleResizeStart = (e, handle) => {
    e.stopPropagation()
    e.preventDefault()
    setIsResizing(handle)
    
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const containerRect = elementRef.current.offsetParent?.getBoundingClientRect() || { left: 0, top: 0 }
      
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: rect.width,
        height: rect.height,
        left: rect.left - containerRect.left,
        top: rect.top - containerRect.top,
        handle,
      }
    }
  }

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e) => {
      if (!resizeStartRef.current) return

      const deltaX = e.clientX - resizeStartRef.current.x
      const deltaY = e.clientY - resizeStartRef.current.y
      const { handle, width, height, left, top } = resizeStartRef.current

      let newWidth = width
      let newHeight = height
      let newLeft = left
      let newTop = top

      // Handle resize based on which handle
      if (handle.includes('right')) {
        newWidth = Math.max(20, width + deltaX)
      }
      if (handle.includes('left')) {
        newWidth = Math.max(20, width - deltaX)
        newLeft = left + deltaX
      }
      if (handle.includes('bottom')) {
        newHeight = Math.max(20, height + deltaY)
      }
      if (handle.includes('top')) {
        newHeight = Math.max(20, height - deltaY)
        newTop = top + deltaY
      }

      // Safe zone margins
      const safeZone = 16
      
      // Update element
      onUpdate({
        position: { x: Math.max(safeZone, newLeft), y: Math.max(safeZone, newTop) },
        styles: {
          ...element.styles,
          width: `${newWidth}px`,
          height: `${newHeight}px`,
        },
      })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      resizeStartRef.current = null
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, element.styles, onUpdate])

  const style = getElementStyle()

  const handleDelete = (e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
      e.stopImmediatePropagation()
    }
    console.log('handleDelete called for element:', element.id)
    if (onDelete) {
      onDelete()
    } else {
      console.error('onDelete is not defined!')
    }
  }

  const handleClick = (e) => {
    // Only select if not dragging
    if (!dragStartedRef.current && !isDragging) {
      e.stopPropagation()
      onSelect()
    }
  }

  const renderElement = () => {
    // Get element's border width to match selection border
    let borderWidthValue = 0
    
    // Try to get border width from borderWidth property
    if (element.styles?.borderWidth) {
      borderWidthValue = parseFloat(element.styles.borderWidth) || 0
    }
    // Try to parse from border property (e.g., "12px solid #000")
    else if (element.styles?.border) {
      const borderParts = element.styles.border.trim().split(/\s+/)
      if (borderParts.length > 0) {
        borderWidthValue = parseFloat(borderParts[0]) || 0
      }
    }
    
    // Use element's border width for selection border, or default to 2px
    const selectionBorderWidth = borderWidthValue > 0 ? borderWidthValue : 2
    
    const baseClasses = `${isSelected ? 'ring-blue-500' : ''} ${
      isDragging ? 'opacity-70' : ''
    }`
    
    const selectionStyle = isSelected ? {
      outline: `${selectionBorderWidth}px solid #3b82f6`,
      outlineOffset: `${selectionBorderWidth}px`,
    } : {}

    if (element.type === 'button') {
      return (
        <button
          ref={combinedRef}
          {...attributes}
          {...listeners}
          style={{
            ...style,
            ...selectionStyle,
          }}
          onClick={handleClick}
          onMouseDown={(e) => {
            // Allow drag to work
            if (listeners?.onMouseDown && !isResizing) {
              listeners.onMouseDown(e)
            }
          }}
          className={`${baseClasses}`}
        >
          {element.content}
        </button>
      )
    }

    if (element.type === 'image') {
      return (
        <img
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          src={element.content || 'https://via.placeholder.com/400x300'}
          alt=""
          style={{
            ...style,
            ...selectionStyle,
          }}
          onClick={handleClick}
          className={`${baseClasses} max-w-full h-auto`}
          draggable={false}
        />
      )
    }

    if (element.type === 'video') {
      return (
        <iframe
          ref={combinedRef}
          {...attributes}
          {...listeners}
          src={element.content || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
          style={{
            ...style,
            ...selectionStyle,
          }}
          onClick={handleClick}
          className={baseClasses}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }

    if (element.type === 'icon') {
      return (
        <div
          ref={combinedRef}
          {...attributes}
          {...listeners}
          style={{
            ...style,
            ...selectionStyle,
          }}
          onClick={handleClick}
          onMouseDown={(e) => {
            if (listeners?.onMouseDown && !isResizing) {
              listeners.onMouseDown(e)
            }
          }}
          className={baseClasses}
        >
          {element.content || '⭐'}
        </div>
      )
    }

    if (element.type === 'divider') {
      return (
        <hr
          ref={combinedRef}
          {...attributes}
          {...listeners}
          style={{
            ...style,
            ...selectionStyle,
            border: 'none',
            borderTop: element.styles?.borderTop || '1px solid #e5e7eb',
          }}
          onClick={handleClick}
          onMouseDown={(e) => {
            if (listeners?.onMouseDown && !isResizing) {
              listeners.onMouseDown(e)
            }
          }}
          className={baseClasses}
        />
      )
    }

    if (element.type === 'container') {
      return (
        <div
          ref={combinedRef}
          {...attributes}
          {...listeners}
          style={{
            ...style,
            ...selectionStyle,
          }}
          onClick={handleClick}
          onMouseDown={(e) => {
            if (listeners?.onMouseDown && !isResizing) {
              listeners.onMouseDown(e)
            }
          }}
          className={baseClasses}
        >
          {element.content || 'Container'}
        </div>
      )
    }

    // Text element
    return (
      <div
        ref={combinedRef}
        {...attributes}
        {...listeners}
        style={{
          ...style,
          ...selectionStyle,
        }}
        onClick={handleClick}
        onMouseDown={(e) => {
          // Allow drag to work
          if (listeners?.onMouseDown && !isResizing) {
            listeners.onMouseDown(e)
          }
        }}
        className={baseClasses}
      >
        {element.content.split('\n').map((line, i) => (
          <div key={i}>{line || '\u00A0'}</div>
        ))}
      </div>
    )
  }

  const position = element.position || { x: 0, y: 0 }
  const safeZone = 16
  const left = Math.max(safeZone, position.x + (transform?.x || 0))
  const top = Math.max(safeZone, position.y + (transform?.y || 0))
  
  // Get element dimensions for resize handles
  const elementWidth = element.styles?.width ? parseInt(element.styles.width) : (elementRef.current?.offsetWidth || 100)
  const elementHeight = element.styles?.height ? parseInt(element.styles.height) : (elementRef.current?.offsetHeight || 50)

  const resizeHandles = [
    { position: 'top-left', cursor: 'nw-resize', left: -4, top: -4 },
    { position: 'top', cursor: 'n-resize', left: '50%', top: -4, transform: 'translateX(-50%)' },
    { position: 'top-right', cursor: 'ne-resize', right: -4, top: -4 },
    { position: 'right', cursor: 'e-resize', right: -4, top: '50%', transform: 'translateY(-50%)' },
    { position: 'bottom-right', cursor: 'se-resize', right: -4, bottom: -4 },
    { position: 'bottom', cursor: 's-resize', left: '50%', bottom: -4, transform: 'translateX(-50%)' },
    { position: 'bottom-left', cursor: 'sw-resize', left: -4, bottom: -4 },
    { position: 'left', cursor: 'w-resize', left: -4, top: '50%', transform: 'translateY(-50%)' },
  ]

  // Calculate handle positions based on element position and dimensions
  const getHandlePosition = (handle) => {
    const elWidth = elementRef.current?.offsetWidth || 100
    const elHeight = elementRef.current?.offsetHeight || 50
    
    if (handle.position === 'top-left') return { left: left - 4, top: top - 4 }
    if (handle.position === 'top') return { left: left + elWidth / 2, top: top - 4, transform: 'translateX(-50%)' }
    if (handle.position === 'top-right') return { left: left + elWidth - 4, top: top - 4 }
    if (handle.position === 'right') return { left: left + elWidth - 4, top: top + elHeight / 2, transform: 'translateY(-50%)' }
    if (handle.position === 'bottom-right') return { left: left + elWidth - 4, top: top + elHeight - 4 }
    if (handle.position === 'bottom') return { left: left + elWidth / 2, top: top + elHeight - 4, transform: 'translateX(-50%)' }
    if (handle.position === 'bottom-left') return { left: left - 4, top: top + elHeight - 4 }
    if (handle.position === 'left') return { left: left - 4, top: top + elHeight / 2, transform: 'translateY(-50%)' }
    return {}
  }

  return (
    <>
      {renderElement()}
      {isSelected && (element.type === 'text' || element.type === 'button' || element.type === 'icon' || element.type === 'container') && (
        <>
          {/* Resize handles - positioned relative to section container */}
          {resizeHandles.map((handle) => {
            const pos = getHandlePosition(handle)
            return (
              <div
                key={handle.position}
                onMouseDown={(e) => handleResizeStart(e, handle.position)}
                style={{
                  position: 'absolute',
                  left: `${pos.left}px`,
                  top: `${pos.top}px`,
                  transform: pos.transform || undefined,
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#3b82f6',
                  border: '2px solid white',
                  borderRadius: '50%',
                  cursor: handle.cursor,
                  zIndex: 10001,
                  pointerEvents: 'auto',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                }}
              />
            )
          })}
        </>
      )}
    </>
  )
}