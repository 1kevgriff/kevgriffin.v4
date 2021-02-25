---
title: Converting Epoch Time into DateTime with Azure Logic Apps
date: 2021-02-24 00:00:00
permalink: azure-logic-apps-epoch-time
categories:
  - Azure
  - Web Development
summary: "Some APIs use Epoch time to designate a DateTime object.  In Azure Logic Apps, how do you convert this into something useful?"
excerpt: "Recently, I've been building a handful of Azure Logic Apps that work with Stripe webhooks and I've need to convert Epoch DATETIME into a more useful format."
---

Recently, I've been building a handful of Azure Logic Apps that work with Stripe webhooks.

Stripe will commonly use Epoch time for it's dates.

But Epoch time is pretty useless for anything that is human-facing, and it's not necessarily the default for a lot of Microsoft solutions.  

I needed a way in Azure Logic Apps to easily convert an Epoch Date into a readable format.

## What is Epoch Time?

[Epoch Time](https://en.wikipedia.org/wiki/Epoch_(computing)) is the number of seconds that have surpassed since Midnight, January 1st, 1970.  This is also commonly known as `Unix Epoch`.

## Converting

Converting the time is pretty straight-forward, Epoch time is just the number of seconds since 1970-01-01 and Azure Logic Apps has a handy `addToTime` method we can use.

```javascript
addToTime('1970-01-01T00:00:00Z', [EPOCH TIME HERE], 'second')
```

And ta-da!  Your Epoch Time is now in a much easier to use format!

`cta: `

