const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BLOG_DIR = path.join(process.cwd(), 'blog');

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Ask for post title
rl.question('Enter the title of your blog post: ', (title) => {
  // Convert title to kebab-case for filename
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const filename = `${today}-${slug}.md`;
  const filepath = path.join(BLOG_DIR, filename);

  // Check if file already exists
  if (fs.existsSync(filepath)) {
    console.error(`\nError: A file named "${filename}" already exists.`);
    console.error('Please choose a different title or delete the existing file.');
    rl.close();
    return;
  }

  // Create frontmatter and initial content
  const content = `---
title: "${title}"
date: "${today}"
description: ""
tags: []
---

# ${title}

`;

  // Write the file with error handling
  try {
    fs.writeFileSync(filepath, content);
    console.log(`\nCreated new blog post: ${filename}`);
    console.log(`Location: ${filepath}`);
  } catch (error) {
    console.error('\nError creating blog post:');
    console.error(error.message);
  }
  rl.close();
}); 