import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const pageName = args[0];

if (!pageName) {
  console.error(
    '❌ Please provide a page name. Example: npm run create-page about'
  );
  process.exit(1);
}

const pageDir = path.join('app', pageName);

if (fs.existsSync(pageDir)) {
  console.error(`❌ Page "${pageName}" already exists!`);
  process.exit(1);
}

fs.mkdirSync(pageDir, { recursive: true });

// Capitalize function
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Create layout.tsx
const layoutContent = `import { ReactNode } from 'react';

export default function ${capitalize(pageName)}Layout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col px-4 w-full gap-4 md:py-10">
      <h1>${capitalize(pageName)}</h1>
      {children}
    </section>
  );
}
`;

fs.writeFileSync(path.join(pageDir, 'layout.tsx'), layoutContent);

// Create page.tsx
const pageContent = `export default function ${capitalize(pageName)}Page() {
  return (
    <div>
      <p>Welcome to the ${pageName} page!</p>
    </div>
  );
}
`;

fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);

console.log(`✅ Page "${pageName}" created successfully!`);
