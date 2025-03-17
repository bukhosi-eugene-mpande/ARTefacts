import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const componentName = args[0];

if (!componentName) {
  console.error(
    '❌ Please provide a component name. Example: npm run create-component Button'
  );
  process.exit(1);
}

const componentsDir = path.join('components', componentName);

if (fs.existsSync(componentsDir)) {
  console.error(`❌ Component "${componentName}" already exists!`);
  process.exit(1);
}

fs.mkdirSync(componentsDir, { recursive: true });

// Create Component.tsx
const componentContent = `import React from 'react';

interface ${componentName}Props {
  children?: React.ReactNode;
}

export default function ${componentName}({ children }: ${componentName}Props) {
  return <div className="p-4 border rounded">{children}</div>;
}
`;

fs.writeFileSync(
  path.join(componentsDir, `${componentName}.tsx`),
  componentContent
);

// Create index.ts (for easier imports)
const indexContent = `export { default } from './${componentName}';`;

fs.writeFileSync(path.join(componentsDir, 'index.ts'), indexContent);

console.log(`✅ Component "${componentName}" created successfully!`);
