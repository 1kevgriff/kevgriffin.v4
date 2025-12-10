const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to process and migrate a markdown file
function migrateMarkdownFile(sourcePath, targetPath) {
  const content = fs.readFileSync(sourcePath, 'utf8');
  const { data, content: markdown } = matter(content);

  // Process frontmatter to ensure compatibility
  const processedData = {
    ...data,
    // Ensure date is in proper format - rename 'date' to 'pubDate' for Astro
    pubDate: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    // Add default values for required fields if missing
    description: data.description || data.summary || '',
    summary: data.summary || data.description || '',
    tags: data.tags || [],
    categories: data.categories || [],
    draft: data.draft || false,
  };

  // Remove the old 'date' field if it exists
  delete processedData.date;

  // If there's an updatedDate, ensure it's in proper format
  if (data.updatedDate) {
    processedData.updatedDate = new Date(data.updatedDate).toISOString();
  }

  // Reconstruct the file with processed frontmatter
  const newContent = matter.stringify(markdown, processedData);

  // Write to target location
  fs.writeFileSync(targetPath, newContent, 'utf8');
  console.log(`Migrated: ${path.basename(sourcePath)} → ${targetPath}`);
}

// Migrate blog posts
console.log('Starting blog post migration...');
const blogSourceDir = './blog';
const blogTargetDir = './kevgriffin-astro/src/content/blog';

ensureDirectoryExists(blogTargetDir);

const blogFiles = fs.readdirSync(blogSourceDir).filter(file => file.endsWith('.md'));
console.log(`Found ${blogFiles.length} blog posts to migrate`);

blogFiles.forEach(file => {
  const sourcePath = path.join(blogSourceDir, file);
  const targetPath = path.join(blogTargetDir, file);
  try {
    migrateMarkdownFile(sourcePath, targetPath);
  } catch (error) {
    console.error(`Error migrating ${file}:`, error.message);
  }
});

// Migrate documentation
console.log('\nStarting documentation migration...');
const docsSourceDir = './docs';
const docsTargetDir = './kevgriffin-astro/src/content/docs';

ensureDirectoryExists(docsTargetDir);

if (fs.existsSync(docsSourceDir)) {
  const docsFiles = fs.readdirSync(docsSourceDir).filter(file => file.endsWith('.md'));
  console.log(`Found ${docsFiles.length} documentation files to migrate`);

  docsFiles.forEach(file => {
    const sourcePath = path.join(docsSourceDir, file);
    const targetPath = path.join(docsTargetDir, file);
    try {
      migrateMarkdownFile(sourcePath, targetPath);
    } catch (error) {
      console.error(`Error migrating ${file}:`, error.message);
    }
  });
} else {
  console.log('No docs directory found');
}

console.log('\nContent migration complete!');