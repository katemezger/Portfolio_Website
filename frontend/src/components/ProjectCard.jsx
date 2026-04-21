export default function ProjectCard({ title, tags = [], description, link, linkLabel = "View project" }) {
  return (
    <>
      <style>{`
        .gc-card {
          background: rgba(10, 35, 20, 0.55);
          border: 1px solid rgba(131,153,88,0.18);
          border-left: 2px solid rgba(211,150,140,0.45);
          padding: 26px 24px 22px 26px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.28s ease, background 0.28s ease, transform 0.28s ease;
        }
        .gc-card:hover {
          border-color: rgba(131,153,88,0.38);
          background: rgba(10, 40, 24, 0.75);
          transform: translateY(-2px);
        }
        .gc-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(211,150,140,0.25), transparent);
        }

        .gc-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 500;
          font-size: 22px;
          letter-spacing: 0.5px;
          color: #F7F4D5;
          margin-bottom: 12px;
          line-height: 1.1;
        }

        .gc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }
        .gc-tag {
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(131,153,88,0.8);
          border: 1px solid rgba(131,153,88,0.25);
          padding: 3px 9px;
          border-radius: 1px;
        }

        .gc-desc {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 14px;
          color: rgba(247,244,213,0.45);
          line-height: 1.75;
          margin-bottom: 20px;
        }

        .gc-link {
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(211,150,140,0.75);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: color 0.2s ease;
        }
        .gc-link:hover { color: #D3968C; }
        .gc-link::after {
          content: '→';
          font-size: 12px;
        }
      `}</style>

      <div className="gc-card">
        <div className="gc-title">{title}</div>
        {tags.length > 0 && (
          <div className="gc-tags">
            {tags.map(t => <span key={t} className="gc-tag">{t}</span>)}
          </div>
        )}
        {description && <p className="gc-desc">{description}</p>}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="gc-link">
            {linkLabel}
          </a>
        )}
      </div>
    </>
  )
}
