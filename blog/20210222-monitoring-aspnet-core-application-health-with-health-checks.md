---
title: "Monitoring ASP.NET Core Application Health with Health Checks 🩺"
date: 2021-02-23T00:00:00Z
permalink: monitoring-aspnet-core-application-health-with-health-checks
description: "Failures in your application often are not just because the code you wrote is bad, it's often because services or dependencies you depend on are having an issue. Health Checks in ASP.NET Core help you identify the problem areas."
summary: "Failures in your application often are not just because the code you wrote is bad, it's often because services or dependencies you depend on are having an issue.  Health Checks in ASP.NET Core help you identify the problem areas."
tags:
  - Health Checks
  - Monitoring
  - ASP.NET Core
  - Dependencies
categories:
  - .NET
  - ASP.NET
  - Web Development
excerpt: "Failures in your application often are not just because the code you wrote is bad, it's often because services or dependencies you depend on are having an issue.  Health Checks in ASP.NET Core help you identify the problem areas."
---

Your application isn't just your code.

*It's your code plus your database.*

*It's your code plus the services you use.*

*It's your code plus the infrastructure you run on.*

Failures in your application often are not just because the code you wrote is bad 😈, it's often because services or dependencies you depend on are having an issue.

Here's an example:  One of my clients has a relatively simple infrastructure.  We have an ASP.NET Core application running in Microsoft Azure App Services, and we take advantage of Azure SQL, Azure Storage, and Azure Redis Cache (wowza Azure!!).  

In addition "all Azure services", we have a virtual machine (also running in Azure) that hosts a instance of Discourse.

How do I define how healthy my application?  It's not necessarily the health of one component, but the sum all the components!

If Azure SQL is down or have a blip, that impacts my overall system.

If Azure Redis Cache is upgrading, that impacts my overall system.

But how do you know WHICH component is the issue?  

## **Introducing Health Checks**

In earlier versions of ASP.NET Core, a new feature was introduced called Health Checks.  This is a backend component which can regularly poll your services to see it they're healthy or not.  

A [sample health check](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-5.0#create-health-checks) looks something like this:

```csharp
// Stolen from the ASP.NET Core Docs
public class ExampleHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default(CancellationToken))
    {
        var healthCheckResultHealthy = true;

        if (healthCheckResultHealthy)
        {
            return Task.FromResult(
                HealthCheckResult.Healthy("A healthy result."));
        }

        return Task.FromResult(
            HealthCheckResult.Unhealthy("An unhealthy result."));
    }
}
```

Imagine having a check for your SQL Server.  AND your Redis Service.  AND your storage provider.  AND so on and so on!  

> Don't want to write health checks yourself?  Check out [https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks](https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks) for an amazing list of managed health checks for a variety of platforms.  I use these in my applications.

Here is an example of pulling health checks into your application:

```csharp
// Startup.ConfigureServices()

services.AddHealthChecks()
    .AddSqlServer(Configuration["SqlConnectionString"])
    .AddRedis(Configuration["RedisConnectionString"])
    .AddAzureBlobStorage(Configuration["CloudStorageConnectionString"])
    .AddUrlGroup(new Uri(discourseUrl), "forums")
    .AddApplicationInsightsPublisher();
```

Huge note for the above: I using the AspNetCore.Diagnostics.HealthChecks library to do all this work.  I didn't write any of the supported checks.

However, I can tell any of these checks what I define as healthy or unhealthy (although defaults are fine for me).

Finally, you turn it on by adding a health check route to your Configure() method.

```csharp
// Startup.Configure
app.UseHealthChecks("/health")
```

What does this look like if you hit the endpoint?

```json
{
    "status": "Healthy",
    "totalDuration": "00:00:00.0602633",
    "entries": {
        "sqlserver": {
            "data": {},
            "duration": "00:00:00.0019139",
            "status": "Healthy"
        },
        "redis": {
            "data": {},
            "duration": "00:00:00.0017975",
            "status": "Healthy"
        },
        "azureblob": {
            "data": {},
            "duration": "00:00:00.0067374",
            "status": "Healthy"
        },
        "forums": {
            "data": {},
            "duration": "00:00:00.0586288",
            "status": "Healthy"
        }
    }
}
```


## Okay, cool - but that's just testing uptime and connectivity

You're right!  These health check examples are just a starting point, but each one of them are customizable.

For example, maybe for your SQL Server check, you might want to run a common query on your database to ensure the response time is within a designated period.  

For our Discourse forums health check, I actually go much deeper than the example.  We'll check for a `200 OK` from the server, as well as text on the website we're expecting to see.  Sometimes Discourse will show a temporarily warning if it's in a degraded state.  If we see that, we'll report the forums as unhealthy.

## What next?

Once you have a health check endpoint created, what do you do with it next?  

Generally, when my clients report an issue, the health endpoint is the first thing I'll hit to get a gut check.  If one of the external dependencies is having an issue, I know where to start looking.

Azure App Services recently added a health endpoint polling feature that'll look at the status of your endpoint across every node in your load balanced set.  If one of the endpoints is degraded for a period of time, Azure will automatically restart the node!

Docker has had health checks support for a while, and it's useful to help manage which nodes are served traffic in a cluster.  By the way, I'm not a Docker guy at all - but this is my understanding.

## Wrapping up

Health Checks are a great way to Supercharge your ASP.NET Core applications.  Just like the check engine light in your car, the system is constantly reporting on itself and you'll be able to identify issues faster and with more precision!