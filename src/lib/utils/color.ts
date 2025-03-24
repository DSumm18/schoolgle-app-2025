export function getContrastColor(hexColor: string): string {
  // Remove the hash if it exists
  const color = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for light colors and white for dark colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}