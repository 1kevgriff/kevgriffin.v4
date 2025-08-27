#!/usr/bin/env node

/**
 * Simple Astro Migration Preparation Script (No external dependencies)
 * 
 * This script prepares blog articles for migration from Gridsome to Astro by:
 * 1. Standardizing front matter format
 * 2. Converting dates to ISO format  
 * 3. Adding missing required fields
 * 4. Generating rename commands for files
 */

const fs = require('fs');
const path = require('path');

// Simple YAML parser for front matter (basic implementation)
function parseFrontMatter(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
        return { frontMatter: {}, content: content, hasFrontMatter: false };
    }
    
    const frontMatterText = match[1];
    const bodyContent = match[2];
    
    // Simple YAML parsing (handles basic cases)
    const frontMatter = {};
    const lines = frontMatterText.split('\n');
    
    let currentKey = null;
    let currentArray = null;
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (!trimmedLine) continue;
        
        if (trimmedLine.startsWith('- ')) {
            // Array item
            if (currentArray && currentKey) {
                const item = trimmedLine.substring(2).trim();
                frontMatter[currentKey].push(item);
            }
        } else if (trimmedLine.includes(':')) {
            // Key-value pair
            const colonIndex = trimmedLine.indexOf(':');
            const key = trimmedLine.substring(0, colonIndex).trim();
            const value = trimmedLine.substring(colonIndex + 1).trim();
            
            currentKey = key;
            currentArray = null;
            
            if (value) {
                // Has value on same line
                if (value.startsWith('"') && value.endsWith('"')) {
                    frontMatter[key] = value.substring(1, value.length - 1);
                } else if (value.startsWith("'") && value.endsWith("'")) {
                    frontMatter[key] = value.substring(1, value.length - 1);
                } else {
                    frontMatter[key] = value;
                }
            } else {
                // Might be start of array
                frontMatter[key] = [];
                currentArray = frontMatter[key];
            }
        }
    }
    
    return { frontMatter, content: bodyContent, hasFrontMatter: true };
}

// Helper function to convert date to ISO format
function toISODate(dateStr) {
    if (!dateStr) return null;
    
    // Handle various date formats
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        console.warn(`Invalid date: ${dateStr}`);
        return dateStr; // Return original if can't parse
    }
    
    return date.toISOString().replace('.000Z', 'Z');
}

// Helper function to generate slug from title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/['"]/g, '') // Remove quotes
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Trim hyphens from start/end
}

