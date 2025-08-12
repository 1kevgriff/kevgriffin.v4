#!/usr/bin/env python3
import os
import re
import yaml
from datetime import datetime
import json

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

def detailed_analysis():
    blog_dir = "D:/repos/kevgriffin.v4/blog"
    
    # Get all markdown files
    md_files = []
    for file in os.listdir(blog_dir):
        if file.endswith('.md'):
            md_files.append(file)
    
    print(f"COMPREHENSIVE BLOG POST ANALYSIS")
    print(f"================================\n")
    print(f"Total files analyzed: {len(md_files)}\n")
    
    # Categorize all posts
    posts_by_category = {
        'missing_description': [],
        'missing_summary': [],
        'missing_tags': [],
        'has_excerpt_needs_conversion': [],
        'has_updated_field_to_remove': [],
        'needs_renaming': [],
        'perfect_posts': [],
        'date_in_filename': [],
        'no_date_in_filename': []
    }
    
    for filename in md_files:
        filepath = os.path.join(blog_dir, filename)
        frontmatter, body = extract_frontmatter(filepath)
        
        if frontmatter is None:
            continue
            
        post_info = {
            'filename': filename,
            'title': frontmatter.get('title', 'Unknown'),
            'date': frontmatter.get('date'),
            'has_description': bool(frontmatter.get('description')),
            'has_summary': bool(frontmatter.get('summary')),
            'has_tags': bool(frontmatter.get('tags')),
            'has_excerpt': bool(frontmatter.get('excerpt')),
            'has_updated': bool(frontmatter.get('updated')),
            'categories': frontmatter.get('categories', [])
        }
        
        # Check filename pattern
        if re.match(r'^\d{4}-\d{2}-\d{2}', filename):
            posts_by_category['date_in_filename'].append(post_info)
        else:
            posts_by_category['no_date_in_filename'].append(post_info)
        
        # Check what's missing or needs fixing
        if not post_info['has_description']:
            posts_by_category['missing_description'].append(post_info)
            
        if not post_info['has_summary']:
            posts_by_category['missing_summary'].append(post_info)
            
        if not post_info['has_tags']:
            posts_by_category['missing_tags'].append(post_info)
            
        if post_info['has_excerpt'] and not post_info['has_summary']:
            posts_by_category['has_excerpt_needs_conversion'].append(post_info)
            
        if post_info['has_updated']:
            posts_by_category['has_updated_field_to_remove'].append(post_info)
            
        # Check if filename needs standardization
        if post_info['date']:
            proposed_filename = create_filename_safe(post_info['title'], post_info['date'])
            if proposed_filename and proposed_filename != filename:
                post_info['proposed_filename'] = proposed_filename
                posts_by_category['needs_renaming'].append(post_info)
        
        # Check if it's perfect
        if (post_info['has_description'] and 
            post_info['has_summary'] and 
            post_info['has_tags'] and
            not post_info['has_updated'] and
            not post_info['has_excerpt']):
            posts_by_category['perfect_posts'].append(post_info)
    
    # Print detailed report
    print("## FRONTMATTER ISSUES\n")
    
    print(f"### Missing Description Field ({len(posts_by_category['missing_description'])} posts)")
    print("All posts except one are missing the 'description' field:")
    for post in posts_by_category['missing_description']:
        if post not in posts_by_category['perfect_posts']:  # Don't list perfect posts
            print(f"  - {post['filename']}")
    print()
    
    print(f"### Missing Summary Field ({len(posts_by_category['missing_summary'])} posts)")
    for post in posts_by_category['missing_summary']:
        print(f"  - {post['filename']} ('{post['title']}')")
    print()
    
    print(f"### Missing Tags Field ({len(posts_by_category['missing_tags'])} posts)")
    print("Most posts are missing tags:")
    for i, post in enumerate(posts_by_category['missing_tags'][:10]):
        print(f"  - {post['filename']}")
    if len(posts_by_category['missing_tags']) > 10:
        print(f"  ... and {len(posts_by_category['missing_tags']) - 10} more")
    print()
    
    print(f"### Posts with 'excerpt' that need conversion to 'summary' ({len(posts_by_category['has_excerpt_needs_conversion'])} posts)")
    for post in posts_by_category['has_excerpt_needs_conversion']:
        print(f"  - {post['filename']} ('{post['title']}')")
    print()
    
    print(f"### Posts with 'updated' field to remove ({len(posts_by_category['has_updated_field_to_remove'])} posts)")
    for post in posts_by_category['has_updated_field_to_remove']:
        print(f"  - {post['filename']} ('{post['title']}')")
    print()
    
    print("## FILENAME STANDARDIZATION\n")
    
    print(f"### Posts with dates in filename ({len(posts_by_category['date_in_filename'])} posts)")
    print("These follow a date pattern but may need format standardization.")
    print()
    
    print(f"### Posts without dates in filename ({len(posts_by_category['no_date_in_filename'])} posts)")
    print("These need complete filename restructuring:")
    for post in posts_by_category['no_date_in_filename']:
        proposed = create_filename_safe(post['title'], post['date']) if post['date'] else 'NO-DATE'
        print(f"  - {post['filename']} -> {proposed}")
    print()
    
    print(f"### All filename changes needed ({len(posts_by_category['needs_renaming'])} posts)")
    print("Current -> Proposed mapping:")
    for post in posts_by_category['needs_renaming'][:15]:
        print(f"  - {post['filename']} -> {post['proposed_filename']}")
    if len(posts_by_category['needs_renaming']) > 15:
        print(f"  ... and {len(posts_by_category['needs_renaming']) - 15} more")
    print()
    
    print("## SUMMARY\n")
    print(f"Perfect posts (all fields correct): {len(posts_by_category['perfect_posts'])}")
    for post in posts_by_category['perfect_posts']:
        print(f"  - {post['filename']}")
    print()
    
    print("## ACTION PLAN\n")
    print("### Phase 1: Frontmatter Standardization")
    print(f"1. Add 'description' field to {len(posts_by_category['missing_description'])} posts")
    print(f"2. Add 'summary' field to {len(posts_by_category['missing_summary'])} posts") 
    print(f"3. Convert 'excerpt' to 'summary' in {len(posts_by_category['has_excerpt_needs_conversion'])} posts")
    print(f"4. Add 'tags' field to {len(posts_by_category['missing_tags'])} posts")
    print(f"5. Remove 'updated' field from {len(posts_by_category['has_updated_field_to_remove'])} posts")
    print()
    print("### Phase 2: Filename Standardization")
    print(f"1. Rename {len(posts_by_category['needs_renaming'])} posts to YYYY-MM-DD-{{title}}.md format")
    print()
    print(f"### Total posts requiring changes: {len(md_files) - len(posts_by_category['perfect_posts'])}")
    print(f"### Posts already compliant: {len(posts_by_category['perfect_posts'])}")

if __name__ == "__main__":
    detailed_analysis()