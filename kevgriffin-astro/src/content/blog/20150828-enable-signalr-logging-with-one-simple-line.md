---
title: Enable SignalR Logging with One Simple Line
permalink: signalr-logging
description: >-
  Learn how to enable client-side logging in SignalR JavaScript applications
  with just one line of code to debug connection issues.
summary: How do you enable logging in SignalR?
tags:
  - Development - ASP.NET
categories:
  - Development - ASP.NET
pubDate: '2015-08-28T23:26:42.000Z'
draft: false
---

It is easy to think that SignalR works within a black box, but if you are deploying JavaScript clients, here is an EASY trick to learning what is happening underneath the scenes.

Before you start your connection, add this ONE line of code:

```javascript
$.connection.hub.logging = true;
$.connection.hub.start();
```

Tada!  You have logging in your browser console:

![SignalR logging example](./images/logging_preview.png)
