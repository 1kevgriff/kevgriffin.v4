---
title: Does SignalR Guarantee Message Deliverability?
description: "SignalR doesn't guarantee the deliverability of messages sent from the server.  This might be a problem for you, so let's discuss the problem and why SignalR doesn't try to solve it automatically."
date: 2021-04-06 11:00:00
permalink: signalr-message-guarantee-deliverability
categories:
  - .NET
  - ASP.NET
  - Web Development
summary: "SignalR doesn't guarantee the deliverability of messages sent from the server.  This might be a problem for you, so let's discuss the problem and why SignalR doesn't try to solve it automatically."
excerpt: "Kevin, I have two clients.  Client 1 sends a message to client 2.  Client 1 loses its connection to the server.  Client 2, during this time, sends a message to Client 1.  That message is lost because Client 1 was disconnected.  How can we solve this problem?"
---

I recently received a new question in [SignalR Mastery](https://www.udemy.com/course/signalr-mastery/learn/?referralCode=5F129296A976F8353B79) asking about message deliverability?

> Kevin, I have two clients.  Client 1 sends a message to client 2.  Client 1 loses its connection to the server.  Client 2, during this time, sends a message to Client 1.  That message is lost because Client 1 was disconnected.  How can we solve this problem?

This is a commonly asked questions from folks in the community, and this is going to be a difficult pill for some folks to swallow:

**SignalR does not guarentee message deliverability**

I know.  I know.  

## Complexity

It is easy to be a backseat developer and say, "🧐 Oh Kevin, this seems like such a simple problem to solve."

Well then.. let's break down the above scenario.

`Client 1` and `Client 2` are connected to SignalR.  `Client 1` sends a message to the Hub, the Hub will interpret it and determine that a message should be sent to `Client 2`.  

This is actually some guaranteed deliverability here.  `Client 1` would only be able to send a message to the Hub if the Hub was connected, right?  Else the client would throw an error.  You can also `.invoke` the method call which returns a promise for the eventual success or failure of the call.  

> Are you into networking terms?  SignalR is more closely aligned to the UDP pattern of communication, and not TCP.

The Hub now wants to send a message to `Client 2`.  Is this client call by Id (please no)?  Is this client call by group?  Is this client call by user principal?  

I guess it really boils down to individual connections, right?  Is the connection on our server or is it on another server?  Because distributed systems are totally a thing, and you should definitely be using a backplane if you're distributed.  

Let's forgot about all that complexity.  If the Hub sends a message to a client, the only way to REALLY know if the client received it is for the client to acknowledge the receipt.  That means the server needs to now maintain a local database of all messages sent that haven't been acknowledged.  

What happens if the client doesn't ACK the message?  How long should we wait for an ACK?  These are great questions!

What if the client misses a series of messages?  Do we send just the last one?  Should we resend them all?  Should they be resent in order?  Do we have to ensure messages resent are acknowledged before attempting to resend other messages?

Would you like me to go on?


## Large problems don't have easy solutions

This is exactly why message acknowledgment isn't built into SignalR.  It's a very large problem that is solved in a variety of different ways, and the level of guarantee is really dependent on you and your use case.  

SignalR is an amazing tool and helps you build amazing products without a ton of overhead.  But some problems are too big for the library.  

## Connection Events Are Your Friends

The majority of your issues are going to come from shoddy connections.  If the connection disconnects for ANY request, it's likely the state is now bad.  Throw it away and start from scratch.

The server has events for disconnects, but these might be arise immediately.  A lot depends on the connection protocol you're using.  

If the connection is valid, it's extremely unlikely the messages won't go through.  

## Resync

Even though the problem is large, it's still a problem?  I typically take the `resync" approach myself.  What does that mean?

When you hub initially connects, there is little to no state existing on the client.  It's most likely that you'll ask the server for initial state.  But every now and then, it's reasonable to ask the server for an updated initial state.

In the 911-aggregation app I talk about, we use the approach of a minutely resync where the client assumes that it's state is outdated.

> The client should always assume it's out of date, and the server should assume the client is out of date.  Never trust the client.

The resync simply resets the state based off what the server says the state should be.

In something more real-time, like chat, we could tell the server what we already know.  For example, make a resync request saying "the last chat item I have is `XYZ123`" and the server could respond with "oh snap, you're missing items `XYZ124` and `XYZ125`".  It's not as ideal as the "I wish SignalR would handle all this for me automatically", but it works.

## Conclusion

I've been considering the question myself of what a library would look like on top of SignalR that helps with this exactly problem?  I'm very curious about your thoughts as well.  Let's chat on Twitter!