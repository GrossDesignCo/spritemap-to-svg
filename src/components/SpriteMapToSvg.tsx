import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import styles from './SpriteMapToSvg.module.css';

interface ExtractedSymbol {
  id: string;
  content: string;
}

const SpriteMapToSvg: React.FC = () => {
  const [symbols, setSymbols] = useState<ExtractedSymbol[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    const text = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'image/svg+xml');
    const symbolElements = doc.querySelectorAll('symbol');

    const extractedSymbols: ExtractedSymbol[] = Array.from(symbolElements).map((symbol) => {
      const id = symbol.getAttribute('id') || '';
      const viewBox = symbol.getAttribute('viewBox') || '';
      const content = symbol.innerHTML;
      
      return {
        id,
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${content}</svg>`
      };
    });

    setSymbols(extractedSymbols);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'image/svg+xml') {
      handleFileUpload(file);
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

      <div
        className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".svg"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
        />
        <p className={styles.dropZoneText}>
          {isDragging ? 'Drop SVG here' : 'Drop your SVG spritemap here or click to upload'}
        </p>
      </div>

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

          <div className={styles.grid}>
            {symbols.map(({ id, content }) => (
              <div key={id} className={styles.symbolCard}>
                <div
                  className={styles.symbolPreview}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                <p className={styles.symbolName} title={id}>
                  {id}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpriteMapToSvg; 