# Landing Page Builder

A modern, fully customizable drag-and-drop landing page builder built with React, Vite, Tailwind CSS, and dnd-kit. Create stunning landing pages with a Figma-like editing experience.

## Features

### 🎨 Full Customization
- **Edit Text Content**: Change any text directly in the property panel
- **Typography Controls**: Adjust font size, weight, and alignment
- **Color Customization**: Edit text colors, background colors, and button styles
- **Spacing Controls**: Fine-tune padding, margin, and border radius
- **Background Images**: Add background images to any section via URL or file upload

### 🖱️ Drag & Drop
- Drag and reposition all elements freely
- Visual feedback during dragging
- Intuitive element selection

### 📱 Responsive Preview
- Desktop preview mode
- Tablet preview mode (768px)
- Mobile preview mode (375px)
- Real-time responsive preview

### 💾 Export & Save
- Export clean, production-ready HTML/CSS
- Save project as JSON for later editing
- All styles are inline for easy deployment

### 🎯 Pre-built Sections
- **Header**: Navigation and branding
- **Hero Section**: Eye-catching hero with CTAs
- **Steps Section**: Feature showcase
- **Payment Methods**: Payment options display
- **Footer**: Site footer with links

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
# Build for production
npm run build
```

## Usage

### Editing Elements

1. **Select an Element**: Click on any text, button, or image to select it
2. **Edit Properties**: Use the property panel on the right to modify:
   - Content (text, button text, image URL)
   - Typography (font size, weight, alignment)
   - Colors (text color, background color)
   - Spacing (padding, margin, border radius)

### Editing Sections

1. **Select a Section**: Click on the section background or use the section selector
2. **Edit Section Properties**:
   - Background color
   - Background image (URL or file upload)
   - Padding

### Adding Elements

1. **Select a Section**: Click on any section
2. **Add Elements**: Use the "Add Elements" buttons in the property panel:
   - Add Text
   - Add Button
   - Add Image

### Drag & Drop

- Click and drag any element to reposition it
- Visual feedback shows where elements can be dropped

### Preview Mode

1. Click the **Eye icon** in the toolbar to enter preview mode
2. Switch between Desktop, Tablet, and Mobile views
3. Click the **Eye Off icon** to exit preview mode

### Exporting

1. Click the **Download icon** in the toolbar to export HTML
2. The exported file includes all styles and is ready for deployment

### Saving Projects

1. Click the **Save icon** in the toolbar
2. Your project will be saved as JSON
3. You can load it later (feature to be added)

## Project Structure

```
src/
├── components/
│   ├── Editor.jsx          # Main editor canvas
│   ├── Section.jsx          # Section component
│   ├── Element.jsx          # Draggable element component
│   ├── PropertyPanel.jsx    # Property editing panel
│   ├── Preview.jsx          # Preview mode component
│   └── Toolbar.jsx          # Top toolbar
├── data/
│   └── initialData.js       # Initial page structure
├── utils/
│   └── export.js            # HTML export utility
├── App.jsx                   # Main app component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## Technologies

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **@dnd-kit**: Modern drag-and-drop library
- **lucide-react**: Icon library

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

