import React, { useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import styles from './SvgToSpriteMap.module.css';

interface UploadedSvg {
  id: string;
  content: string;
  viewBox: string;
  originalName: string;
}

const SvgToSpriteMap: React.FC = () => {
  const [svgs, setSvgs] = useState<UploadedSvg[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList) => {
    const newSvgs: UploadedSvg[] = [];

    for (const file of Array.from(files)) {
      if (file.type === 'image/svg+xml') {
        const text = await file.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');

        if (svgElement) {
          const viewBox = svgElement.getAttribute('viewBox') || '';
          const content = svgElement.innerHTML;
          const fileName = file.name.replace('.svg', '');
          
          newSvgs.push({
            id: fileName.replace(/[^a-z0-9-]/gi, '-').toLowerCase(),
            content,
            viewBox,
            originalName: fileName
          });
        }
      }
    }

    setSvgs((prev) => [...prev, ...newSvgs]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeSvg = (id: string) => {
    setSvgs((prev) => prev.filter((svg) => svg.id !== id));
  };

  const generateSpriteMap = () => {
    const spriteMap = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
${svgs.map(({ id, content, viewBox }) => 
  `  <symbol id="${id}" viewBox="${viewBox}">
    ${content}
  </symbol>`
).join('\n')}
</svg>`;

    const blob = new Blob([spriteMap], { type: 'image/svg+xml' });
    saveAs(blob, 'spritemap.svg');
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1 className={styles.title}>SVG Spritemap Converter</h1>
        <div className={styles.description}>
          <p>
            Convert between individual SVG files and SVG spritemaps. Upload your SVG files to combine them into a single spritemap, 
            making it efficient to use multiple icons in your web projects with a single HTTP request.
          </p>
          <p>
            Each SVG will be converted into a <code>&lt;symbol&gt;</code> element with a unique ID, which you can later reference 
            using <code>&lt;use&gt;</code> tags in your HTML.
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
          multiple
          onChange={(e) => {
            if (e.target.files) handleFileUpload(e.target.files);
          }}
        />
        <p className={styles.dropZoneText}>
          {isDragging ? 'Drop SVGs here' : 'Drop your SVG files here or click to upload'}
        </p>
      </div>

      {svgs.length > 0 && (
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              Uploaded SVGs ({svgs.length})
            </h2>
            <button
              onClick={generateSpriteMap}
              className={styles.generateButton}
            >
              Generate Spritemap
            </button>
          </div>

          <div className={styles.grid}>
            {svgs.map(({ id, content, viewBox, originalName }) => (
              <div key={id} className={styles.svgCard}>
                <button
                  onClick={() => removeSvg(id)}
                  className={styles.removeButton}
                >
                  ×
                </button>
                <div
                  className={styles.svgPreview}
                  dangerouslySetInnerHTML={{ 
                    __html: `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${content}</svg>` 
                  }}
                />
                <p className={styles.svgName} title={originalName}>
                  {originalName}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SvgToSpriteMap; 