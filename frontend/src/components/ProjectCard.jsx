export default function ProjectCard({ title, tags = [], description, link, linkLabel = "View project" }) {
  return (
    <>
      <style>{`
        .gc-card {
          background: rgba(14, 20, 14, 0.6);
          border: 1px solid rgba(100,118,86,0.16);
          border-left: 2px solid rgba(122,98,67,0.5);
          padding: 26px 24px 22px 26px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.28s ease, background 0.28s ease, transform 0.28s ease;
        }
        .gc-card:hover {
          border-color: rgba(100,118,86,0.32);
          background: rgba(18, 26, 18, 0.75);
          transform: translateY(-2px);
        }
        .gc-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(122,98,67,0.3), transparent);
        }

        .gc-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 500;
          font-size: 22px;
          letter-spacing: 0.5px;
          color: #F3ECCD;
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
          color: rgba(100,118,86,0.75);
          border: 1px solid rgba(100,118,86,0.22);
          padding: 3px 9px;
          border-radius: 1px;
        }

        .gc-desc {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 14px;
          color: rgba(243,236,205,0.42);
          line-height: 1.75;
          margin-bottom: 20px;
        }

        .gc-link {
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(212,168,83,0.7);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: color 0.2s ease;
        }
        .gc-link:hover { color: #D4A853; }
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