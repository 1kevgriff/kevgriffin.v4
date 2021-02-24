---
title: In Memory and Distributed Caching in ASP.NET Core 📇
date: 2021-02-23 00:00:00
permalink: in-memory-and-distributed-caching-in-aspnet-core
categories:
  - .NET
  - ASP.NET
  - Web Development
summary: ""
excerpt: ""
---

Sometimes I feel like a good caching strategy is like a superpower, because every time I implement it on a bottleneck service my clients generally respond with "*Wow!  I cannot believe how much faster this is.  Thank you so much!  You're our hero."*

Okay... I might have indulged a bit with that quote.

But in a world of "real-time" everything, caching tends to be overlooked because it's seen as old or outdated.

Let's back up... what does it mean to cache something?

## What Does it Mean to Cache?

There are certain operations we do as software developers that require a lot of time and effort or happen so often that even if they're quick, they're slow in aggregate.

Silly dumb example: in one of my client applications, we maintain a list of Cities and States and Time Zones for events in our application.  The use-case is IF I need to know the time zone of "Norfolk, VA", I can quickly look that up.

We need to know the time zone because we want to do translation in the app from UTC to the local time.  

And the SQL call to get this data is fast.  It's a simple `SELECT TimeZone From TimeZones Where City = @city and State = @state`

The problem is that we do this action A LOT.

After implementing this feature, I was able to watch our Application Insights telemetry to see that while the single call was fast, our bottleneck was still this call because of the shear number of times it had to get called during an operation.  Even when we distributed the workloads across multiple node, our database was the bottleneck.

Time zone data doesn't change.  Norfolk, VA will always be Eastern [Daylight|Standard] Time.  

That's good for us - because I was able to implement a Redis cache which stored the result of "Norfolk, VA" and could return it in single digit milliseconds.  

Our process that once took 10-15 minutes could execute in a fraction of that time because of caching.

> But Kevin, what if timezones change?  Yes, that's a thing that happens time to time 😂.  We can always invalidate the cache to get rid of the stale content.

## Key/Value Stores

Most caching systems, such as Redis, are key/value stores.  I'm overly simplifying it but bear with me.  These systems are optimized for reads.

Compare to SQL Server.  If you execute a query in SQL Server, the server has to create a plan to query that data.  Does it require multiple tables?  Does the table have an index?  What's the most efficient way to get to the way?  

SQL Server is optimized for querying or seeing your data in a variety of different ways.

Redis doesn't do any of that.  If I ask Redis for the value of `timezone:virginia:norfolk`, it can go **BOOM** there you go.  It's a straight lookup.  Given a key, there is one potential value.  That's why it's amazing for caching.  Scale this over 10s of thousands of keys, and you're golden!

## Memory Cache

There are two mechanisms to think about caching in your ASP.NET Core applications.  Memory Cache and Distributed Cache.  We'll cover each one separately.

## Distributed Cache