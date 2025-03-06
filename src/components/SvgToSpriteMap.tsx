import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import styles from './SvgToSpriteMap.module.css';
import DropZone from './DropZone';
import SvgGrid, { SvgItem } from './SvgGrid';
import SvgToSpriteMapDocs from './SvgToSpriteMapDocs';

/**
 * Component that displays documentation for converting SVG files to a spritemap
 * using statically imported markdown content.
 */
const SvgToSpriteMap: React.FC = () => {
  const [svgs, setSvgs] = useState<SvgItem[]>([]);

  const handleFileUpload = async (files: FileList) => {
    const newSvgs: SvgItem[] = [];

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
          const id = fileName.replace(/[^a-z0-9-]/gi, '-').toLowerCase();

          newSvgs.push({
            id,
            name: fileName,
            content: `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`,
          });
        }
      }
    }

    setSvgs((prev) => [...prev, ...newSvgs]);
  };

  const removeSvg = (id: string) => {
    setSvgs((prev) => prev.filter((svg) => svg.id !== id));
  };

  const generateSpriteMap = () => {
    const spriteMap = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${svgs
      .map(({ id, content }) => {
        const viewBox = content.match(/viewBox="([^"]+)"/)?.[1] || '';
        return `  <symbol id="${id}" viewBox="${viewBox}">
    ${content.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </symbol>`;
      })
      .join('\n')}</svg>`;

    const blob = new Blob([spriteMap], { type: 'image/svg+xml' });
    saveAs(blob, 'spritemap.svg');
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <SvgToSpriteMapDocs />
      </section>

      <DropZone onFilesDropped={handleFileUpload} accept=".svg" multiple={true}>
        <p className={styles.dropZoneText}>
          Drop your SVG files here or click to upload
        </p>
      </DropZone>

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

          <SvgGrid items={svgs} onRemove={removeSvg} showRemoveButton={true} />
        </div>
      )}
    </div>
  );
};

export default SvgToSpriteMap;
