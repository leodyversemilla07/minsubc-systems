/**
 * ============================================================================
 * MINSU BC DESIGN SYSTEM - Design Tokens
 * Mindoro State University - Bongabong Campus
 * ============================================================================
 *
 * This file contains the design tokens for the MinSU BC portal. These tokens
 * ensure consistency across all components and pages.
 *
 * Usage:
 * import { colors, spacing, typography } from '@/lib/design-tokens';
 */

/**
 * Brand Colors
 * These are the official MinSU BC brand colors used throughout the portal.
 */
export const brandColors = {
    /** MinSU Institutional Green - Primary brand color */
    green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
        950: '#052e16',
    },
    /** Gold/Amber - Accent color for highlights */
    gold: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
        950: '#451a03',
    },
} as const;

/**
 * Semantic Colors
 * These map to CSS custom properties and should be used via Tailwind classes.
 */
export const semanticColors = {
    primary: 'var(--primary)',
    primaryForeground: 'var(--primary-foreground)',
    secondary: 'var(--secondary)',
    secondaryForeground: 'var(--secondary-foreground)',
    accent: 'var(--accent)',
    accentForeground: 'var(--accent-foreground)',
    muted: 'var(--muted)',
    mutedForeground: 'var(--muted-foreground)',
    destructive: 'var(--destructive)',
    destructiveForeground: 'var(--destructive-foreground)',
    success: 'var(--success)',
    successForeground: 'var(--success-foreground)',
    warning: 'var(--warning)',
    warningForeground: 'var(--warning-foreground)',
    info: 'var(--info)',
    infoForeground: 'var(--info-foreground)',
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    card: 'var(--card)',
    cardForeground: 'var(--card-foreground)',
    border: 'var(--border)',
    input: 'var(--input)',
    ring: 'var(--ring)',
} as const;

/**
 * Spacing Scale
 * Based on a 4px grid system (0.25rem increments)
 */
export const spacing = {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
} as const;

/**
 * Typography Scale
 * Font sizes following a modular scale (1.25 ratio)
 */
export const typography = {
    fontFamily: {
        sans: "Inter, 'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
        display:
            "Inter, 'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
        mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
    fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
    },
    letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    },
} as const;

/**
 * Border Radius Scale
 */
export const borderRadius = {
    none: '0',
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    DEFAULT: 'var(--radius)',
    lg: 'var(--radius)',
    xl: 'calc(var(--radius) + 4px)',
    '2xl': 'calc(var(--radius) + 8px)',
    '3xl': '1.5rem',
    full: '9999px',
} as const;

/**
 * Shadow Scale
 */
export const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
    primary: '0 4px 14px 0 oklch(0.45 0.15 145 / 0.15)',
    primaryLg: '0 10px 40px 0 oklch(0.45 0.15 145 / 0.2)',
} as const;

/**
 * Animation Durations
 */
export const animation = {
    duration: {
        fastest: '50ms',
        faster: '100ms',
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
        slower: '400ms',
        slowest: '500ms',
    },
    easing: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
} as const;

/**
 * Z-Index Scale
 */
export const zIndex = {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    dropdown: '100',
    sticky: '200',
    fixed: '300',
    modalBackdrop: '400',
    modal: '500',
    popover: '600',
    tooltip: '700',
    toast: '800',
} as const;

/**
 * Breakpoints
 */
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;

/**
 * Status Badge Styles
 * Use these with the Badge component for consistent status styling
 */
export const statusStyles = {
    active: 'bg-success/10 text-success border-success/20',
    pending: 'bg-warning/10 text-warning border-warning/20',
    inactive: 'bg-muted text-muted-foreground border-muted',
    error: 'bg-destructive/10 text-destructive border-destructive/20',
    info: 'bg-info/10 text-info border-info/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
} as const;

/**
 * Common Tailwind class combinations for reuse
 */
export const commonStyles = {
    /** Interactive card with hover effects */
    cardInteractive:
        'transition-all duration-200 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5',
    /** Highlighted/featured card */
    cardHighlighted: 'border-primary/30 bg-primary/5',
    /** Glass morphism effect */
    glass: 'bg-background/80 backdrop-blur-sm border-border/50',
    glassStrong: 'bg-background/90 backdrop-blur-md border-border/60',
    /** Focus ring */
    focusRing:
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    /** Truncate text with ellipsis */
    truncate: 'overflow-hidden text-ellipsis whitespace-nowrap',
    /** Gradient primary background */
    gradientPrimary: 'bg-gradient-to-br from-primary to-primary/80',
    /** Subtle background gradient */
    gradientSubtle:
        'bg-gradient-to-br from-background via-muted/30 to-background',
    /** Text gradient */
    textGradient:
        'bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent',
} as const;

/**
 * Icon sizes (matching Lucide defaults)
 */
export const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
    '2xl': 'h-10 w-10',
    '3xl': 'h-12 w-12',
} as const;

/**
 * Avatar sizes
 */
export const avatarSizes = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-14 w-14',
    '2xl': 'h-16 w-16',
    '3xl': 'h-20 w-20',
    '4xl': 'h-24 w-24',
} as const;

export default {
    brandColors,
    semanticColors,
    spacing,
    typography,
    borderRadius,
    shadows,
    animation,
    zIndex,
    breakpoints,
    statusStyles,
    commonStyles,
    iconSizes,
    avatarSizes,
};
