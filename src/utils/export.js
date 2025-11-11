export function exportToHTML(pageData) {
  const escapeHtml = (text) => {
    if (!text) return ''
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }
    return String(text).replace(/[&<>"']/g, m => map[m])
  }

  const generateElementHTML = (element) => {
    const styles = { ...element.styles }
    
    // Handle gradient backgrounds
    let styleString = ''
    if (styles.background && styles.background.includes('gradient')) {
      // Build style string with gradient
      const otherStyles = Object.entries(styles)
        .filter(([key, value]) => key !== 'background' && key !== 'backgroundColor' && value !== undefined && value !== null && value !== '')
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
          return `${cssKey}: ${value}`
        })
        .join('; ')
      styleString = `background: ${styles.background}; ${otherStyles}`
    } else {
      styleString = Object.entries(styles)
        .filter(([key, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
          return `${cssKey}: ${value}`
        })
        .join('; ')
    }

    if (element.type === 'button') {
      return `<button style="${escapeHtml(styleString)}">${escapeHtml(element.content)}</button>`
    }

    if (element.type === 'image') {
      return `<img src="${escapeHtml(element.content || 'https://via.placeholder.com/400x300')}" alt="" style="${escapeHtml(styleString)}" />`
    }

    if (element.type === 'video') {
      return `<iframe src="${escapeHtml(element.content || 'https://www.youtube.com/embed/dQw4w9WgXcQ')}" style="${escapeHtml(styleString)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }

    if (element.type === 'icon') {
      return `<div style="${escapeHtml(styleString)}">${escapeHtml(element.content || '⭐')}</div>`
    }

    if (element.type === 'divider') {
      const dividerStyle = { ...styles }
      dividerStyle.border = 'none'
      dividerStyle.borderTop = styles.borderTop || '1px solid #e5e7eb'
      const dividerStyleString = Object.entries(dividerStyle)
        .filter(([key, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
          return `${cssKey}: ${value}`
        })
        .join('; ')
      return `<hr style="${escapeHtml(dividerStyleString)}" />`
    }

    if (element.type === 'container') {
      const content = element.content ? escapeHtml(element.content) : ''
      return `<div style="${escapeHtml(styleString)}">${content}</div>`
    }

    const content = element.content.split('\n').map(line => escapeHtml(line)).join('<br>')
    return `<div style="${escapeHtml(styleString)}">${content}</div>`
  }

  const generateSectionHTML = (section) => {
    const sectionStyles = { ...section.styles }
    let sectionStyleString = Object.entries(sectionStyles)
      .filter(([key, value]) => key !== 'backgroundImage' && key !== 'background' && value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        return `${cssKey}: ${value}`
      })
      .join('; ')

    // Handle gradient backgrounds
    if (section.styles.background && section.styles.background.includes('gradient')) {
      sectionStyleString += `; background: ${escapeHtml(section.styles.background)};`
    }

    if (section.styles.backgroundImage) {
      sectionStyleString += `; background-image: url(${escapeHtml(section.styles.backgroundImage)}); background-size: cover; background-position: center;`
    }

    const textAlign = section.styles?.textAlign || 'left'
    const alignment = textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start'

    const elementsHTML = section.children
      ?.map(generateElementHTML)
      .join('\n        ') || ''

    return `
    <section style="${escapeHtml(sectionStyleString)}">
      <div style="max-width: 1400px; margin: 0 auto; padding: clamp(20px, 3vw, 40px) clamp(12px, 2vw, 20px); display: flex; flex-wrap: wrap; gap: clamp(16px, 2vw, 24px); justify-content: ${alignment}; align-items: center;">
        ${elementsHTML}
      </div>
    </section>`
  }

  const sectionsHTML = pageData.sections.map(generateSectionHTML).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.6;
    }
    
    section {
      width: 100%;
    }
    
    button {
      cursor: pointer;
      transition: opacity 0.2s;
    }
    
    button:hover {
      opacity: 0.9;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
    
    @media (max-width: 768px) {
      section {
        padding: 40px 0 !important;
      }
      
      /* Mobile responsive adjustments */
      h1, h2, h3, .text-large {
        font-size: clamp(20px, 4vw, 32px) !important;
      }
      
      button {
        padding: 12px 24px !important;
        font-size: 14px !important;
      }
      
      .container {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      /* Tablet responsive adjustments */
      .container {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }
    }
    
    @media (min-width: 1025px) {
      /* Desktop */
      .container {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
    }
  </style>
</head>
<body>
${sectionsHTML}
</body>
</html>`
}


