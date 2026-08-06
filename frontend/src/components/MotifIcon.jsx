// Small hand-drawn line-art icon per project, shared between the homepage
// project cards and each project's own case-study page so the icon system
// reads as consistent across the whole site.
export default function MotifIcon({ name, color, size = 20 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'leaf':
      return <svg {...p}><path d="M4 20C4 10 10 4 20 4C20 14 14 20 4 20Z" /><path d="M4 20C8 14 12 10 18 6" /></svg>
    case 'keyboard':
      return <svg {...p}><rect x="2.5" y="6" width="19" height="12" rx="2" /><line x1="6" y1="10" x2="6" y2="10" /><line x1="9" y1="10" x2="9" y2="10" /><line x1="12" y1="10" x2="12" y2="10" /><line x1="15" y1="10" x2="15" y2="10" /><line x1="18" y1="10" x2="18" y2="10" /><line x1="6" y1="14.5" x2="15" y2="14.5" /></svg>
    case 'flag':
      return <svg {...p}><line x1="5" y1="3" x2="5" y2="21" /><path d="M5 4H18L14 8L18 12H5" fill={color} fillOpacity="0.22" /></svg>
    case 'chart':
      return <svg {...p}><path d="M3 20H21" /><rect x="5" y="14" width="3" height="6" /><rect x="10.5" y="10" width="3" height="10" /><rect x="16" y="5" width="3" height="15" /><path d="M5 9L10 5L15 8L20 3" /></svg>
    case 'film':
      return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="1.5" /><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /><line x1="7" y1="4" x2="7" y2="8" /><line x1="7" y1="16" x2="7" y2="20" /><line x1="17" y1="4" x2="17" y2="8" /><line x1="17" y1="16" x2="17" y2="20" /></svg>
    case 'dice':
      return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="3" /><circle cx="8" cy="8" r="1.1" fill={color} stroke="none" /><circle cx="16" cy="8" r="1.1" fill={color} stroke="none" /><circle cx="12" cy="12" r="1.1" fill={color} stroke="none" /><circle cx="8" cy="16" r="1.1" fill={color} stroke="none" /><circle cx="16" cy="16" r="1.1" fill={color} stroke="none" /></svg>
    case 'controller':
      return <svg {...p}><path d="M6 8.5H10M8 6.5V10.5" /><circle cx="16.5" cy="8" r="0.9" fill={color} stroke="none" /><circle cx="18.5" cy="10" r="0.9" fill={color} stroke="none" /><path d="M5 8C3 8 2 10 2 13C2 16 3.5 18 5.5 17C7 16.3 7.5 15 9 15H15C16.5 15 17 16.3 18.5 17C20.5 18 22 16 22 13C22 10 21 8 19 8C17 8 16.5 9 12 9C7.5 9 7 8 5 8Z" /></svg>
    case 'chip':
      return <svg {...p}><rect x="7" y="7" width="10" height="10" rx="1" /><line x1="9" y1="2" x2="9" y2="7" /><line x1="12" y1="2" x2="12" y2="7" /><line x1="15" y1="2" x2="15" y2="7" /><line x1="9" y1="17" x2="9" y2="22" /><line x1="12" y1="17" x2="12" y2="22" /><line x1="15" y1="17" x2="15" y2="22" /><line x1="2" y1="9" x2="7" y2="9" /><line x1="2" y1="12" x2="7" y2="12" /><line x1="2" y1="15" x2="7" y2="15" /><line x1="17" y1="9" x2="22" y2="9" /><line x1="17" y1="12" x2="22" y2="12" /><line x1="17" y1="15" x2="22" y2="15" /></svg>
    default:
      return null
  }
}

// slug -> motif name, so the homepage project cards can show the same icon
// as each project's own case-study page without duplicating the mapping.
export const PROJECT_MOTIFS = {
  'eden-portfolio': 'leaf',
  'cgs-usability-study': 'keyboard',
  'tracksense-ai': 'flag',
  'time2invest': 'chart',
  'netflix-prediction': 'film',
  'divinity-sales-prediction': 'dice',
  'steam-customer-segmentation': 'controller',
  'ais-portal': 'chip',
}
