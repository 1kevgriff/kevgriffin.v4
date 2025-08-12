#!/usr/bin/env python3
import os
import re
import yaml
import json
from datetime import datetime

def extract_frontmatter(filepath):
    """Extract YAML frontmatter from markdown file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
            
        if not content.startswith('---'):
            return None, content
            
        parts = content.split('---', 2)
        if len(parts) < 3:
            return None, content
            
        frontmatter_str = parts[1].strip()
        try:
            frontmatter = yaml.safe_load(frontmatter_str)
            return frontmatter, parts[2].strip()
        except yaml.YAMLError:
            return None, content
            
    except Exception as e:
        return None, ""

def create_filename_safe(title, date_str):
    """Create a filename-safe version of title"""
    safe_title = re.sub(r'[^\w\s-]', '', title)
    safe_title = re.sub(r'[-\s]+', '-', safe_title).strip('-')
    safe_title = safe_title.lower()
    
    try:
        if isinstance(date_str, str):
            for fmt in ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d', '%Y-%m-%d %H:%M:%S.%f']:
                try:
                    date_obj = datetime.strptime(date_str, fmt)
                    break
                except ValueError:
                    continue
            else:
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
        return None

def generate_action_plan():
    """Generate structured action plan with all file details"""
    blog_dir = "D:/repos/kevgriffin.v4/blog"
    
    md_files = [f for f in os.listdir(blog_dir) if f.endswith('.md')]
    
    action_plan = {
        "summary": {
            "total_files": len(md_files),
            "perfect_posts": 0,
            "needs_changes": 0
        },
        "frontmatter_actions": {
            "add_description": [],
            "add_summary": [],
            "add_tags": [],
            "convert_excerpt_to_summary": [],
            "remove_updated_field": []
        },
        "filename_actions": {
            "rename_files": []
        },
        "perfect_posts": []
    }
    
    for filename in md_files:
        filepath = os.path.join(blog_dir, filename)
        frontmatter, body = extract_frontmatter(filepath)
        
        if frontmatter is None:
            continue
            
        post_details = {
            "current_filename": filename,
            "title": frontmatter.get('title', 'Unknown'),
            "date": str(frontmatter.get('date', '')),
            "permalink": frontmatter.get('permalink', ''),
            "categories": frontmatter.get('categories', [])
        }
        
        needs_changes = []
        
        # Check frontmatter fields
        if not frontmatter.get('description'):
            action_plan["frontmatter_actions"]["add_description"].append(post_details.copy())
            needs_changes.append("add_description")
            
        if not frontmatter.get('summary'):
            if not frontmatter.get('excerpt'):
                action_plan["frontmatter_actions"]["add_summary"].append(post_details.copy())
                needs_changes.append("add_summary")
            
        if not frontmatter.get('tags'):
            action_plan["frontmatter_actions"]["add_tags"].append(post_details.copy())
            needs_changes.append("add_tags")
            
        if frontmatter.get('excerpt') and not frontmatter.get('summary'):
            excerpt_details = post_details.copy()
            excerpt_details["excerpt_content"] = frontmatter.get('excerpt')
            action_plan["frontmatter_actions"]["convert_excerpt_to_summary"].append(excerpt_details)
            needs_changes.append("convert_excerpt")
            
        if frontmatter.get('updated'):
            updated_details = post_details.copy()
            updated_details["updated_content"] = frontmatter.get('updated')
            action_plan["frontmatter_actions"]["remove_updated_field"].append(updated_details)
            needs_changes.append("remove_updated")
        
        # Check filename
        if post_details['date']:
            proposed_filename = create_filename_safe(post_details['title'], post_details['date'])
            if proposed_filename and proposed_filename != filename:
                rename_details = post_details.copy()
                rename_details["proposed_filename"] = proposed_filename
                action_plan["filename_actions"]["rename_files"].append(rename_details)
                needs_changes.append("rename_file")
        
        # Check if perfect
        if (frontmatter.get('description') and 
            frontmatter.get('summary') and 
            frontmatter.get('tags') and
            not frontmatter.get('updated') and
            not frontmatter.get('excerpt')):
            
            proposed_filename = create_filename_safe(post_details['title'], post_details['date'])
            if proposed_filename == filename:
                action_plan["perfect_posts"].append(post_details)
            else:
                # Still needs renaming
                rename_details = post_details.copy()
                rename_details["proposed_filename"] = proposed_filename
                action_plan["filename_actions"]["rename_files"].append(rename_details)
    
    # Update summary
    action_plan["summary"]["perfect_posts"] = len(action_plan["perfect_posts"])
    action_plan["summary"]["needs_changes"] = len(md_files) - len(action_plan["perfect_posts"])
    
    return action_plan

def main():
    action_plan = generate_action_plan()
    
    # Save as JSON
    with open('blog_action_plan.json', 'w', encoding='utf-8') as f:
        json.dump(action_plan, f, indent=2, ensure_ascii=False)
    
    print("BLOG POST STANDARDIZATION ACTION PLAN")
    print("=====================================\n")
    
    print(f"Total files: {action_plan['summary']['total_files']}")
    print(f"Perfect posts: {action_plan['summary']['perfect_posts']}")
    print(f"Posts needing changes: {action_plan['summary']['needs_changes']}\n")
    
    print("FRONTMATTER ACTIONS NEEDED:\n")
    
    print(f"1. ADD DESCRIPTION FIELD ({len(action_plan['frontmatter_actions']['add_description'])} posts)")
    print("   Nearly all posts missing this required field\n")
    
    print(f"2. ADD SUMMARY FIELD ({len(action_plan['frontmatter_actions']['add_summary'])} posts)")
    for post in action_plan['frontmatter_actions']['add_summary']:
        print(f"   - {post['current_filename']}")
    print()
    
    print(f"3. ADD TAGS FIELD ({len(action_plan['frontmatter_actions']['add_tags'])} posts)")
    print("   Most posts missing this field\n")
    
    print(f"4. CONVERT EXCERPT TO SUMMARY ({len(action_plan['frontmatter_actions']['convert_excerpt_to_summary'])} posts)")
    for post in action_plan['frontmatter_actions']['convert_excerpt_to_summary']:
        print(f"   - {post['current_filename']}")
    print()
    
    print(f"5. REMOVE UPDATED FIELD ({len(action_plan['frontmatter_actions']['remove_updated_field'])} posts)")
    for post in action_plan['frontmatter_actions']['remove_updated_field']:
        print(f"   - {post['current_filename']}")
    print()
    
    print("FILENAME STANDARDIZATION:\n")
    print(f"RENAME FILES ({len(action_plan['filename_actions']['rename_files'])} posts)")
    print("All files need renaming to follow YYYY-MM-DD-title.md format\n")
    
    print("First 10 rename examples:")
    for post in action_plan['filename_actions']['rename_files'][:10]:
        print(f"   {post['current_filename']} -> {post['proposed_filename']}")
    print(f"   ... and {len(action_plan['filename_actions']['rename_files']) - 10} more\n")
    
    print("PERFECT POSTS (already compliant):")
    for post in action_plan['perfect_posts']:
        print(f"   - {post['current_filename']}")
    
    print(f"\nDetailed action plan saved to: blog_action_plan.json")

if __name__ == "__main__":
    main()