import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import styles from './SpriteMapToSvg.module.css';
import DropZone from './DropZone';
import SvgGrid, { SvgItem } from './SvgGrid';

const SpriteMapToSvg: React.FC = () => {
  const [symbols, setSymbols] = useState<SvgItem[]>([]);

  const handleFileUpload = async (files: FileList) => {
    const file = files[0];
    if (file && file.type === 'image/svg+xml') {
      const text = await file.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'image/svg+xml');
      const symbolElements = doc.querySelectorAll('symbol');

      const extractedSymbols: SvgItem[] = Array.from(symbolElements).map((symbol) => {
        const id = symbol.getAttribute('id') || '';
        const viewBox = symbol.getAttribute('viewBox') || '';
        const content = symbol.innerHTML;
        
        // Create a temporary container to properly handle SVG content
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = content;
        
        // Extract any defs from the symbol and add them to the content
        const defs = symbol.getElementsByTagName('defs');
        const defsContent = defs.length > 0 ? defs[0].outerHTML : '';
        
        return {
          id,
          name: id,
          content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
            ${defsContent}
            ${Array.from(tempContainer.children)
              .filter(node => node.tagName.toLowerCase() !== 'defs')
              .map(node => node.outerHTML)
              .join('')}
          </svg>`
        };
      });

      setSymbols(extractedSymbols);
    }
  };

  const downloadAllSvgs = async () => {
    const zip = new JSZip();

    symbols.forEach(({ id, content }) => {
      zip.file(`${id}.svg`, content);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'svg-symbols.zip');
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1 className={styles.title}>Extract SVGs from Spritemap</h1>
        <div className={styles.description}>
          <p>
            Convert an SVG spritemap back into individual SVG files. Upload your spritemap file to extract all the 
            <code>&lt;symbol&gt;</code> elements as standalone SVGs, perfect for when you need to modify individual icons 
            or migrate away from a spritemap system.
          </p>
          <p>
            Each extracted SVG will maintain its original ID as the filename and preserve all attributes including viewBox 
            and internal structure. Download them individually or get all icons in a convenient ZIP file.
          </p>
        </div>
      </section>

      <DropZone
        onFilesDropped={handleFileUpload}
        accept=".svg"
        multiple={false}
      >
        <p className={styles.dropZoneText}>
          Drop your SVG spritemap here or click to upload
        </p>
      </DropZone>

      {symbols.length > 0 && (
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              Extracted Symbols ({symbols.length})
            </h2>
            <button
              onClick={downloadAllSvgs}
              className={styles.downloadButton}
            >
              Download All as ZIP
            </button>
          </div>

          <SvgGrid items={symbols} />
        </div>
      )}
    </div>
  );
};

export default SpriteMapToSvg; 