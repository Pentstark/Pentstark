// Utility to read and parse markdown blog content
export const readMarkdownFile = async (filename) => {
  try {
    // In a real application, you would fetch from a server or read from a file system
    // For now, we'll simulate reading markdown content
    const response = await fetch(`/src/data/blogs/${filename}`);
    if (!response.ok) {
      throw new Error('Failed to load markdown file');
    }
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
};

// Parse markdown content (simplified version for now)
// In a real app, you would use a proper markdown parser like remark
export const parseMarkdown = (markdown) => {
  if (!markdown) return null;

  // Simple parsing for demonstration
  // In production, use react-markdown with remark-gfm and rehype-highlight
  return {
    content: markdown,
    // Extract basic metadata if needed
    title: extractTitle(markdown),
    description: extractDescription(markdown)
  };
};

const extractTitle = (markdown) => {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : '';
};

const extractDescription = (markdown) => {
  const match = markdown.match(/^##\s+Introduction\s*\n\n(.+?)(?:\n\n|$)/s);
  return match ? match[1].trim() : '';
};

// For now, we'll use a simple approach to load markdown content
// In the future, you can integrate with react-markdown
export const getBlogContent = async (slug) => {
  const filename = `${slug}.md`;
  const markdown = await readMarkdownFile(filename);
  return parseMarkdown(markdown);
};
