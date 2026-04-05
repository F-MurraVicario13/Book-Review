'use client';

import { useState } from 'react';
import clsx from 'clsx';

export default function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onFocus={() => setHovered(star)}
          onBlur={() => setHovered(0)}
          onClick={() => onChange(star)}
          className={clsx(
            'text-3xl transition',
            active >= star ? 'text-amber' : 'text-bark/20 hover:text-amber/60'
          )}
          aria-label={`Set rating to ${star}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
