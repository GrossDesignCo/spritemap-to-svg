/**
 * Loads markdown content from a file in the public directory.
 * 
 * @param path - The path to the markdown file relative to the public directory
 * @returns A promise that resolves to the markdown content as a string
 * @throws Error if the markdown file cannot be loaded
 */
export const loadMarkdownContent = async (path: string): Promise<string> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load markdown content from ${path}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading markdown content:', error);
    throw error;
  }
}; 