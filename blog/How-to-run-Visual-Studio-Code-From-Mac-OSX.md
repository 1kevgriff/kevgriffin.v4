---
title: "How to run Visual Studio Code on Mac OSX"
date: "2020-04-07T13:27:04Z"
description: "Step-by-step guide to set up Visual Studio Code command line integration for both Terminal and Zsh on macOS."
summary: "Using Visual Studio Code on OSX?  Here's how to set up the command line for Zsh or Terminal."
tags:
  - Visual Studio Code
  - macOS
  - Terminal
  - Zsh
categories:
  - Development
permalink: how-to-run-visual-studio-code-from-mac-osx
---

**EDIT:** [You can just do this from Visual Studio Code now.](https://code.visualstudio.com/docs/setup/mac)

## Terminal

Currently, there isn't an automatic method for doing this, but with a little code in your `~/.bash_profile` file, you can configure it.

```bash
code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}
```

Then from Terminal you can type:

`code`  -- opens Visual Studio Code  
`code .` -- opens current directory in Visual Studio Code  
`code somefile` -- opens somefile in Visual Studio Code  


## Zsh

Using [Visual Studio Code](https://code.visualstudio.com) on your Mac, but can't call it from Zsh?

Currently, there isn't an automatic method for doing this, but with a little code in your `.zshrc` file, you can configure it.

```zsh
function code {
    if [[ $# = 0 ]]
    then
        open -a "Visual Studio Code"
    else
        local argPath="$1"
        [[ $1 = /* ]] && argPath="$1" || argPath="$PWD/${1#./}"
        open -a "Visual Studio Code" "$argPath"
    fi
}
```
Then from Terminal you can type:

`code`  -- opens Visual Studio Code  
`code .` -- opens current directory in Visual Studio Code  
`code somefile` -- opens somefile in Visual Studio Code  
