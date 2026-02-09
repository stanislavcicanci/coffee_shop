import React from 'react';

/**
 * Ember Coffee logo — CSS-only emblem + wordmark built with Tailwind classes.
 * Props:
 *  - className: additional class names for the wrapper
 *  - size: 'sm' | 'md' | 'lg' (controls emblem size)
 */
export default function Logo({ className = '', size = 'md', ariaLabel = 'Ember Coffee' }) {
  const sizeMap = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };
  const emblemSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label={ariaLabel}>
      {/* Emblem */}
      <div
        className={`${emblemSize} relative flex items-center justify-center rounded-xl`}
        aria-hidden="true"
      >
        {/* Outer gradient circle */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-md transform rotate-6"></div>

        {/* Inner negative-space ember shape */}
        <div className="relative z-10 w-2/3 h-2/3 rounded-full bg-white/90 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full bg-primary/95 transform -translate-y-1"></div>
        </div>

        {/* Accent spark */}
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white/85 shadow-sm"></div>
      </div>

      {/* Wordmark */}
      <div className="leading-none">
        <div className="text-primary font-display text-xl tracking-tight">Ember</div>
        <div className="text-secondary text-xs font-sans -mt-0.5">Coffee</div>
      </div>
    </div>
  );
}