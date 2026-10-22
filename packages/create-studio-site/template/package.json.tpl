{
  "name": "@sites/__NAME__",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@mdx-js/loader": "3.1.1",
    "@next/mdx": "15.5.28",
    "@studio/kit": "workspace:*",
    "next": "15.5.28",
    "react": "19.1.10",
    "react-dom": "19.1.10"
  },
  "devDependencies": {
    "@studio/config": "workspace:*",
    "@tailwindcss/postcss": "4.3.3",
    "@types/mdx": "2.0.13",
    "@types/node": "22.20.5",
    "@types/react": "19.3.0",
    "@types/react-dom": "19.3.0",
    "eslint": "9.39.5",
    "tailwindcss": "4.3.3",
    "typescript": "5.9.3"
  }
}
