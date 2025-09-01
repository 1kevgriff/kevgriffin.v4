---
title: "How to Upgrade .NET CLI Templates"
date: 2020-10-14T00:00:00Z
permalink: how-to-upgrade-dotnet-cli-templates
description: "Learn how to check for and apply updates to your .NET CLI templates using simple dotnet commands introduced in .NET Core 3.0."
summary: "How do you update the .NET CLI templates?  Turns out there is a command just for you!"
tags:
  - .NET CLI
  - Templates
  - dotnet
  - .NET Core
  - Updates
  - Command Line
categories:
  - .NET
---

I saw an awesome tweet on Twitter today:

https://twitter.com/buhakmeh/status/1316360387886014464

Turns out, if you've upgraded to .NET Core 3.0, there is a special command just for this!  Head over to the [.NET Core Docs](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new?WT.mc_id=DOP-MVP-4029061) and look for these two options at the bottom:

### Checking for Updates  

```powershell
dotnet new --update-check
```

> Checks if there are updates available for the template packs that are currently installed. Available since .NET Core 3.0 SDK.

### Applying Updates  

```powershell
dotnet new --update-apply
```

> Checks if there are updates available for the template packs that are currently installed and installs them. Available since .NET Core 3.0 SDK.

