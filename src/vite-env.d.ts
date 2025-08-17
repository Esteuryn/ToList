/// <reference types="vite/client" />
/// <reference types="vitest" />

declare module '*.css' {
  const content: string
  export default content
}