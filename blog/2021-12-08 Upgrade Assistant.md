---
title: Rapid Project Upgrades with the .NET Upgrade Assistant
date: 2021-12-08 08:00:00
permalink: rapid-project-upgrades-with-dotnet-upgrade-assistant
categories:
  - .NET
summary: ""
excerpt: ""
---

> This is my yearly submission for [CS Advent 2021](https://www.csadvent.christmas)!  Please take a moment to check out all the other great submissions from folks in the community.

## Quick history

Let's rewind back a couple weeks.  I was maintaining a .NET Core 3.1 Web Application.  This particular app had been on quite the journey!  It started life in .NET Framework 4.6 (after I dabbled with the idea of writing the app in node.js, whew I dodged a bullet with that one).  Eventually, it was migrated to .NET Core 1.1.  Then .NET Core 2.2. And then .NET Core 3.1 where it's been since about two weeks ago.

I had skipped the jump to .NET 5 partially out of laziness, but also out of concern.  This application had grown a bit in complexity and moving pieces, so I was wary to put the effort into upgrading it to the latest bits.  And .NET Core 3.1 was the LTS (long term service) version of .NET, so I wasn't in a huge hurry to move forward.

## .NET 6 Launch

I knew that I wanted to move this application to .NET 6, as it would be the new LTS version, and I was foregoing several dependency updates.  In particular, there was one dependency that was still based on .NET Framework that was giving me concern.  It never made the jump to .NET Standard, so I worried about future compatibility.  

It was during the amazing Visual Studio 2021 launch video, I saw mention of the [dotnet upgrade assistant](https://dotnet.microsoft.com/platform/upgrade-assistant).  Now - I feel like a fool because this tool has been around for a while, but it was getting an update to support .NET 6.

Maybe this was the tool that would help us go live with .NET 6?

`cta: `

## Getting Started with Upgrade Assistant

All tools should be as straight forward to install as the .NET Upgrade Assistant.  We'll assume you already have the .NET 6 SDK and Runtimes installed on your machine.  

```
dotnet tool install -g upgrade-assistant
```

After a moment, you'll have all the tools and a new command `upgrade-assistant`.

### Analysis



### Upgrade


## Go live time!

## What .NET langages does the Upgrade Assistant support?

C# and Visual Basic are fully supported!

## What else can Upgrade Assistant help with?

I haven't played around with all of the configurations that the .NET Upgrade Assistant can help you with, but according to the website, the Upgrade Assistant can help with the following project types:

* ASP.NET MVC
* Windows Forms
* Windows Presentation Foundation (WPF)
* Console applications
* Class Libraries

## What about other types of projects?

You'll probably notice ASP.NET Web Forms is missing from the above list, and that's on the [roadmap](https://github.com/dotnet/upgrade-assistant/blob/main/docs/roadmap.md) for the project along with many other features!

## Conclusion

I wasn't looking forward to the upgrade path for my applications, mainly because I didn't want to have to edit all the project files and deal with incremental issues that might have popped up.

The .NET Upgrade Assistant was an amazing tool that helped us get our application into production with .NET 6 easily and quickly.  I'm hoping if you're on the fence about making the upgrade, take the time to check out this tool!
