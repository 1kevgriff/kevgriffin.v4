#!/usr/bin/env python3
import os
import re
import yaml
from datetime import datetime
import glob

def extract_frontmatter(filepath):
    """Extract YAML frontmatter from markdown file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
            
        # Check if file starts with frontmatter
        if not content.startswith('---'):
            return None, content
            
        # Split on frontmatter delimiters
        parts = content.split('---', 2)
        if len(parts) < 3:
            return None, content
            
        frontmatter_str = parts[1].strip()
        body = parts[2].strip() if len(parts) > 2 else ''
        
        # Parse YAML
        try:
            frontmatter = yaml.safe_load(frontmatter_str)
            return frontmatter, body
        except yaml.YAMLError:
            return None, content
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return None, ""

def create_filename_safe(title, date_str):
    """Create a filename-safe version of title"""
    # Remove special characters and replace spaces with hyphens
    safe_title = re.sub(r'[^\w\s-]', '', title)
    safe_title = re.sub(r'[-\s]+', '-', safe_title).strip('-')
    safe_title = safe_title.lower()
    
    # Parse date and format as YYYY-MM-DD
    try:
        if isinstance(date_str, str):
            # Try various date formats
            for fmt in ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d', '%Y-%m-%d %H:%M:%S.%f']:
                try:
                    date_obj = datetime.strptime(date_str, fmt)
                    break
                except ValueError:
                    continue
            else:
                # Try parsing with dateutil if available
                try:
                    from dateutil.parser import parse
                    date_obj = parse(date_str)
                except:
                    return None
        else:
            date_obj = date_str
            
        date_prefix = date_obj.strftime('%Y-%m-%d')
        return f"{date_prefix}-{safe_title}.md"
        
    except Exception as e:
        print(f"Error creating filename for title '{title}', date '{date_str}': {e}")
        return None

def analyze_blog_posts():
    blog_dir = "D:/repos/kevgriffin.v4/blog"
    
    # Get all markdown files
    md_files = []
    for file in os.listdir(blog_dir):
        if file.endswith('.md'):
            md_files.append(file)
    
    print(f"Found {len(md_files)} markdown files")
    
    analysis = {
        'missing_description': [],
        'missing_summary': [],
        'missing_tags': [],
        'has_excerpt_needs_summary': [],
        'has_updated_field': [],
        'needs_renaming': [],
        'good_examples': [],
        'errors': []
    }
    
    for filename in md_files:
        filepath = os.path.join(blog_dir, filename)
        frontmatter, body = extract_frontmatter(filepath)
        
        if frontmatter is None:
            analysis['errors'].append(f"{filename}: Could not parse frontmatter")
            continue
            
        # Check for required fields
        title = frontmatter.get('title', 'Unknown')
        date = frontmatter.get('date')
        
        if not frontmatter.get('description'):
            analysis['missing_description'].append(filename)
            
        if not frontmatter.get('summary'):
            analysis['missing_summary'].append(filename)
            
        if not frontmatter.get('tags'):
            analysis['missing_tags'].append(filename)
            
        if frontmatter.get('excerpt') and not frontmatter.get('summary'):
            analysis['has_excerpt_needs_summary'].append(filename)
            
        if frontmatter.get('updated'):
            analysis['has_updated_field'].append(filename)
            
        # Check if filename needs standardization
        if date:
            proposed_filename = create_filename_safe(title, date)
            if proposed_filename and proposed_filename != filename:
                analysis['needs_renaming'].append({
                    'current': filename,
                    'proposed': proposed_filename,
                    'title': title,
                    'date': str(date)
                })
        else:
            analysis['errors'].append(f"{filename}: No date field found")
            
        # Check if it's a good example (has all required fields)
        if (frontmatter.get('description') and 
            frontmatter.get('summary') and 
            frontmatter.get('tags') and
            not frontmatter.get('updated') and
            not frontmatter.get('excerpt')):
            analysis['good_examples'].append(filename)
    
    return analysis

if __name__ == "__main__":
    results = analyze_blog_posts()
    
    print("\n=== ANALYSIS RESULTS ===\n")
    
    print(f"Posts missing description: {len(results['missing_description'])}")
    for post in results['missing_description'][:5]:  # Show first 5
        print(f"  - {post}")
    if len(results['missing_description']) > 5:
        print(f"  ... and {len(results['missing_description']) - 5} more")
    
    print(f"\nPosts missing summary: {len(results['missing_summary'])}")
    for post in results['missing_summary'][:5]:
        print(f"  - {post}")
    if len(results['missing_summary']) > 5:
        print(f"  ... and {len(results['missing_summary']) - 5} more")
        
    print(f"\nPosts missing tags: {len(results['missing_tags'])}")
    for post in results['missing_tags'][:5]:
        print(f"  - {post}")
    if len(results['missing_tags']) > 5:
        print(f"  ... and {len(results['missing_tags']) - 5} more")
    
    print(f"\nPosts with excerpt (need summary conversion): {len(results['has_excerpt_needs_summary'])}")
    for post in results['has_excerpt_needs_summary']:
        print(f"  - {post}")
        
    print(f"\nPosts with 'updated' field to remove: {len(results['has_updated_field'])}")
    for post in results['has_updated_field'][:5]:
        print(f"  - {post}")
    if len(results['has_updated_field']) > 5:
        print(f"  ... and {len(results['has_updated_field']) - 5} more")
    
    print(f"\nPosts needing filename changes: {len(results['needs_renaming'])}")
    for item in results['needs_renaming'][:5]:
        print(f"  - {item['current']} -> {item['proposed']}")
    if len(results['needs_renaming']) > 5:
        print(f"  ... and {len(results['needs_renaming']) - 5} more")
        
    print(f"\nGood examples (all required fields): {len(results['good_examples'])}")
    for post in results['good_examples']:
        print(f"  - {post}")
        
    print(f"\nErrors: {len(results['errors'])}")
    for error in results['errors']:
        print(f"  - {error}")