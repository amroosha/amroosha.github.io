/**
 * Regenerates src/lib/brand-icons.ts from simple-icons.
 *
 *   npm run icons:sync
 *
 * Brand names map to simple-icons slugs. Add a skill here when a new brand
 * mark is available upstream; anything not listed falls back to the
 * hand-drawn marks in src/components/SkillIcon.tsx.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** display name -> simple-icons slug */
const brands = {
  PyTorch: 'pytorch',
  TensorFlow: 'tensorflow',
  'Scikit-learn': 'scikitlearn',
  OpenCV: 'opencv',
  YOLO: 'yolo',
  ONNX: 'onnx',
  LangChain: 'langchain',
  LangGraph: 'langgraph',
  Ollama: 'ollama',
  MLflow: 'mlflow',
  Docker: 'docker',
  NumPy: 'numpy',
  Pandas: 'pandas',
  PostgreSQL: 'postgresql',
  Python: 'python',
  'C++': 'cplusplus',
  Dart: 'dart',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
}

const entries = Object.entries(brands).map(([name, slug]) => {
  const file = resolve(root, 'node_modules/simple-icons/icons', `${slug}.svg`)
  const svg = readFileSync(file, 'utf8')
  const paths = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((match) => match[1])
  if (paths.length !== 1) {
    throw new Error(`${slug}: expected exactly one <path>, found ${paths.length}`)
  }
  return [name, paths[0]]
})

const body = entries
  .map(([name, d]) => `  ${JSON.stringify(name)}: ${JSON.stringify(d)},`)
  .join('\n')

const output = `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Brand marks from simple-icons (CC0-1.0), https://simpleicons.org
 * Regenerate with \`npm run icons:sync\` after bumping simple-icons.
 *
 * Every path is a single 24 x 24 glyph meant to be filled with currentColor.
 * Skills without an upstream brand mark live in src/components/SkillIcon.tsx.
 */
export const brandIcons = {
${body}
} as const

export type BrandSkill = keyof typeof brandIcons
`

writeFileSync(resolve(root, 'src/lib/brand-icons.ts'), output)
console.log(`wrote src/lib/brand-icons.ts (${entries.length} marks)`)
