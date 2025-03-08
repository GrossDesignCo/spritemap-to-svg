import React, { useState } from "react";
import { saveAs } from "file-saver";
import { Download, Copy, Check } from "lucide-react";
import styles from "./SvgGrid.module.css";
import Button from './Button';

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

const SvgGrid: React.FC<SvgGridProps> = ({ items }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = (content: string, name: string) => {
    const blob = new Blob([content], { type: "image/svg+xml" });
    saveAs(blob, `${name}.svg`);
  };

  return (
    <div className={styles.grid}>
      {items.map(({ id, content, name }) => (
        <div
          key={id}
          className={styles.svgCard}
        >
          <div
            className={styles.svgPreview}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <p className={styles.svgName} title={name}>
            {name}
          </p>

          <div className={styles.actions}>
            <Button 
              variant="secondary" 
              onClick={() => handleCopy(content, id)}
              title="Copy SVG code"
              aria-label={`Copy ${name} SVG code`}
            >
              {copiedId === id ? <Check size={16} /> : <Copy size={16} />}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleDownload(content, name)}
              title="Download SVG"
              aria-label={`Download ${name} SVG`}
            >
              <Download size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SvgGrid;
