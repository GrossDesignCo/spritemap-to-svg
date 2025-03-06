import React from 'react';

const Guidelines: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">SVG Spritemap Guidelines</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-text-primary">What is an SVG Spritemap?</h3>
        <p className="mb-4 text-text-secondary">
          An SVG spritemap is a single SVG file that contains multiple SVG symbols, each with a unique ID.
          This approach allows you to:
        </p>
        <ul className="list-disc pl-6 mb-4 text-text-secondary">
          <li>Reduce HTTP requests by combining multiple SVG files into one</li>
          <li>Reuse the same icons multiple times without code duplication</li>
          <li>Easily manage and maintain your SVG assets in one place</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-text-primary">How to Use a Spritemap</h3>
        
        <h4 className="text-lg font-medium mb-2 text-text-primary">1. Include the Spritemap</h4>
        <p className="mb-4 text-text-secondary">
          First, include the spritemap in your HTML. You can either inline it or load it externally:
        </p>
        <pre className="bg-bg-secondary/50 p-4 rounded-lg mb-4 overflow-x-auto font-mono">
          <code className="text-text-primary">{`<!-- Option 1: Inline -->
<div style="display: none">
  <!-- Paste your spritemap here -->
</div>

<!-- Option 2: External file -->
<object id="svg-sprites" type="image/svg+xml" data="spritemap.svg">
  Your browser does not support SVG
</object>`}</code>
        </pre>

        <h4 className="text-lg font-medium mb-2 text-text-primary">2. Use the Symbols</h4>
        <p className="mb-4 text-text-secondary">
          Reference symbols using the SVG {'<use>'} element:
        </p>
        <pre className="bg-bg-secondary/50 p-4 rounded-lg mb-4 overflow-x-auto font-mono">
          <code className="text-text-primary">{`<svg>
  <use href="#icon-id" />
</svg>`}</code>
        </pre>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-text-primary">Best Practices</h3>
        <ul className="list-disc pl-6 text-text-secondary">
          <li className="mb-2">Use meaningful and consistent IDs for your symbols</li>
          <li className="mb-2">Optimize your SVGs before adding them to the spritemap</li>
          <li className="mb-2">Keep the viewBox attribute on your symbols for proper scaling</li>
          <li className="mb-2">Consider using tools like SVGO to optimize your SVGs</li>
          <li className="mb-2">Remove unnecessary attributes and inline styles from your SVGs</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4 text-text-primary">Example Usage</h3>
        <pre className="bg-bg-secondary/50 p-4 rounded-lg mb-4 overflow-x-auto font-mono">
          <code className="text-text-primary">{`<!-- HTML -->
<svg class="icon" aria-hidden="true">
  <use href="#icon-menu" />
</svg>

<!-- CSS -->
.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}`}</code>
        </pre>
        <p className="text-text-secondary">
          The <code className="bg-bg-secondary/50 px-1.5 py-0.5 rounded text-text-primary font-mono">currentColor</code> value allows the icon to inherit its color from its parent element,
          making it easy to change the icon color using CSS.
        </p>
      </section>
    </div>
  );
};

export default Guidelines; 