---
title: HttpContext Issues with Azure SignalR Service
date: 2023-12-12 08:00:00
permalink: httpcontext-issues-azure-signalr-service
categories:
  - .NET
  - Azure
  - Azure SignalR
summary: "During my recent project where I migrated an ASP.NET Core application to Azure SignalR Service, I encountered a notable issue with HttpContext. In standard ASP.NET SignalR setups, I could easily access HttpContext via IHttpContextAccessor in my Hub class. This approach had been working flawlessly for me for years. However, after the migration to Azure SignalR Service, I noticed that IHttpContextAccessor didn't provide the same level of information. This change is understandable, considering the connection in Azure SignalR Service is between the client and Azure, rather than directly to my server's hub. To adapt, I shifted my strategy to directly pass essential data, such as timezone information, from the client to the hub. This method of passing parameters directly turned out to be a more efficient solution. Additionally, I appreciated how Azure SignalR Service manages IPrincipal information from HttpContext, which is useful for identity management using the Context.User property. This experience was a valuable addition to my ongoing journey of mastering evolving technologies in the .NET and Azure ecosystems."
excerpt: "Last week, the team and I were migrating an application built with ASP.NET Core and SignalR to use the Azure SignalR Service. We ran into an issue with the HttpContext when using Azure SignalR Service. Unlike in a normal SignalR integration, where you can access HttpContext via IHttpContextAccessor in the Hub class, with Azure SignalR Service the connection changes, affecting the available HttpContext data. This required a shift in our approach, leading us to directly pass the necessary information from the client to the hub."
---

> This is my entry for this years [CS Advent](https://www.csadvent.christmas/).  Take a moment to go check out the other great entries!

Last week, the team and I were migrating an application built with ASP.NET Core and SignalR to use the Azure SignalR Service.  The migration was pretty straight forward, but we ran into an issue with the **HttpContext** when using the Azure SignalR Service.

When a normal SignalR integration is running under an ASP.NET host, you will typically have access to the **HttpContext** for the SignalR request.  This is best done by injecting **IHttpContextAccessor** into your **Hub** class.

We wrote a bit of code that needed to look at the HttpContext to pull some information from a cookie. In normal operation, this code worked fantastically and it served us well for YEARS.

```csharp
public class SignalRHub : Hub
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    public SignalRHub(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;_
    }

    public async Task SendMessage(string message)
    {
        var httpContext = _httpContextAccessor.HttpContext;

        // look up cookie tzInformation
        var tzInformation = httpContext.Request.Cookies["tzInformation"];

        // do something with tzInformation
    }
}
```

There is a bit of problem now that we migrated this code to Azure SignalR Service. The **IHttpContextAccessor** is still injected into the **Hub** class, but it won't have the same information you'd have in a normal SignalR integration.

If you think about it for a moment, or [read this Github issue from 2019](https://github.com/dotnet/aspnetcore/issues/12535), you'll realize that it makes sense.  The HttpContext is from a connection between the client and the SignalR. When Azure SignalR Service is used, the hub is still on your server, but the connection is between the client and the Azure SignalR Service.  The Azure SignalR Service then forwards the messages to your hub.  


## What's a better approach?  

The primary mistake we made was assuming the state was available when it wasn't.  The better approach is to pass the information you need from the client to the hub.  In our case, we needed the timezone information from the client.  We could have passed that information as a parameter to the **SendMessage** method.

```csharp
public class SignalRHub : Hub
{
    public async Task SendMessage(string message, string tzInformation)
    {
        // do something with tzInformation
    }
}
```

```typescript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/signalr")
    .build();

async function sendMessage(message: string) {
    const tzInformation = "America/New_York";
    await connection.invoke("SendMessage", message, tzInformation);
}

async connection.start();
```

## What about Identity?  

One of the cool things that Azure SignalR Service will do for you is it will pass along any IPrincipal information that is set on the HttpContext.  This is great if you are using Identity and want to know who the user is.  You can use the **Context.User** property to get the user information.

```csharp
public class SignalRHub : Hub
{
    public async Task SendMessage(string message)
    {
        var user = Context.User;
        // do something with user
    }
}
```

## Conclusion

If you've found yourself here because of a Google search, I hope you have a little bit of resolve now.  Maybe if you're looking for more SignalR information, take a look at my course, [SignalR Mastery](https://signalrmastery.com).  It's a great way to learn SignalR and it's on sale for the holidays!  If you're looking for more information on Azure SignalR Service, check out the [Azure SignalR Service documentation](https://docs.microsoft.com/en-us/azure/azure-signalr/).  