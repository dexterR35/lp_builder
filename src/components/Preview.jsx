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

  const renderElement = (element) => {
    const elementStyle = {
      ...element.styles,
      display: 'inline-block',
      width: element.styles.width || 'auto',
    }
    
    // Handle gradient backgrounds for elements
    if (element.styles.background && element.styles.background.includes('gradient')) {
      elementStyle.background = element.styles.background
      elementStyle.backgroundColor = undefined
    }

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
    
    // Handle responsive hero height
    if (section.id === 'hero') {
      if (device === 'mobile' || device === 'tablet') {
        sectionStyle.height = '100%'
        sectionStyle.minHeight = '100%'
      } else {
        // Desktop: keep calc(100vh - 4em)
        sectionStyle.height = sectionStyle.height || 'calc(100vh - 4em)'
        sectionStyle.minHeight = sectionStyle.minHeight || 'calc(100vh - 4em)'
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

    return (
      <div key={section.id} style={sectionStyle}>
        <div className="container mx-auto px-4 py-8">
          <div className={`flex flex-wrap gap-4 ${getAlignment()} items-center`}>
            {section.children?.map(renderElement)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-100 p-8">
      <div
        className={`bg-white shadow-2xl ${getDeviceClass()}`}
        style={{ width: getDeviceWidth(), minHeight: '100vh' }}
      >
        {pageData.sections.map(renderSection)}
      </div>
    </div>
  )
}

