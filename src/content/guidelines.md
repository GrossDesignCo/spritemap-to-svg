# What is an SVG Spritemap?

An SVG spritemap is a single SVG file that contains multiple SVG symbols, each with a unique ID.
This approach allows you to:

- Reduce HTTP requests by combining multiple SVG files into one
- Reuse the same icons multiple times without code duplication
- Easily manage and maintain your SVG assets in one place

## How to Use a Spritemap

### 1. Include the Spritemap

First, include the spritemap in your HTML. You can either inline it or load it externally:

```html
<!-- Option 1: Inline -->
<div style="display: none">
  <!-- Paste your spritemap here -->
</div>

<!-- Option 2: External file -->
<object id="svg-sprites" type="image/svg+xml" data="spritemap.svg">
  Your browser does not support SVG
</object>
```

### 2. Use the Symbols

Reference symbols using the SVG `<use>` element:

```html
<svg>
  <use href="#icon-id" />
</svg>
```

## Best Practices

- Use meaningful and consistent IDs for your symbols
- Optimize your SVGs before adding them to the spritemap
- Keep the viewBox attribute on your symbols for proper scaling
- Consider using tools like SVGO to optimize your SVGs
- Remove unnecessary attributes and inline styles from your SVGs

## Example Usage

```html
<!-- HTML -->
<svg class="icon" aria-hidden="true">
  <use href="#icon-menu" />
</svg>

<!-- CSS -->
.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}
```

The `currentColor` value allows the icon to inherit its color from its parent element, making it easy to change the icon color using CSS. 