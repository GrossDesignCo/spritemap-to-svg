import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import SpriteMapToSvg from './components/SpriteMapToSvg';
import SvgToSpriteMap from './components/SvgToSpriteMap';
import Guidelines from './components/Guidelines';

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
    <div className="min-h-screen bg-bg-primary p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-8">
          SVG Spritemap Tool
        </h1>
        
        <Tabs.Root defaultValue="spritemap-to-svg" className="mb-8">
          <Tabs.List 
            className="flex space-x-1 rounded-lg bg-bg-secondary/50 p-1"
            aria-label="Manage your SVG spritemaps"
          >
            {Object.entries(TABS).map(([key, { label }]) => (
              <Tabs.Trigger
                key={key}
                value={key}
                className={`
                  flex-1 px-4 py-2 rounded-md text-sm font-medium
                  data-[state=inactive]:text-text-secondary
                  data-[state=active]:bg-bg-secondary
                  data-[state=active]:text-accent
                  data-[state=active]:shadow-sm
                  hover:text-accent
                  focus:outline-none focus:ring-2 focus:ring-accent/50
                  transition-all
                `}
              >
                {label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="bg-bg-secondary rounded-lg shadow-lg p-6 mt-4">
            {Object.entries(TABS).map(([key, { component: Component }]) => (
              <Tabs.Content key={key} value={key} className="outline-none">
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
