import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * A reusable component for rendering markdown content with syntax highlighting for code blocks.
 * Styling is left to the consumer of this component.
 * 
 * @param content - The markdown content to render
 * @param className - CSS class to apply to the container
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => (
  <div className={className}>
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          
          if (!inline && language) {
            return (
              <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }

          return <code {...props}>{children}</code>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

export default MarkdownRenderer; 