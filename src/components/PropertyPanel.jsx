import { useState } from 'react'
import { Type, Palette, Image as ImageIcon, Square, AlignLeft, AlignCenter, AlignRight, X } from 'lucide-react'

export default function PropertyPanel({
  selectedElement,
  pageData,
  updateElement,
  updateSection,
  addElement,
  deleteElement,
  copyElement,
  pasteElement,
  canPaste,
  onClose,
}) {
  const element = findElement(pageData, selectedElement)
  const [activeTab, setActiveTab] = useState('content')
  const isSection = pageData.sections.some(s => s.id === selectedElement)

  if (!element) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg font-medium">No element selected</p>
          <p className="text-sm mt-2">Click on any element to edit its properties</p>
        </div>
      </div>
    )
  }

  const handleStyleChange = (key, value) => {
    updateElement(element.id, {
      styles: {
        ...element.styles,
        [key]: value,
      },
    })
  }

  const handleContentChange = (value) => {
    updateElement(element.id, { content: value })
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title="Close Properties"
        >
          <X size={18} />
        </button>
      )}
      <div className="border-b border-gray-200 flex">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'content'
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'style'
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Style
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'content' && (
            <div className="space-y-6">
              {isSection ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Type
                    </label>
                    <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      {element.type}
                    </div>
                  </div>
                </div>
              ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                {element.type === 'text' || element.type === 'button' || element.type === 'icon' ? (
                  <textarea
                    value={element.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={element.type === 'button' || element.type === 'icon' ? 1 : 4}
                    placeholder={element.type === 'icon' ? 'Enter emoji or icon' : 'Enter content'}
                  />
                ) : element.type === 'image' ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={element.content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Image URL"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            handleContentChange(event.target.result)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                ) : element.type === 'video' ? (
                  <input
                    type="text"
                    value={element.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)"
                  />
                ) : element.type === 'divider' ? (
                  <div className="text-sm text-gray-500 italic">
                    Divider line - no content needed
                  </div>
                ) : element.type === 'container' ? (
                  <textarea
                    value={element.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    placeholder="Container content (optional)"
                  />
                ) : (
                  <textarea
                    value={element.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-6">
            {isSection ? (
              <>
                {/* Section Background */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Palette size={16} />
                    Background
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Background Gradient</label>
                      <input
                        type="text"
                        value={element.styles?.background || element.styles?.backgroundColor || ''}
                        onChange={(e) => updateSection(element.id, {
                          styles: {
                            ...element.styles,
                            background: e.target.value,
                            backgroundColor: e.target.value.includes('gradient') ? undefined : e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      />
                      <p className="text-xs text-gray-500 mt-1">Use CSS gradient syntax or hex color</p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Background Image URL</label>
                      <input
                        type="text"
                        value={element.styles?.backgroundImage || ''}
                        onChange={(e) => updateSection(element.id, {
                          styles: {
                            ...element.styles,
                            backgroundImage: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Solid Background Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={element.styles?.backgroundColor || '#ffffff'}
                          onChange={(e) => updateSection(element.id, {
                            styles: {
                              ...element.styles,
                              backgroundColor: e.target.value,
                              background: undefined
                            }
                          })}
                          className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={element.styles?.backgroundColor || '#ffffff'}
                          onChange={(e) => updateSection(element.id, {
                            styles: {
                              ...element.styles,
                              backgroundColor: e.target.value,
                              background: undefined
                            }
                          })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Spacing */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Square size={16} />
                    Spacing
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Padding</label>
                      <input
                        type="text"
                        value={element.styles?.padding || '0'}
                        onChange={(e) => updateSection(element.id, {
                          styles: {
                            ...element.styles,
                            padding: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="80px 0"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Typography */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Type size={16} />
                    Typography
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Font Size</label>
                      <input
                        type="text"
                        value={element.styles?.fontSize || '16px'}
                        onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="16px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Font Weight</label>
                      <select
                        value={element.styles?.fontWeight || '400'}
                        onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="300">Light</option>
                        <option value="400">Regular</option>
                        <option value="500">Medium</option>
                        <option value="600">Semi Bold</option>
                        <option value="700">Bold</option>
                        <option value="800">Extra Bold</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Text Align</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStyleChange('textAlign', 'left')}
                          className={`flex-1 p-2 border rounded-lg ${
                            element.styles?.textAlign === 'left'
                              ? 'bg-blue-50 border-blue-500 text-blue-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <AlignLeft size={16} className="mx-auto" />
                        </button>
                        <button
                          onClick={() => handleStyleChange('textAlign', 'center')}
                          className={`flex-1 p-2 border rounded-lg ${
                            element.styles?.textAlign === 'center'
                              ? 'bg-blue-50 border-blue-500 text-blue-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <AlignCenter size={16} className="mx-auto" />
                        </button>
                        <button
                          onClick={() => handleStyleChange('textAlign', 'right')}
                          className={`flex-1 p-2 border rounded-lg ${
                            element.styles?.textAlign === 'right'
                              ? 'bg-blue-50 border-blue-500 text-blue-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <AlignRight size={16} className="mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                {(element.type === 'text' || element.type === 'button') && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Palette size={16} />
                      Colors
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Text Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={element.styles?.color || '#000000'}
                            onChange={(e) => handleStyleChange('color', e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                          />
                          <input
                            type="text"
                            value={element.styles?.color || '#000000'}
                            onChange={(e) => handleStyleChange('color', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Background Gradient</label>
                        <input
                          type="text"
                          value={element.styles?.background || element.styles?.backgroundColor || (element.type === 'button' ? '#3b82f6' : 'transparent')}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value.includes('gradient')) {
                              handleStyleChange('background', value)
                              handleStyleChange('backgroundColor', undefined)
                            } else {
                              handleStyleChange('backgroundColor', value)
                              handleStyleChange('background', undefined)
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                          placeholder={element.type === 'button' ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent or gradient'}
                        />
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={element.styles?.backgroundColor || (element.type === 'button' ? '#3b82f6' : '#ffffff')}
                            onChange={(e) => {
                              handleStyleChange('backgroundColor', e.target.value)
                              handleStyleChange('background', undefined)
                            }}
                            className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                          />
                          <input
                            type="text"
                            value={element.styles?.backgroundColor || (element.type === 'button' ? '#3b82f6' : 'transparent')}
                            onChange={(e) => {
                              handleStyleChange('backgroundColor', e.target.value)
                              handleStyleChange('background', undefined)
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={element.type === 'button' ? '#3b82f6' : 'transparent'}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Use gradient syntax or solid color</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spacing */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Square size={16} />
                    Spacing
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Padding</label>
                      <input
                        type="text"
                        value={element.styles?.padding || '0'}
                        onChange={(e) => handleStyleChange('padding', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="12px 24px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Margin</label>
                      <input
                        type="text"
                        value={element.styles?.margin || '0'}
                        onChange={(e) => handleStyleChange('margin', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0 auto"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Border Radius</label>
                      <input
                        type="text"
                        value={element.styles?.borderRadius || '0'}
                        onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="8px"
                      />
                    </div>
                  </div>
                </div>

                {/* Borders */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Square size={16} />
                    Borders
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Border Width</label>
                      <input
                        type="text"
                        value={element.styles?.borderWidth || ''}
                        onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1px"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Border Style</label>
                      <select
                        value={element.styles?.borderStyle || 'solid'}
                        onChange={(e) => handleStyleChange('borderStyle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="none">None</option>
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                        <option value="double">Double</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Border Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={element.styles?.borderColor || '#000000'}
                          onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={element.styles?.borderColor || '#000000'}
                          onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shadows & Effects */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Square size={16} />
                    Shadows & Effects
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Box Shadow</label>
                      <input
                        type="text"
                        value={element.styles?.boxShadow || ''}
                        onChange={(e) => handleStyleChange('boxShadow', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0 4px 6px rgba(0,0,0,0.1)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Opacity</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={element.styles?.opacity || 1}
                        onChange={(e) => handleStyleChange('opacity', e.target.value)}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {element.styles?.opacity || 1}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Transform</label>
                      <input
                        type="text"
                        value={element.styles?.transform || ''}
                        onChange={(e) => handleStyleChange('transform', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="rotate(5deg) scale(1.1)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Transition</label>
                      <input
                        type="text"
                        value={element.styles?.transition || ''}
                        onChange={(e) => handleStyleChange('transition', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="all 0.3s ease"
                      />
                    </div>
                  </div>
                </div>

              </>
            )}
          </div>
        )}

        {/* Actions - Always visible for non-section elements */}
        {!isSection && (
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={copyElement}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Copy
              </button>
              <button
                onClick={() => {
                  // Find parent section
                  for (const section of pageData.sections) {
                    if (section.children?.some(el => el.id === element.id)) {
                      pasteElement(section.id)
                      break
                    }
                  }
                }}
                disabled={!canPaste}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  canPaste
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Paste
              </button>
            </div>
            <button
              onClick={() => deleteElement(element.id)}
              className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              Delete Element
            </button>
          </div>
        )}

        {/* Add Elements - Available in both tabs for sections */}
        {isSection && (
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <p className="text-sm font-medium text-gray-700 mb-2">Add Elements</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addElement(element.id, 'text')}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Text
              </button>
              <button
                onClick={() => addElement(element.id, 'button')}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Button
              </button>
              <button
                onClick={() => addElement(element.id, 'image')}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Image
              </button>
              <button
                onClick={() => addElement(element.id, 'video')}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Video
              </button>
              <button
                onClick={() => addElement(element.id, 'icon')}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Icon
              </button>
              <button
                onClick={() => addElement(element.id, 'divider')}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Divider
              </button>
              <button
                onClick={() => addElement(element.id, 'container')}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium col-span-2"
              >
                Container
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function findElement(pageData, elementId) {
  if (!elementId) return null
  
  for (const section of pageData.sections) {
    if (section.id === elementId) return section
    if (section.children) {
      const found = section.children.find(el => el.id === elementId)
      if (found) return found
    }
  }
  return null
}

