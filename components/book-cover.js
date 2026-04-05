import Image from 'next/image';

export default function BookCover({ src, alt, priority = false }) {
  if (!src) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(234,223,205,0.95),rgba(217,197,171,0.95))] px-6 text-center text-sm font-semibold uppercase tracking-[0.28em] text-bark/65">
        No jacket found
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-oat/60">
      <Image src={src} alt={alt} fill priority={priority} className="object-cover" sizes="(max-width: 768px) 70vw, 30vw" />
    </div>
  );
}
