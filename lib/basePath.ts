// Empty because the site is served from the root of shoplink365.com (a custom domain),
// not from a /reponame/ subpath. Only set this back to "/shoplink365" if you ever
// deploy WITHOUT a custom domain, straight to the github.io/shoplink365/ URL.
export const basePath = "";
export function withBase(path: string) {
  return `${basePath}${path}`;
}
