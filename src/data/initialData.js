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
          content: '🎰 NetBet Casino',
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
          content: 'Sign Up & Play',
          styles: {
            fontSize: '15px',
            fontWeight: '600',
            color: '#ffffff',
            backgroundColor: '#f59e0b',
            padding: '12px 28px',
            borderRadius: '10px',
            textAlign: 'center',
            border: 'none',
            cursor: 'pointer',
            margin: '0',
            letterSpacing: '0.3px',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
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
          content: 'Welcome Bonus\nUp to $500 + 200 Free Spins',
          styles: {
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: '900',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '28px',
            lineHeight: '1.1',
            letterSpacing: '-1.5px',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
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
          content: 'Join thousands of players enjoying the best online casino experience. Play slots, table games, and live dealers with instant withdrawals.',
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
          content: 'Claim Bonus Now',
          styles: {
            fontSize: '17px',
            fontWeight: '600',
            color: '#ffffff',
            backgroundColor: '#f59e0b',
            padding: '20px 44px',
            borderRadius: '14px',
            textAlign: 'center',
            border: 'none',
            cursor: 'pointer',
            marginRight: '16px',
            letterSpacing: '0.3px',
            boxShadow: '0 8px 20px rgba(245, 158, 11, 0.5)',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'hero-cta-secondary',
          type: 'button',
          content: 'View Games',
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
        backgroundColor: '#0f172a',
        padding: '80px 0',
        height: '500px',
        minHeight: '500px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      },
      children: [
        {
          id: 'steps-title',
          type: 'text',
          content: 'Why Choose NetBet Casino?',
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
          content: 'Experience the ultimate online gaming platform with premium features and exclusive bonuses',
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
          content: '🎰\n\n1000+ Games\n\nSlots, table games, live dealers, and more',
          styles: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#ffffff',
            textAlign: 'center',
            padding: '52px 36px',
            backgroundColor: '#1e293b',
            borderRadius: '24px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
            border: '2px solid rgba(245, 158, 11, 0.3)',
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
          content: '⚡\n\nInstant Withdrawals\n\nFast and secure payment processing',
          styles: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#ffffff',
            textAlign: 'center',
            padding: '52px 36px',
            backgroundColor: '#1e293b',
            borderRadius: '24px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
            border: '2px solid rgba(245, 158, 11, 0.3)',
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
          content: '🎁\n\nDaily Bonuses\n\nExclusive rewards and promotions',
          styles: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#ffffff',
            textAlign: 'center',
            padding: '52px 36px',
            backgroundColor: '#1e293b',
            borderRadius: '24px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
            border: '2px solid rgba(245, 158, 11, 0.3)',
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
        backgroundColor: '#101b3d',
        background: 'linear-gradient(180deg, #101b3d 0%, #0f172a 100%)',
        padding: '80px 0',
        textAlign: 'center',
      },
      children: [
        {
          id: 'payment-title',
          type: 'text',
          content: 'Secure Payment Methods',
          styles: {
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: '800',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '16px',
            letterSpacing: '-0.5px',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 24px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          },
          position: { x: 0, y: 0 }
        },
        {
          id: 'payment-subtitle',
          type: 'text',
          content: 'Deposit and withdraw safely with trusted payment providers',
          styles: {
            fontSize: '17px',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.8)',
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
            color: '#ffffff',
            textAlign: 'center',
            padding: '48px 70px',
            backgroundColor: '#1e293b',
            borderRadius: '28px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
            border: '2px solid rgba(245, 158, 11, 0.3)',
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
        backgroundColor: '#0a0f1c',
        background: 'linear-gradient(180deg, #0a0f1c 0%, #000000 100%)',
        padding: '60px 0 30px',
        color: '#ffffff',
        textAlign: 'center',
        borderTop: '2px solid rgba(245, 158, 11, 0.2)',
      },
      children: [
        {
          id: 'footer-brand',
          type: 'text',
          content: '🎰 NetBet Casino',
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
          content: 'Play responsibly. 18+ only. Gambling can be addictive.',
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
          content: 'Games  •  Promotions  •  VIP Club  •  Support  •  Responsible Gaming',
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
          content: '© 2024 NetBet Casino. All rights reserved. Licensed and regulated.',
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

