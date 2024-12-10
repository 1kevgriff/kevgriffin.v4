---
title: My $8,000 Serverless Mistake
date: 2024-12-07 00:00:00
permalink: my-8000-serverless-mistake
categories:
    - Serverless
    - Azure
    - Mistake
summary: "I made a serverless mistake that cost me $8,000. Here's what I learned."
excerpt: "I made a serverless mistake that cost me $8,000. Here's what I learned."
---

Hello 👋, I'm Kevin and I'm a member of a very exclusive club.  

-- TODO: gif of Pam from the Office

I'm a member of the "Accidentally Spent a Lot of Money on Cloud" club.  We have a special handshake too, it looks like this:

-- TODO: gif of Kevin James pulling pockets out

## The Setup

I need to declare here at the start that I really love serverless, and because of my severe Azure bias, I'm going to talk strictly about Azure Functions.  But as far as I'm aware, the big mistake I made with Azure Functions is a mistake that can happen on any cloud provider.

Doing different types of work in the background is imperative to any growing software application.  

Sending transactional emails, charging credit cards, doing complex data processing, etc. All these things are typically done best in the background of an application, and ideally in a location that does not impact the user experience.

I've talked about many different ways to solve this as a .NET developer.  

One of my favorite solutions has been to embrace Azure Functions.

## Why Serverless?


