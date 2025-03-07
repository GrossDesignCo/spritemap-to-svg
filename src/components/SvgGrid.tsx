import React from 'react';
import { saveAs } from 'file-saver';
import styles from './SvgGrid.module.css';

export interface SvgItem {
  id: string;
  content: string;
  name: string;
}

interface SvgGridProps {
  items: SvgItem[];
  onRemove?: (id: string) => void;
  showRemoveButton?: boolean;
}

const SvgGrid: React.FC<SvgGridProps> = ({
  items,
}) => {
  const handleDownload = (content: string, name: string) => {
    const blob = new Blob([content], { type: 'image/svg+xml' });
    saveAs(blob, `${name}.svg`);
  };

  return (
    <div className={styles.grid}>
      {items.map(({ id, content, name }) => (
        <div key={id} className={styles.svgCard}
          onClick={() => handleDownload(content, name)}
          role="button"
          title="Click to download"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleDownload(content, name);
            }
          }}>
          <div
            className={styles.svgPreview}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <p className={styles.svgName} title={name}>
            {name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SvgGrid;