// Helper function to generate filename from date and title
function generateFilename(date, title) {
    if (!date || !title) return null;
    
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return null;
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    const cleanTitle = title.replace(/['"]/g, '');
    const slug = generateSlug(cleanTitle);
    return `${year}${month}${day}-${slug}.md`;
}

// Build front matter string
function buildFrontMatter(data) {
    let yaml = '---\n';
    
    // Title (always quoted)
    if (data.title) {
        yaml += `title: "${data.title.replace(/"/g, '\\"')}"\n`;
    }
    
    // Date (ISO format)
    if (data.date) {
        yaml += `date: ${data.date}\n`;
    }
    
    // Permalink
    if (data.permalink) {
        yaml += `permalink: ${data.permalink}\n`;
    }
    
    // Description (quoted)
    if (data.description) {
        yaml += `description: "${data.description.replace(/"/g, '\\"')}"\n`;
    }
    
    // Summary (quoted)
    if (data.summary) {
        yaml += `summary: "${data.summary.replace(/"/g, '\\"')}"\n`;
    }
    
    // Tags (array)
    if (data.tags && data.tags.length > 0) {
        yaml += 'tags:\n';
        for (const tag of data.tags) {
            yaml += `  - ${tag}\n`;
        }
    }
    
    // Categories (array)
    if (data.categories && data.categories.length > 0) {
        yaml += 'categories:\n';
        if (Array.isArray(data.categories)) {
            for (const category of data.categories) {
                yaml += `  - ${category}\n`;
            }
        } else {
            yaml += `  - ${data.categories}\n`;
        }
    }
    
    // Excerpt (quoted)
    if (data.excerpt) {
        yaml += `excerpt: "${data.excerpt.replace(/"/g, '\\"')}"\n`;
    }
    
    yaml += '---\n';
    return yaml;
}

// Standardize front matter
function standardizeFrontMatter(frontMatter, filename) {
    const standardized = {};
    
    // Title (required, cleaned)
    let title = frontMatter.title || filename.replace('.md', '');
    title = title.replace(/^["']|["']$/g, ''); // Remove quotes
    standardized.title = title;
    
    // Date (required, ISO format)
    if (frontMatter.date) {
        standardized.date = toISODate(frontMatter.date);
    } else if (frontMatter.updated) {
        standardized.date = toISODate(frontMatter.updated);
    }
    
    // Permalink (keep existing or generate from title)
    if (frontMatter.permalink) {
        standardized.permalink = frontMatter.permalink;
    } else {
        standardized.permalink = generateSlug(title);
    }
    
    // Description (for SEO)
    if (frontMatter.description) {
        let desc = frontMatter.description.replace(/^["']|["']$/g, '');
        standardized.description = desc;
    } else if (frontMatter.summary && frontMatter.summary !== 'Lorem') {
        let desc = frontMatter.summary.replace(/^["']|["']$/g, '');
        standardized.description = desc;
    } else {
        standardized.description = `Learn more about ${title.toLowerCase()}.`;
    }
    
    // Summary (keep existing or use description)
    if (frontMatter.summary && frontMatter.summary !== 'Lorem') {
        let summary = frontMatter.summary.replace(/^["']|["']$/g, '');
        standardized.summary = summary;
    } else {
        standardized.summary = standardized.description;
    }
    
    // Tags (ensure array format, clean up)
    standardized.tags = [];
    if (frontMatter.tags && Array.isArray(frontMatter.tags)) {
        standardized.tags = frontMatter.tags.map(tag => 
            typeof tag === 'string' ? tag.trim() : String(tag).trim()
        );
    }
    
    // Generate basic tags if none exist
    if (standardized.tags.length === 0) {
        if (frontMatter.categories) {
            if (Array.isArray(frontMatter.categories)) {
                standardized.tags = [...frontMatter.categories];
            } else if (typeof frontMatter.categories === 'string') {
                standardized.tags = [frontMatter.categories];
            }
        }
    }
    
    // Categories (keep existing)
    if (frontMatter.categories) {
        standardized.categories = frontMatter.categories;
    }
    
    // Excerpt (keep if exists)
    if (frontMatter.excerpt) {
        let excerpt = frontMatter.excerpt.replace(/^["']|["']$/g, '');
        standardized.excerpt = excerpt;
    }
    
    return standardized;
}

// Process a single file
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const { frontMatter, content: bodyContent, hasFrontMatter } = parseFrontMatter(content);
        
        if (!hasFrontMatter) {
            console.log(`Skipping ${filePath} - no front matter found`);
            return { processed: false };
        }
        
        const filename = path.basename(filePath);
        const standardized = standardizeFrontMatter(frontMatter, filename);
        
        // Generate new filename if needed
        let newFilename = filename;
        if (!filename.match(/^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/) && standardized.date && standardized.title) {
            const generated = generateFilename(standardized.date, standardized.title);
            if (generated) {
                newFilename = generated;
            }
        }
        
        // Build new content
        const newFrontMatter = buildFrontMatter(standardized);
        const newContent = `${newFrontMatter}\n${bodyContent}`;
        
        return {
            processed: true,
            originalPath: filePath,
            newContent,
            newFilename,
            needsRename: newFilename !== filename,
            changes: {
                dateStandardized: frontMatter.date !== standardized.date,
                descriptionAdded: !frontMatter.description,
                tagsAdded: (!frontMatter.tags || frontMatter.tags.length === 0) && standardized.tags.length > 0,
                summaryFixed: frontMatter.summary === 'Lorem'
            }
        };
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return { processed: false, error: error.message };
    }
}

// Main execution
function main() {
    const blogDir = path.join(__dirname, 'blog');
    
    if (!fs.existsSync(blogDir)) {
        console.error('Blog directory not found');
        return;
    }
    
    const files = fs.readdirSync(blogDir)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(blogDir, file));
    
    console.log(`Found ${files.length} markdown files to process`);
    
    const results = {
        processed: 0,
        renamed: 0,
        errors: 0,
        changes: {
            dateStandardized: 0,
            descriptionAdded: 0,
            tagsAdded: 0,
            summaryFixed: 0
        }
    };
    
    const renames = [];
    
    files.forEach(filePath => {
        const result = processFile(filePath);
        
        if (!result.processed) {
            results.errors++;
            return;
        }
        
        results.processed++;
        
        // Track changes
        Object.keys(result.changes).forEach(key => {
            if (result.changes[key]) {
                results.changes[key]++;
            }
        });
        
        // Write updated content
        fs.writeFileSync(filePath, result.newContent);
        
        // Track renames needed
        if (result.needsRename) {
            const fromName = path.basename(filePath);
            const toName = result.newFilename;
            renames.push({ from: fromName, to: toName });
            results.renamed++;
        }
    });
    
    // Output results
    console.log('\n=== PROCESSING COMPLETE ===');
    console.log(`Files processed: ${results.processed}`);
    console.log(`Files with errors: ${results.errors}`);
    console.log(`Files needing rename: ${results.renamed}`);
    console.log('\nChanges made:');
    console.log(`  Dates standardized: ${results.changes.dateStandardized}`);
    console.log(`  Descriptions added: ${results.changes.descriptionAdded}`);
    console.log(`  Tags added: ${results.changes.tagsAdded}`);
    console.log(`  Lorem summaries fixed: ${results.changes.summaryFixed}`);
    
    // Output rename commands
    if (renames.length > 0) {
        console.log('\n=== FILE RENAMES NEEDED ===');
        console.log('Run these commands in the blog/ directory:');
        renames.forEach(rename => {
            console.log(`git mv "${rename.from}" "${rename.to}"`);
        });
    }
    
    console.log('\n=== NEXT STEPS ===');
    console.log('1. Review the changes made to the files');
    console.log('2. Run the git mv commands above to rename files');
    console.log('3. Test the Gridsome build: npm run build');
    console.log('4. Commit the changes when ready');
}

if (require.main === module) {
    main();
}

module.exports = { processFile, standardizeFrontMatter, generateFilename };