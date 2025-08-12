---
title: How to Debug CSS/JavaScript Mouse or Hover Events
date: 2021-01-11 00:00:00
permalink: debug-javascript-css-hover-mouseover-events
categories:
  - JavaScript
  - CSS
  - Web Development
summary: "How do you debug or style elements that only exist in the DOM during hover or mouse-over events?"
excerpt: "You're working on an issue the requires to debug or style an element on a page that ONLY appears in the course of a hover or mouse-over event.  However, when the event is not occurring, the element you want to work with does not exist in the DOM."
---

I am writing this post because I often forget about this particular tip.

Scenario:
> You're working on an issue the requires to debug or style an element on a page that ONLY appears in the course of a hover or mouse-over event.  However, when the event is not occurring, the element you want to work with does not exist in the DOM.

That's a problem, ain't it?

Here's a great tip I picked up years ago, and I have never documented myself because it's not problem I run into daily.  I wish I knew who to attribute this to you.

To fix this problem, open your DevTools and write the following in the console.

```javascript
setTimeout(() => {debugger;}, 5000)
```  

Adjust the time accordingly, but you should have 5 seconds to cause the mouse-over or hover event to occur.  The debugger will kick in, preventing future updates to the DOM until you continue.

Yay!  You can now inspect the proper elements and make your changes.

