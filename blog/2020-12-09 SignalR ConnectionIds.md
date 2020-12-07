---
title: Quick Tips for Handling SignalR Connections and ConnectionIds
date: 2020-12-09 00:00:00
permalink: signalr-connection-ids
categories:
  - .NET
  - ASP.NET
summary: ""
excerpt: ""
---

> This is my entry for [C# Advent 2020](https://www.csadvent.christmas/)! Thank you to [Matthew Groves](https://twitter.com/mgroves) for inviting me to participate.

Over the past couple weeks, I've been actively working on a new course to teach ASP.NET Core developers how to effectively use SignalR within their applications.

One of the commons issues I see when reading questions on StackOverflow or Reddit is that many SignalR users do not know how to effectively manage connections to their hubs. Or worse, they make mistakes that'll cause performance problems in the long run.

## Overview: Connections

Let's level the playing field a bit before diving into recommendations. What is a connection? A `connection` is reference from a client to a server. In many cases, this is an open WebSocket that is used by either the client or server to send messages.

But there are also cases where a client will default to Long Polling to communicate. This isn't actually one CONNECTION, it's several because each connection has to reconnect, disconnect, and repeat. That's primarily why I'll call a connection a reference, because in each socket connection to the server, the client will say "I'm connection ID XYZABC" to identify.

SignalR does a lot of work underneath the covers to bind this connection reference to internal data, such as user principles if you're using Identity.

The important thing to note with connections, and more importantly connection IDs, is that they are temporarily identifiers for a connection. If you have multiple tabs or windows open, each of these page instances will have their own unique identifer. Heck, if you refresh - the ID will change.

> Back in 2012, as I was learning more and more about SignalR, I wrote a post on [how to persist ConnectionIds across page instances](/maintaining-signalr-connectionids-across-page-instances/). Turns out - that was horrible advice and you shouldn't do. However, overriding connection ID generation is definitely a tactic you could use - as long as connections always get a unique ID. That's a future post.

## Do not track ConnectionIds

I've got myself into an heated discussion with folks about this before, but I do not advise tracking ConnectionIds. More than once, I've seen this particular workflow:

On connection: map connection ID, user name, roles, etc within the database or some caching system (Redis, for example).
On disconnection: removing the mapping from the data store.

Use case: I need to send a notification to all connections for user "Kevin".

```csharp
var connectionIds = cachingLayer.GetConnectionsForUser("Kevin");
await hubContext.Clients.Clients(connectionIds).SendAsync("notify", "Hello World");
```

This _might_ work. But there is a fundlamental flaw. It will not work in scaled solutions (load balanced set, basically).

If you're running multiple versions of your server at any moment, I'm going to assume you're using Redis backplane or Azure SignalR Server. Either way, you're going to run into issues.

> Note: A lot of my experience is with Redis backplane, where I have replicated this issue many times. I didn't consider it a bug. Azure SignalR Server _might_ not have the same behavior, but still, you shouldn't do this.

## What's a better alternative?

I'm glad you asked! I want you to use Groups, because it's perfectly suited JUST FOR THIS and disconnections are cleaned up for you automatically!

Here is a sample of something I've written in the past for a project:

```csharp
public override async Task OnConnectedAsync()
{
  var userName = GetUserName(Context); // get the username of the connected user

  await Groups.AddToGroupAsync(Context.ConnectionId, $"user_{userName}");
  await base.OnConnectedAsync();
}
```

There isn't a limit on the number of groups you can have, nor the number of connections in that group. So when a NEW connection comes in, we figure out the user (if we can) and add them to their own personal group.

In the future, when I want to notify all clients for user "Kevin", the process is easier.

```csharp
var userName = "Kevin";
await hubContext.Clients.Group($"user_{userName}").SendAsync("notify", "Hello World");
```

This saves me a roundtrip to my cache or database, and also saves me the cycles of having to process all the of the connectionIds.

SignalR will automatically clean up these connections too.

And better yet, using groups works perfectly in scaled solutions.  

`cta:`
