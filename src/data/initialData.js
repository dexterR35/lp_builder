export const initialPageData = {
  globalStyles: {
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
  },
  sections: [
    {
      id: 'header',
      type: 'header',
      styles: {
        backgroundColor: '#141C33',
        padding: '0',
        height: '4em',
        minHeight: '4em',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
      },
      children: [
        {
          id: 'header-logo',
          type: 'text',
          content: '✨ netbet',
          styles: {
            fontSize: '28px',
            fontWeight: '800',
            color: '#ffffff',
            textAlign: 'left',
            letterSpacing: '-0.5px',
            margin: '0',
            padding: '0',
            width: 'auto',
            position: 'relative',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
          },
          position: { x: 24, y: 0 }
        },
        {
          id: 'header-cta',
          type: 'button',
          content: 'Get Started',
          styles: {
            fontSize: '15px',
            fontWeight: '600',
            color: '#ffffff',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            padding: '12px 28px',
            borderRadius: '10px',
            textAlign: 'center',
            border: 'none',
            cursor: 'pointer',
            margin: '0',
            letterSpacing: '0.3px',
          },
          position: { x: 0, y: 0 }
        }
      ]
    },
    {
      id: 'hero',
      type: 'hero',
      styles: {
        backgroundColor: '#101b3d',
        padding: '20px 0',
        backgroundImage: '',
        height: 'calc(100vh - 4em)',
        minHeight: 'calc(100vh - 4em)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        {
          id: 'hero-title',
          type: 'text',
          content: 'Build Stunning Landing Pages\nIn Minutes, Not Hours',
          styles: {
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: '900',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '28px',
            lineHeight: '1.1',
            letterSpacing: '-1.5px',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 24px',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'hero-subtitle',
          type: 'text',
          content: 'Create beautiful, fully customizable landing pages with our intuitive drag-and-drop builder. No coding required.',
          styles: {
            fontSize: '20px',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.95)',
            textAlign: 'center',
            marginBottom: '48px',
            lineHeight: '1.6',
            maxWidth: '650px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 24px',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'hero-cta-primary',
          type: 'button',
          content: 'Start Building Free',
          styles: {
            fontSize: '17px',
            fontWeight: '600',
            color: '#ffffff',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            padding: '20px 44px',
            borderRadius: '14px',
            textAlign: 'center',
            border: 'none',
            cursor: 'pointer',
            marginRight: '16px',
            letterSpacing: '0.3px',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'hero-cta-secondary',
          type: 'button',
          content: 'Watch Demo',
          styles: {
            fontSize: '17px',
            fontWeight: '600',
            color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            padding: '18px 40px',
            borderRadius: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            letterSpacing: '0.3px',
          },
          position: { x: 0, y: 0 }
        }
      ]
    },
    {
      id: 'steps',
      type: 'steps',
      styles: {
        backgroundColor: '#141C33',
        padding: '20px 0',
        height: '500px',
        minHeight: '500px',
        textAlign: 'center',
      },
      children: [
        {
          id: 'steps-title',
          type: 'text',
          content: 'How It Works',
          styles: {
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: '800',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '20px',
            letterSpacing: '-1px',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 24px',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'steps-subtitle',
          type: 'text',
          content: 'Three simple steps to create your perfect landing page',
          styles: {
            fontSize: '19px',
            fontWeight: '400',
            color: '#e2e8f0',
            textAlign: 'center',
            marginBottom: '70px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 24px',
            lineHeight: '1.6',
       
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'step-1',
          type: 'text',
          content: '🎨\n\nDesign\n\nDrag and drop elements to build your page visually',
          styles: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            textAlign: 'center',
            padding: '52px 36px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '24px',
            boxShadow: '0 10px 25px -5px rgba(102, 126, 234, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
            maxWidth: '340px',
            margin: '0 auto',
            lineHeight: '1.7',
            transition: 'all 0.3s',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'step-2',
          type: 'text',
          content: '✨\n\nCustomize\n\nEdit colors, fonts, and styles to match your brand perfectly',
          styles: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            textAlign: 'center',
            padding: '52px 36px',
            background: 'linear-gradient(135deg, #ffffff 0%, #fef3f2 100%)',
            borderRadius: '24px',
            boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.1)',
            maxWidth: '340px',
            margin: '0 auto',
            lineHeight: '1.7',
            transition: 'all 0.3s',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'step-3',
          type: 'text',
          content: '🚀\n\nExport\n\nDownload clean, production-ready HTML and CSS code',
          styles: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            textAlign: 'center',
            padding: '52px 36px',
            background: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
            borderRadius: '24px',
            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.1)',
            maxWidth: '340px',
            margin: '0 auto',
            lineHeight: '1.7',
            transition: 'all 0.3s',
          },
          position: { x: 0, y: 0 }
        }
      ]
    },
    {
      id: 'payment',
      type: 'payment',
      styles: {
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdfa 100%)',
        padding: '20px 0',
        textAlign: 'center',
      },
      children: [
        {
          id: 'payment-title',
          type: 'text',
          content: 'Accepted Payment Methods',
          styles: {
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: '800',
            color: '#111827',
            textAlign: 'center',
            marginBottom: '16px',
            letterSpacing: '-0.5px',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 24px',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'payment-subtitle',
          type: 'text',
          content: 'Secure payments with all major providers',
          styles: {
            fontSize: '17px',
            fontWeight: '400',
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: '50px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 24px',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'payment-icons',
          type: 'text',
          content: '💳  💰  🏦  📱  💵  🎯  ⚡  🔒',
          styles: {
            fontSize: '56px',
            fontWeight: '400',
            color: '#111827',
            textAlign: 'center',
            padding: '48px 70px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '28px',
            boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            maxWidth: '850px',
            margin: '0 auto',
            letterSpacing: '10px',
          },
          position: { x: 0, y: 0 }
        }
      ]
    },
    {
      id: 'footer',
      type: 'footer',
      styles: {
        backgroundColor: '#010718',
        padding: '20px 0',
        color: '#ffffff',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      },
      children: [
        {
          id: 'footer-brand',
          type: 'text',
          content: '✨ Brand',
          styles: {
            fontSize: '26px',
            fontWeight: '800',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '24px',
            letterSpacing: '-0.5px',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 24px',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'footer-tagline',
          type: 'text',
          content: 'Building beautiful landing pages, one drag at a time.',
          styles: {
            fontSize: '16px',
            fontWeight: '400',
            color: '#94a3b8',
            textAlign: 'center',
            marginBottom: '32px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 24px',
            lineHeight: '1.6',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'footer-links',
          type: 'text',
          content: 'About  •  Features  •  Pricing  •  Contact  •  Blog',
          styles: {
            fontSize: '15px',
            fontWeight: '500',
            color: '#cbd5e1',
            textAlign: 'center',
            marginBottom: '40px',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 24px',
            letterSpacing: '0.5px',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'footer-copyright',
          type: 'text',
          content: '© 2024 Brand. All rights reserved.',
          styles: {
            fontSize: '14px',
            fontWeight: '400',
            color: '#64748b',
            textAlign: 'center',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '24px',
            paddingRight: '24px',
          },
          position: { x: 0, y: 0 }
        }
      ]
    }
  ]
}

