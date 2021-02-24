---
title: SignalR AbortController is Undefined on Older Browsers
date: 2021-02-23 00:00:00
permalink: signalr-abortcontroller-undefined
categories:
  - .NET
  - ASP.NET
  - Web Development
summary: ""
excerpt: ""
---

Recently, I updated a client application to the latest versions of SignalR (including the NPM module).  One of our users uses a SmartTV to view the page, and it stopped working.

> Fun fact: many SmartTVs are built on old versions of Chromium and are never updated.  Our users TV is on Chrome 56.

The particular error we were seeings was `AbortController is undefined`, and tracing it backwards to the `FetchHttpClient` class of SignalR shows a small issue:

[https://github.com/dotnet/aspnetcore/blob/main/src/SignalR/clients/ts/signalr/src/FetchHttpClient.ts](https://github.com/dotnet/aspnetcore/blob/main/src/SignalR/clients/ts/signalr/src/FetchHttpClient.ts)

```typescript
if (typeof fetch === "undefined") {
    // In order to ignore the dynamic require in webpack builds we need to do this magic
    // @ts-ignore: TS doesn't know about these names
    const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;

    // Cookies aren't automatically handled in Node so we need to add a CookieJar to preserve cookies across requests
    this.jar = new (requireFunc("tough-cookie")).CookieJar();
    this.fetchType = requireFunc("node-fetch");

    // node-fetch doesn't have a nice API for getting and setting cookies
    // fetch-cookie will wrap a fetch implementation with a default CookieJar or a provided one
    this.fetchType = requireFunc("fetch-cookie")(this.fetchType, this.jar);

    // Node needs EventListener methods on AbortController which our custom polyfill doesn't provide
    this.abortControllerType = requireFunc("abort-controller");
} else {
    this.fetchType = fetch.bind(self);
    this.abortControllerType = AbortController;
}
```
The error occurs on the line `this.abortControllerType = AbortController;`.  But why do we get here?  Well it's because some older browsers, like Chrome 56, don't support `AbortController` but do support `fetch`.  That's how this issue occurs.

In [a similar issue on GitHub](https://github.com/dotnet/aspnetcore/issues/29424) the team said this is pretty much a `wont fix` because it's an older browser.

So how can you work around it?  My theory was to check if `fetch` and `AbortController` existed BEFORE loading SignalR.  This is done early in my application:

```typescript
if (typeof fetch !== "undefined" && typeof AbortController === "undefined") {
  console.warn("Fetch is supported, but not AbortController.  Dropping default fetch so SignalR can override.");
  window.fetch = undefined;
}
```

Why does this work?  Well, if `fetch` is defined but `AbortController` is not, we know we're going to have issues.  SignalR has its own polyfill for `fetch` if `fetch` doesn't exist.  So we simply make fetch undefined globally and let SignalR do it's work for us!

I hope this helps you in the future!  If it did, hit me up and [Twitter](https://twitter.com/1kevgriff) and let me know!