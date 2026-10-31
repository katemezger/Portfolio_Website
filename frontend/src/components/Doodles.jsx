// Small hand-drawn-style line-art doodles, same stroke-based technique as
// MotifIcon.jsx, used sparingly as an extension of the scattered-symbol
// layer and as section dividers. Placeholder style until real illustrated
// assets are supplied.
export default function Doodle({ name, color = 'currentColor', size = 20, style }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', style }
  switch (name) {
    case 'starburst':
      return <svg {...p}><path d="M12 2V9M12 15V22M2 12H9M15 12H22M4.5 4.5L9 9M15 15L19.5 19.5M19.5 4.5L15 9M9 15L4.5 19.5" /></svg>
    case 'heart':
      return <svg {...p}><path d="M12 20C12 20 3 14.5 3 8.5C3 5.5 5.5 3.5 8 3.5C10 3.5 11.3 4.6 12 6C12.7 4.6 14 3.5 16 3.5C18.5 3.5 21 5.5 21 8.5C21 14.5 12 20 12 20Z" /></svg>
    case 'moon':
      return <svg {...p}><path d="M20 13.5C18.6 16.7 15.5 19 11.8 19C7 19 3 15 3 10.2C3 6.5 5.3 3.4 8.5 2C7.6 3.5 7.1 5.2 7.1 7C7.1 12.2 11.3 16.4 16.5 16.4C17.8 16.4 19 16.1 20 13.5Z" /></svg>
    case 'daisy':
      return <svg {...p}><circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="5.5" rx="2.1" ry="3" /><ellipse cx="12" cy="18.5" rx="2.1" ry="3" /><ellipse cx="5.5" cy="12" rx="3" ry="2.1" /><ellipse cx="18.5" cy="12" rx="3" ry="2.1" /></svg>
    case 'swirl':
      return <svg {...p}><path d="M12 3C7 3 4 6.5 4 10.5C4 13.5 6.2 15.5 9 15.5C11 15.5 12.5 14.2 12.5 12.4C12.5 11 11.5 10 10.2 10C9.2 10 8.5 10.7 8.5 11.5" /></svg>
    default:
      return null
  }
}

// A restrained heart-flanked-by-swirls divider, used once between the
// project grid and the full index, and once above the education section.
export function SwirlDivider({ color = 'rgba(var(--ink-rgb),0.28)', style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, ...style }}>
      <Doodle name="swirl" color={color} size={16} />
      <Doodle name="heart" color={color} size={14} />
      <Doodle name="swirl" color={color} size={16} style={{ transform: 'scaleX(-1)' }} />
    </div>
  )
}
