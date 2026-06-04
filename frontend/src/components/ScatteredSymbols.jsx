const SYMBOLS_DATA = [
  // Far left
  { s: '✦', x: '1%',  y: 90,   sz: 18, op: 0.22, d: 0    },
  { s: '◇', x: '3%',  y: 230,  sz: 13, op: 0.18, d: 0.4  },
  { s: '☆', x: '1%',  y: 400,  sz: 24, op: 0.20, d: 1.1  },
  { s: '✩', x: '4%',  y: 550,  sz: 15, op: 0.21, d: 0.7  },
  { s: '✸', x: '2%',  y: 710,  sz: 18, op: 0.19, d: 1.8  },
  { s: '❋', x: '4%',  y: 870,  sz: 24, op: 0.17, d: 0.3  },
  { s: '✦', x: '1%',  y: 1030, sz: 16, op: 0.22, d: 1.2  },
  { s: '◇', x: '3%',  y: 1190, sz: 19, op: 0.18, d: 0.6  },
  { s: '☽', x: '2%',  y: 1350, sz: 21, op: 0.17, d: 2.0  },
  { s: '✿', x: '4%',  y: 1510, sz: 22, op: 0.19, d: 0.9  },
  { s: '✧', x: '1%',  y: 1670, sz: 15, op: 0.20, d: 0.5  },
  { s: '♥', x: '3%',  y: 1830, sz: 17, op: 0.18, d: 1.4  },
  { s: '✦', x: '2%',  y: 1990, sz: 22, op: 0.21, d: 0.2  },
  { s: '◈', x: '4%',  y: 2150, sz: 17, op: 0.19, d: 1.6  },
  { s: '✩', x: '1%',  y: 2310, sz: 18, op: 0.20, d: 0.3  },
  { s: '☆', x: '3%',  y: 2470, sz: 22, op: 0.17, d: 1.0  },
  { s: '✸', x: '2%',  y: 2630, sz: 15, op: 0.19, d: 0.7  },
  { s: '✦', x: '4%',  y: 2790, sz: 23, op: 0.20, d: 1.8  },
  { s: '❋', x: '1%',  y: 2950, sz: 19, op: 0.18, d: 0.4  },
  { s: '◇', x: '3%',  y: 3110, sz: 16, op: 0.21, d: 1.2  },
  // Near-left
  { s: '✧', x: '8%',  y: 160,  sz: 13, op: 0.16, d: 0.9  },
  { s: '✦', x: '10%', y: 450,  sz: 14, op: 0.15, d: 0.3  },
  { s: '✩', x: '8%',  y: 760,  sz: 12, op: 0.16, d: 0.5  },
  { s: '✿', x: '11%', y: 1060, sz: 16, op: 0.14, d: 0.8  },
  { s: '❋', x: '9%',  y: 1360, sz: 18, op: 0.13, d: 0.2  },
  { s: '☽', x: '8%',  y: 1660, sz: 14, op: 0.14, d: 0.6  },
  { s: '♥', x: '10%', y: 1960, sz: 12, op: 0.13, d: 0.4  },
  { s: '◇', x: '8%',  y: 2260, sz: 13, op: 0.14, d: 1.7  },
  { s: '✸', x: '11%', y: 2560, sz: 12, op: 0.15, d: 0.3  },
  { s: '✦', x: '9%',  y: 2850, sz: 15, op: 0.14, d: 1.1  },
  // Far right
  { s: '◇', x: '91%', y: 70,   sz: 17, op: 0.21, d: 0.5  },
  { s: '✦', x: '95%', y: 220,  sz: 22, op: 0.23, d: 1.3  },
  { s: '☆', x: '88%', y: 390,  sz: 16, op: 0.19, d: 0.2  },
  { s: '✩', x: '93%', y: 540,  sz: 19, op: 0.20, d: 1.7  },
  { s: '✸', x: '89%', y: 700,  sz: 15, op: 0.18, d: 0.8  },
  { s: '✦', x: '96%', y: 860,  sz: 23, op: 0.21, d: 1.5  },
  { s: '❋', x: '91%', y: 1020, sz: 21, op: 0.19, d: 0.1  },
  { s: '◇', x: '94%', y: 1180, sz: 16, op: 0.20, d: 1.9  },
  { s: '✿', x: '88%', y: 1340, sz: 20, op: 0.18, d: 0.4  },
  { s: '☽', x: '95%', y: 1500, sz: 18, op: 0.19, d: 1.1  },
  { s: '✧', x: '90%', y: 1660, sz: 15, op: 0.20, d: 0.6  },
  { s: '♥', x: '93%', y: 1820, sz: 17, op: 0.18, d: 1.4  },
  { s: '✦', x: '89%', y: 1980, sz: 26, op: 0.22, d: 0.2  },
  { s: '◈', x: '95%', y: 2140, sz: 16, op: 0.19, d: 1.6  },
  { s: '✩', x: '92%', y: 2300, sz: 19, op: 0.20, d: 0.3  },
  { s: '☆', x: '88%', y: 2460, sz: 21, op: 0.18, d: 1.0  },
  { s: '✸', x: '96%', y: 2620, sz: 15, op: 0.19, d: 0.7  },
  { s: '✦', x: '91%', y: 2780, sz: 20, op: 0.21, d: 1.8  },
  { s: '❋', x: '94%', y: 2940, sz: 23, op: 0.17, d: 0.4  },
  { s: '◇', x: '89%', y: 3100, sz: 17, op: 0.20, d: 1.2  },
  // Near-right
  { s: '◈', x: '84%', y: 160,  sz: 13, op: 0.16, d: 1.6  },
  { s: '☆', x: '86%', y: 450,  sz: 14, op: 0.15, d: 1.2  },
  { s: '◇', x: '85%', y: 760,  sz: 13, op: 0.16, d: 1.0  },
  { s: '✦', x: '87%', y: 1060, sz: 14, op: 0.15, d: 1.5  },
  { s: '✧', x: '84%', y: 1360, sz: 12, op: 0.15, d: 1.8  },
  { s: '✩', x: '86%', y: 1660, sz: 15, op: 0.16, d: 1.3  },
  { s: '✦', x: '85%', y: 1960, sz: 14, op: 0.15, d: 0.9  },
  { s: '☆', x: '87%', y: 2260, sz: 16, op: 0.15, d: 1.1  },
  { s: '❋', x: '84%', y: 2560, sz: 17, op: 0.14, d: 1.6  },
  { s: '✩', x: '86%', y: 2850, sz: 15, op: 0.16, d: 0.8  },
]

