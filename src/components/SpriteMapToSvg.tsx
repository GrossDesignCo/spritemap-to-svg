import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import styles from './SpriteMapToSvg.module.css';
import DropZone from './DropZone';
import SvgGrid, { SvgItem } from './SvgGrid';
import SpriteMapToSvgDocs from './SpriteMapToSvgDocs';

const SpriteMapToSvg: React.FC = () => {
  const [symbols, setSymbols] = useState<SvgItem[]>([]);

  const handleFileUpload = async (files: FileList) => {
    const file = files[0];
    if (file && file.type === 'image/svg+xml') {
      const text = await file.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'image/svg+xml');
      const symbolElements = doc.querySelectorAll('symbol');

      const newSymbols: SvgItem[] = Array.from(symbolElements).map((symbol) => {
        const id = symbol.getAttribute('id') || '';
        const viewBox = symbol.getAttribute('viewBox') || '';
        const content = symbol.innerHTML;

        // Get all attributes except 'id' since we'll handle that separately
        const attributes = Array.from(symbol.attributes)
          .filter(attr => attr.name !== 'id')
          .map(attr => `${attr.name}="${attr.value}"`)
          .join(' ');

        // Ensure we have xmlns attribute for standalone SVG
        const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
        const allAttributes = attributes.includes('xmlns=') ? attributes : `${xmlns} ${attributes}`;

        return {
          id,
          name: id,
          content: `<svg ${allAttributes}>${content}</svg>`,
        };
      });

      setSymbols(newSymbols);
    }
  };

  const downloadAllSvgs = async () => {
    const zip = new JSZip();

    symbols.forEach(({ name, content }) => {
      zip.file(`${name}.svg`, content);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'svg-files.zip');
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <SpriteMapToSvgDocs />
      </section>

      <DropZone
        onFilesDropped={handleFileUpload}
        accept=".svg"
        multiple={false}
      >
        <p className={styles.dropZoneText}>
          Drop your spritemap SVG file here or click to upload
        </p>
      </DropZone>

      {symbols.length > 0 && (
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              Extracted SVGs ({symbols.length})
            </h2>
            <button
              onClick={downloadAllSvgs}
              className={styles.downloadButton}
            >
              Download All SVGs
            </button>
          </div>

          <SvgGrid items={symbols} />
        </div>
      )}
    </div>
  );
};

export default SpriteMapToSvg;
