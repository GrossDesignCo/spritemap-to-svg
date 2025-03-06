import React from 'react';
import styles from './Docs.module.css';

/**
 * Component that displays documentation for converting SVG files to a spritemap
 */
const SvgToSpriteMapDocs: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>SVG Spritemap Converter</h1>
      
      <p>
        Convert between individual SVG files and SVG spritemaps. Upload your SVG
        files to combine them into a single spritemap, making it efficient to use
        multiple icons in your web projects with a single HTTP request.
      </p>

      <p>
        Each SVG will be converted into a <code>{'<symbol>'}</code> element with a
        unique ID, which you can later reference using <code>{'<use>'}</code> tags
        in your HTML.
      </p>
    </div>
  );
};

export default SvgToSpriteMapDocs; 