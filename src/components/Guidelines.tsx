import React, { useEffect, useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import { loadMarkdownContent } from '../utils/markdown';

/**
 * Guidelines component that displays SVG spritemap usage guidelines
 * using markdown content for better maintainability.
 */
const Guidelines: React.FC = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMarkdownContent('/src/content/guidelines.md')
      .then(setContent)
      .catch(err => {
        console.error('Failed to load guidelines:', err);
        setError('Failed to load guidelines. Please try again later.');
      });
  }, []);

  if (error) {
    return (
      <div>
        <p>Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return <MarkdownRenderer content={content} />;
};

export default Guidelines; 