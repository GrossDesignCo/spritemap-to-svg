import React from 'react';
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
  onRemove, 
  showRemoveButton = false 
}) => {
  return (
    <div className={styles.grid}>
      {items.map(({ id, content, name }) => (
        <div key={id} className={styles.svgCard}>
          {showRemoveButton && onRemove && (
            <button
              onClick={() => onRemove(id)}
              className={styles.removeButton}
            >
              ×
            </button>
          )}
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