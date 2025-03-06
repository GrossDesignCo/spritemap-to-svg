import React from 'react';
import styles from './Docs.module.css';

/**
 * Component that displays documentation for converting a spritemap back to individual SVG files
 */
const SpriteMapToSvgDocs: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Extract SVGs from Spritemap</h1>
      
      <p>
        Convert an SVG spritemap back into individual SVG files. Upload your
        spritemap file to extract all the <code>{'<symbol>'}</code> elements as
        standalone SVGs, perfect for when you need to modify individual icons or
        migrate away from a spritemap system.
      </p>

      <p>
        Each extracted SVG will maintain its original ID as the filename and
        preserve all attributes including viewBox and internal structure. Download
        them individually or get all icons in a convenient ZIP file.
      </p>
    </div>
  );
};

export default SpriteMapToSvgDocs; 