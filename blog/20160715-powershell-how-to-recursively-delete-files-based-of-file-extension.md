---
title: "Powershell: How to recursively delete files based of file extension?"
date: 2016-07-15T14:15:43Z
permalink: powershell-how-to-recursively-delete-files-based-of-file-extension
description: "Learn how to recursively delete files based on file extension using PowerShell with this quick command line tutorial."
summary: "How do you recursiviely delete files based off file extension in PowerShell?"
tags:
  - "PowerShell"
  - "command line"
  - "file management"
  - "scripts"
categories:
  - Development
---

File this under "took me WAY too long to figure out how to do".

I just finished doing a Git merge, and ran into an issue where my working folder was polluted with .orig files.

I wanted to recursively delete all the .orig files.  That is apparently harder than it sounds, because it took me 15 minutes to figure out the correct command line.

So you don't go fumbling like I did:

```powershell
Get-ChildItem . -recurse -include *.orig | remove-item
```

Replace `.` and `*.orig` accordingly.  Have fun!