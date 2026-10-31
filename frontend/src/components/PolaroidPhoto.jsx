// A small, restrained photo frame: a white mat border, soft shadow, and a
// subtle 1-2deg rotation for warmth — no washi-tape graphic (kept
// deliberately understated to stay on the professional side).
// `zoom` scales the photo in from the point given by `focus` (an
// object-position value) — useful for a wide group shot where only one
// person in it is the actual subject.
export default function PolaroidPhoto({ src, alt, rotate = -2, zoom = 1, focus = '50% 50%', style = {} }) {
  return (
    <div style={{
      background: '#E8E1D6',
      padding: '10px 10px 10px',
      borderRadius: 3,
      boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
      transform: `rotate(${rotate}deg)`,
      ...style,
    }}>
      <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: 2 }}>
        <img src={src} alt={alt} style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus,
          transform: `scale(${zoom})`, display: 'block',
        }} />
      </div>
    </div>
  )
}
