/**
 * Resolves static asset paths accurately across all deployment contexts:
 * - Local dev (/)
 * - Custom domain GitHub Pages (/)
 * - Project subpath GitHub Pages (e.g. /my-repo-name/)
 * - Base-relative builds (./)
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  // If already absolute URL (http/https) or data/blob URI, return as-is
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Remove leading './' or '/'
  const cleanPath = path.replace(/^\.?\//, '');
  const base = import.meta.env.BASE_URL || './';

  // If base ends with '/', ensure smooth join
  if (base.endsWith('/')) {
    return `${base}${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
}
