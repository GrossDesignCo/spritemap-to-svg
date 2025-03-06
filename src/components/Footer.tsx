import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a
            href="https://github.com/GrossDesignCo/spritemap-to-svg"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://mattgross.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            mattgross.io
          </a>
        </div>
      </div>
    </footer>
  );
};
