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

## Quick History

Let's rewind back a couple weeks.  I was maintaining a .NET Core 3.1 Web Application.  This particular app had been on quite the journey!  It started life in .NET Framework 4.6 (after I dabbled with the idea of writing the app in node.js, whew I dodged a bullet with that one).  Eventually, it was migrated to .NET Core 1.1.  Then .NET Core 2.2. And then .NET Core 3.1 where it's been since about two weeks ago.

I had skipped the jump to .NET 5 partially out of laziness, but also out of concern.  This application had grown a bit in complexity and moving pieces, so I was wary to put the effort into upgrading it to the latest bits.  And .NET Core 3.1 was the LTS (long term service) version of .NET, so I wasn't in a huge hurry to move forward.

## .NET 6 Launch

I knew that I wanted to move this application to .NET 6, as it would be the new LTS version, and I was foregoing several dependency updates.  In particular, there was one dependency that was still based on .NET Framework that was giving me concern.  It never made the jump to .NET Standard, so I worried about future compatibility.  

It was during the amazing Visual Studio 2021 launch video, I saw mention of the `dotnet upgrade assistant`.  Now - I feel like a fool because this tool has been around for a while, but it was getting an update to support .NET 6.

Maybe this was the tool that would help us go live with .NET 6?

## Getting Started with Upgrade Assistant

`cta: `

## Go live time!

## What else can Upgrade Assistant help with?


