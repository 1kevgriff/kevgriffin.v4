---
title: "Enable SignalR Logging with One Simple Line"
categories:
  - "Development - ASP.NET"
permalink: signalr-logging
date: 2015-08-28T23:26:42Z
description: "Learn how to enable client-side logging in SignalR JavaScript applications with just one line of code to debug connection issues."
tags: ["SignalR", "JavaScript", "logging", "debugging", "ASP.NET", "web development"]
summary: "How do you enable logging in SignalR?"
---

It is easy to think that SignalR works within a black box, but if you are deploying JavaScript clients, here is an EASY trick to learning what is happening underneath the scenes.

Before you start your connection, add this ONE line of code:

```javascript
$.connection.hub.logging = true;
$.connection.hub.start();
```

Tada!  You have logging in your browser console:

![SignalR logging example](./images/logging_preview.png)