---
title: My Default .gitignore File
permalink: base-gitignore
description: >-
  A comprehensive .gitignore file template for Visual Studio projects and common
  development artifacts.
summary: >-
  A comprehensive .gitignore file template for Visual Studio projects and common
  development artifacts.
tags:
  - Git
  - Visual Studio
  - Development
  - Version Control
categories:
  - Development
pubDate: '2012-11-12T10:37:23.000Z'
draft: false
---

Every time I create a new Git repo, I always have to go look for a previous copy of my .gitignore file.  I thought it would be a great idea to just post it up for all to find, in case they were looking for it.  This particular file is built around Visual Studio projects.

```markdown
# Ignore file for Visual Studio

# use glob syntax
syntax: glob

# Ignore Config files with keys and passwords
#ServiceConfiguration*.cscfg
#Web*.config
#App*.config

# Ignore Visual Studio files
*.obj
#*.exe
#*.pdb
*.user
*.aps
*.pch
*.vspscc
*.vshost.*
*_i.c
*_p.c
*.ncb
*.suo
*.tlb
*.tlh
*.bak
*.cache
*.ilk
*.log
*.lib
*.sbr
*.scc
*.orig
UpgradeLog*.*
UpgradeReport*.*
[Bb]in
[Dd]ebug*/
obj/
[Rr]elease*/
_ReSharper*/
[Tt]est[Rr]esult*
[Bb]uild[Ll]og.*
*.[Pp]ublish.xml
glob:*.vs10x
*.ReSharper
[Pp]ublish
[Rr]eleaseFiles
[Cc]sx/
[Bb]ackup1/
[Pp]ackages/

# Mac Files
.DS_Store
*.DS_Store
._*
```
