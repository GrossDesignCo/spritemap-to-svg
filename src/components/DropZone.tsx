import React, { useRef, useState } from 'react';
import styles from './DropZone.module.css';

interface DropZoneProps {
  onFilesDropped: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const DropZone: React.FC<DropZoneProps> = ({
  onFilesDropped,
  accept = '*',
  multiple = false,
  children,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    onFilesDropped(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesDropped(e.target.files);
    }
  };

  return (
    <div
      className={`${styles.dropZone} ${isDragging ? styles.dragging : ''} ${className || ''}`}
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
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
      />
      {children || (
        <p className={styles.dropZoneText}>
          {isDragging ? 'Drop files here' : 'Drop files here or click to upload'}
        </p>
      )}
    </div>
  );
};

export default DropZone; 