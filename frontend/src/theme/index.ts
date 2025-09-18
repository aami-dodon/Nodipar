export const theme = {
  colors: {
    background: 'var(--color-background)',
    surface: 'var(--color-surface)',
    surfaceAlt: 'var(--color-surface-alt)',
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    danger: 'var(--color-danger)',
    text: 'var(--color-text)',
    muted: 'var(--color-muted)',
  },
  radii: {
    lg: 'var(--radius-lg)',
    md: 'var(--radius-md)',
    sm: 'var(--radius-sm)',
  },
  shadows: {
    soft: 'var(--shadow-soft)',
  },
  spacing: {
    2: 'var(--spacing-2)',
    3: 'var(--spacing-3)',
    4: 'var(--spacing-4)',
    5: 'var(--spacing-5)',
    6: 'var(--spacing-6)',
    8: 'var(--spacing-8)',
    10: 'var(--spacing-10)',
  },
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
  },
} as const;

export type Theme = typeof theme;
