import clsx from 'clsx';

export default function Stars({ value = 0, size = 'md' }) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rounded >= star;
        const half = !filled && rounded === star - 0.5;

        return (
          <span
            key={star}
            className={clsx(
              'relative inline-flex text-amber',
              size === 'sm' ? 'text-base' : 'text-lg'
            )}
            aria-hidden="true"
          >
            <span className="text-bark/20">★</span>
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? '100%' : '50%' }}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
