export default function Preview({ pageData, device }) {
  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile':
        return '375px'
      case 'tablet':
        return '768px'
      default:
        return '100%'
    }
  }

  const getDeviceClass = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
      default:
        return 'w-full'
    }
  }

  const getResponsiveElementStyle = (element) => {
    let elementStyle = {
      ...element.styles,
      display: 'inline-block',
      width: element.styles.width || 'auto',
    }
    
    // Apply responsive scaling for text elements
    if (element.type === 'text' || element.type === 'button') {
      // Ensure fontSize uses clamp if not already
      if (elementStyle.fontSize && !elementStyle.fontSize.includes('clamp')) {
        const fontSize = parseFloat(elementStyle.fontSize) || 16
        if (device === 'mobile') {
          elementStyle.fontSize = `clamp(${Math.max(12, fontSize * 0.7)}px, 4vw, ${fontSize}px)`
        } else if (device === 'tablet') {
          elementStyle.fontSize = `clamp(${Math.max(14, fontSize * 0.85)}px, 2.5vw, ${fontSize}px)`
        } else {
          elementStyle.fontSize = `clamp(${Math.max(16, fontSize * 0.9)}px, 1.5vw, ${fontSize}px)`
        }
      }
      
      // Responsive padding
      if (elementStyle.padding && !elementStyle.padding.includes('clamp')) {
        const padding = elementStyle.padding.split(' ').map(p => {
          const val = parseFloat(p) || 0
          if (device === 'mobile') {
            return `clamp(${Math.max(8, val * 0.6)}px, 2vw, ${val}px)`
          } else if (device === 'tablet') {
            return `clamp(${Math.max(10, val * 0.75)}px, 1.5vw, ${val}px)`
          }
          return p
        }).join(' ')
        elementStyle.padding = padding
      }
      
      // Responsive marginBottom
      if (elementStyle.marginBottom && !elementStyle.marginBottom.includes('clamp')) {
        const mb = parseFloat(elementStyle.marginBottom) || 0
        if (device === 'mobile') {
          elementStyle.marginBottom = `clamp(${Math.max(8, mb * 0.6)}px, 2vw, ${mb}px)`
        } else if (device === 'tablet') {
          elementStyle.marginBottom = `clamp(${Math.max(12, mb * 0.75)}px, 1.5vw, ${mb}px)`
        }
      }
      
      // Responsive maxWidth
      if (elementStyle.maxWidth && elementStyle.maxWidth !== '100%' && !elementStyle.maxWidth.includes('clamp')) {
        const maxW = parseFloat(elementStyle.maxWidth) || 1200
        if (device === 'mobile') {
          elementStyle.maxWidth = `clamp(280px, 90vw, ${Math.min(340, maxW * 0.9)}px)`
        } else if (device === 'tablet') {
          elementStyle.maxWidth = `clamp(500px, 80vw, ${Math.min(600, maxW * 0.85)}px)`
        } else {
          elementStyle.maxWidth = `clamp(800px, 70vw, ${maxW}px)`
        }
      }
      
      // Responsive borderRadius
      if (elementStyle.borderRadius && !elementStyle.borderRadius.includes('clamp')) {
        const br = parseFloat(elementStyle.borderRadius) || 0
        if (device === 'mobile') {
          elementStyle.borderRadius = `clamp(${Math.max(6, br * 0.75)}px, 2vw, ${br}px)`
        } else if (device === 'tablet') {
          elementStyle.borderRadius = `clamp(${Math.max(8, br * 0.85)}px, 1.5vw, ${br}px)`
        }
      }
    }
    
    // Handle gradient backgrounds for elements
    if (element.styles.background && element.styles.background.includes('gradient')) {
      elementStyle.background = element.styles.background
      elementStyle.backgroundColor = undefined
    }
    
    return elementStyle
  }

  const renderElement = (element) => {
    const elementStyle = getResponsiveElementStyle(element)

    if (element.type === 'button') {
      return (
        <button
          key={element.id}
          style={elementStyle}
          className="inline-block cursor-pointer transition-opacity hover:opacity-90"
        >
          {element.content}
        </button>
      )
    }

    if (element.type === 'image') {
      return (
        <img
          key={element.id}
          src={element.content || 'https://via.placeholder.com/400x300'}
          alt=""
          style={elementStyle}
          className="block max-w-full h-auto"
        />
      )
    }

    if (element.type === 'video') {
      return (
        <iframe
          key={element.id}
          src={element.content || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
          style={elementStyle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="block"
        />
      )
    }

    if (element.type === 'icon') {
      return (
        <div
          key={element.id}
          style={elementStyle}
          className="inline-block"
        >
          {element.content || '⭐'}
        </div>
      )
    }

    if (element.type === 'divider') {
      return (
        <hr
          key={element.id}
          style={{
            ...elementStyle,
            border: 'none',
            borderTop: element.styles?.borderTop || '1px solid #e5e7eb',
          }}
          className="block w-full"
        />
      )
    }

    if (element.type === 'container') {
      return (
        <div
          key={element.id}
          style={elementStyle}
          className="inline-block"
        >
          {element.content || 'Container'}
        </div>
      )
    }

    return (
      <div
        key={element.id}
        style={elementStyle}
        className="inline-block"
      >
        {element.content.split('\n').map((line, i) => (
          <div key={i}>{line || '\u00A0'}</div>
        ))}
      </div>
    )
  }

  const renderSection = (section) => {
    const sectionStyle = { ...section.styles }
    
    // Handle responsive section heights based on device
    if (section.id === 'hero') {
      if (device === 'mobile') {
        sectionStyle.height = '90vh'
        sectionStyle.minHeight = '90vh'
      } else if (device === 'tablet') {
        sectionStyle.height = '85vh'
        sectionStyle.minHeight = '85vh'
      } else {
        // Desktop: calc(100vh - 4em)
        sectionStyle.height = 'calc(100vh - 4em)'
        sectionStyle.minHeight = 'calc(100vh - 4em)'
      }
    } else if (section.id === 'steps') {
      if (device === 'mobile') {
        sectionStyle.height = 'auto'
        sectionStyle.minHeight = '400px'
        sectionStyle.padding = '40px 0'
      } else if (device === 'tablet') {
        sectionStyle.height = 'auto'
        sectionStyle.minHeight = '450px'
        sectionStyle.padding = '60px 0'
      } else {
        sectionStyle.height = '500px'
        sectionStyle.minHeight = '500px'
        sectionStyle.padding = '80px 0'
      }
    } else if (section.id === 'payment') {
      if (device === 'mobile') {
        sectionStyle.padding = '40px 0'
      } else if (device === 'tablet') {
        sectionStyle.padding = '60px 0'
      } else {
        sectionStyle.padding = '80px 0'
      }
    } else if (section.id === 'footer') {
      if (device === 'mobile') {
        sectionStyle.padding = '40px 0 20px'
      } else if (device === 'tablet') {
        sectionStyle.padding = '50px 0 25px'
      } else {
        sectionStyle.padding = '60px 0 30px'
      }
    }
    
    if (section.styles.backgroundImage) {
      sectionStyle.backgroundImage = `url(${section.styles.backgroundImage})`
      sectionStyle.backgroundSize = 'cover'
      sectionStyle.backgroundPosition = 'center'
    }
    
    // Handle gradient backgrounds
    if (section.styles.background && section.styles.background.includes('gradient')) {
      sectionStyle.background = section.styles.background
    }

    const getAlignment = () => {
      const textAlign = section.styles?.textAlign || 'left'
      if (textAlign === 'center') return 'justify-center'
      if (textAlign === 'right') return 'justify-end'
      return 'justify-start'
    }

    // Responsive container padding using clamp()
    const containerPaddingLeft = device === 'mobile' ? 'clamp(12px, 3vw, 16px)' : device === 'tablet' ? 'clamp(16px, 2.5vw, 20px)' : 'clamp(20px, 2vw, 24px)'
    const containerPaddingRight = device === 'mobile' ? 'clamp(12px, 3vw, 16px)' : device === 'tablet' ? 'clamp(16px, 2.5vw, 20px)' : 'clamp(20px, 2vw, 24px)'
    const containerPaddingTop = device === 'mobile' ? 'clamp(20px, 3vw, 30px)' : device === 'tablet' ? 'clamp(30px, 2.5vw, 40px)' : 'clamp(40px, 2vw, 50px)'
    const containerPaddingBottom = device === 'mobile' ? 'clamp(20px, 3vw, 30px)' : device === 'tablet' ? 'clamp(30px, 2.5vw, 40px)' : 'clamp(40px, 2vw, 50px)'
    
    return (
      <div key={section.id} style={sectionStyle}>
        <div 
          className="container mx-auto"
          style={{
            paddingLeft: containerPaddingLeft,
            paddingRight: containerPaddingRight,
            paddingTop: containerPaddingTop,
            paddingBottom: containerPaddingBottom,
            maxWidth: device === 'mobile' ? '100%' : device === 'tablet' ? 'clamp(600px, 90vw, 800px)' : 'clamp(1200px, 85vw, 1400px)',
          }}
        >
          <div 
            className={`flex flex-wrap gap-4 ${getAlignment()} items-center`}
            style={{
              gap: device === 'mobile' ? 'clamp(12px, 2vw, 16px)' : device === 'tablet' ? 'clamp(16px, 1.5vw, 20px)' : 'clamp(20px, 1.5vw, 24px)',
            }}
          >
            {section.children?.map(renderElement)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-100 ">
      <div
        className={`bg-white shadow-2xl ${getDeviceClass()}`}
        style={{ width: getDeviceWidth(), minHeight: '100vh' }}
      >
        {pageData.sections.map(renderSection)}
      </div>
    </div>
  )
}