const ANIM = `@keyframes symFloat {
  from { transform: translateY(0px) rotate(0deg); }
  to   { transform: translateY(-7px) rotate(10deg); }
}`

/* Default (absolute) — for Home, where content is 3000px+ tall. */
export default function ScatteredSymbols() {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '3600px',
      pointerEvents: 'none', zIndex: 0,
    }}>
      <style>{ANIM}</style>
      {SYMBOLS_DATA.map((sym, i) => (
        <span key={i} style={{
          position: 'absolute', left: sym.x, top: sym.y,
          fontSize: sym.sz, opacity: sym.op, color: '#071A12',
          userSelect: 'none', lineHeight: 1, display: 'block',
          animation: `symFloat ${3.5 + (i % 6) * 0.8}s ease-in-out infinite alternate`,
          animationDelay: `${sym.d}s`,
        }}>{sym.s}</span>
      ))}
    </div>
  )
}

/*
 * Fixed variant — for shorter pages (discipline, about, project).
 * Uses position:fixed so it sits on top of the viewport without
 * ever adding scroll height past the actual page content.
 * Positions are expressed as viewport percentages.
 */
const FIXED_SYMBOLS = [
  { s:'✦', x:'1%',  y:'7%',  sz:18, op:0.22, d:0    },
  { s:'◇', x:'4%',  y:'22%', sz:13, op:0.18, d:0.4  },
  { s:'☆', x:'1%',  y:'38%', sz:22, op:0.20, d:1.1  },
  { s:'✩', x:'5%',  y:'54%', sz:15, op:0.21, d:0.7  },
  { s:'✸', x:'2%',  y:'70%', sz:17, op:0.19, d:1.8  },
  { s:'❋', x:'4%',  y:'85%', sz:23, op:0.17, d:0.3  },
  { s:'◇', x:'92%', y:'6%',  sz:17, op:0.21, d:0.5  },
  { s:'✦', x:'96%', y:'20%', sz:22, op:0.23, d:1.3  },
  { s:'☆', x:'89%', y:'35%', sz:16, op:0.19, d:0.2  },
  { s:'✩', x:'94%', y:'50%', sz:19, op:0.20, d:1.7  },
  { s:'✸', x:'90%', y:'65%', sz:15, op:0.18, d:0.8  },
  { s:'✦', x:'97%', y:'80%', sz:21, op:0.21, d:1.5  },
  { s:'❋', x:'91%', y:'92%', sz:20, op:0.19, d:0.1  },
  { s:'✧', x:'9%',  y:'14%', sz:13, op:0.16, d:0.9  },
  { s:'✦', x:'11%', y:'46%', sz:14, op:0.15, d:0.3  },
  { s:'☽', x:'8%',  y:'78%', sz:14, op:0.16, d:0.6  },
  { s:'◈', x:'86%', y:'16%', sz:13, op:0.16, d:1.6  },
  { s:'✧', x:'84%', y:'48%', sz:12, op:0.15, d:1.8  },
  { s:'✩', x:'87%', y:'80%', sz:15, op:0.16, d:1.3  },
]

export function ScatteredSymbolsFixed() {
  return (
    <div aria-hidden="true" style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 0,
      overflow: 'hidden',
    }}>
      <style>{ANIM}</style>
      {FIXED_SYMBOLS.map((sym, i) => (
        <span key={i} style={{
          position: 'absolute', left: sym.x, top: sym.y,
          fontSize: sym.sz, opacity: sym.op, color: '#071A12',
          userSelect: 'none', lineHeight: 1, display: 'block',
          animation: `symFloat ${3.5 + (i % 6) * 0.8}s ease-in-out infinite alternate`,
          animationDelay: `${sym.d}s`,
        }}>{sym.s}</span>
      ))}
    </div>
  )
}
