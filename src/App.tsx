import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import SpriteMapToSvg from './components/SpriteMapToSvg';
import SvgToSpriteMap from './components/SvgToSpriteMap';
import Guidelines from './components/Guidelines';
import './App.css';

const TABS = {
  'spritemap-to-svg': {
    label: 'Spritemap to SVGs',
    component: SpriteMapToSvg
  },
  'svg-to-spritemap': {
    label: 'SVGs to Spritemap',
    component: SvgToSpriteMap
  },
  'guidelines': {
    label: 'Guidelines',
    component: Guidelines
  }
} as const;

type TabKey = keyof typeof TABS;

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1 className="title">
          SVG Spritemap Tool
        </h1>
        
        <Tabs.Root defaultValue="spritemap-to-svg" className="tabs">
          <Tabs.List 
            className="tabs-list"
            aria-label="Manage your SVG spritemaps"
          >
            {Object.entries(TABS).map(([key, { label }]) => (
              <Tabs.Trigger
                key={key}
                value={key}
                className="tab-trigger"
              >
                {label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="tab-content">
            {Object.entries(TABS).map(([key, { component: Component }]) => (
              <Tabs.Content key={key} value={key} className="tab-panel">
                <Component />
              </Tabs.Content>
            ))}
          </div>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default App;
