import React from 'react';

/**
 * Guidelines component that displays SVG spritemap usage guidelines
 */
const Guidelines: React.FC = () => {
  return (
    <div>
      <h2>What is an SVG Spritemap?</h2>
      
      <p>
        An SVG spritemap is a single SVG file that contains multiple SVG symbols,
        each with a unique ID. This approach allows you to:
      </p>

      <ul>
        <li>Reduce HTTP requests by combining multiple SVG files into one</li>
        <li>Reuse the same icons multiple times without code duplication</li>
        <li>Easily manage and maintain your SVG assets in one place</li>
      </ul>

      <h2>How to Use a Spritemap</h2>

      <h3>1. Include the Spritemap</h3>

      <p>
        First, include the spritemap in your HTML. You can either inline it or load
        it externally:
      </p>

      <pre>
        <code className="language-html">
          {`<!-- Option 1: Inline -->
<div style="display: none">
  <!-- Paste your spritemap here -->
</div>

<!-- Option 2: External file -->
<object id="svg-sprites" type="image/svg+xml" data="spritemap.svg">
  Your browser does not support SVG
</object>`}
        </code>
      </pre>

      <h3>2. Use the Symbols</h3>

      <p>Reference symbols using the SVG <code>{'<use>'}</code> element:</p>

      <pre>
        <code className="language-html">
          {`<svg>
  <use href="#icon-id" />
</svg>`}
        </code>
      </pre>

      <h2>Best Practices</h2>

      <ul>
        <li>Use meaningful and consistent IDs for your symbols</li>
        <li>Optimize your SVGs before adding them to the spritemap</li>
        <li>Keep the viewBox attribute on your symbols for proper scaling</li>
        <li>Consider using tools like SVGO to optimize your SVGs</li>
        <li>Remove unnecessary attributes and inline styles from your SVGs</li>
      </ul>

      <h2>Example Usage</h2>

      <pre>
        <code className="language-html">
          {`<!-- HTML -->
<svg class="icon" aria-hidden="true">
  <use href="#icon-menu" />
</svg>

<!-- CSS -->
.icon { width: 24px; height: 24px; fill: currentColor; }`}
        </code>
      </pre>

      <p>
        The <code>currentColor</code> value allows the icon to inherit its color
        from its parent element, making it easy to change the icon color using CSS.
      </p>
    </div>
  );
};

export default Guidelines;
