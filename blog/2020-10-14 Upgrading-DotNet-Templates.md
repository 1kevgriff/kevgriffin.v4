---
title: How to Upgrade .NET CLI Templates
date: 2020-10-14 00:00:00
permalink: how-to-upgrade-dotnet-cli-templates
categories:
  - .NET
excerpt: ""
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

`cta:`