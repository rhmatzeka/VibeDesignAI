export function VibeDesignLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" role="img" aria-label="VibeDesign AI logo" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="44" height="44" rx="16" fill="url(#logo-bg)" />
      <rect x="2.75" y="2.75" width="42.5" height="42.5" rx="15.25" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" />
      <path d="M15 31.5L31.5 15" stroke="#06100D" strokeWidth="3.25" strokeLinecap="round" />
      <path d="M15 31.5L31.5 15" stroke="white" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
      <path d="M17 15.5L18.7 18.7L22 20.5L18.7 22.3L17 25.5L15.3 22.3L12 20.5L15.3 18.7L17 15.5Z" fill="#06100D" />
      <path d="M31.5 22L32.8 24.5L35.5 26L32.8 27.5L31.5 30L30.2 27.5L27.5 26L30.2 24.5L31.5 22Z" fill="#06100D" />
      <circle cx="33" cy="12.5" r="2.5" fill="#06100D" />
      <path d="M13.5 35.5C21.5 35.5 29.2 33.1 35.5 28.7" stroke="#06100D" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" />
      <defs>
        <linearGradient id="logo-bg" x1="6" y1="5" x2="43" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64F4D2" />
          <stop offset="0.45" stopColor="#00D4A4" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
