export const basePath = process.env.NODE_ENV === "production" ? "/shoplink365" : "";
export function withBase(path: string) {
  return `${basePath}${path}`;
}
