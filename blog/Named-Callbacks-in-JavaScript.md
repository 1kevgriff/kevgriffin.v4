---
title: Named Callbacks in JavaScript
categories:
  - Development
permalink: named-callbacks-in-javascript
date: 2013-08-06 06:30:49
summary: Lorem
---

You've been taught bad JavaScript for years and years.  What do I mean?  I'm sure you've written code like this more than once in your career:

```js
someMethod(function (){
     console.log("doing stuff...");
});
```

So what's wrong with that?  It runs and doesn't error.  Heck, even JSLint won't complain about it.  But what happens something goes wrong inside of your callback?  Most debuggers will list the callback as an "anonymous method" in the call stack.  Not very helpful is it?  Isn't there something simple we can do make our callbacks easier to read in a call stack?

<strong>NAME YOUR CALLBACKS.</strong>

Take the example above, and let's name the callback.

```js
someMethod(function myCallback(){
     console.log("doing stuff...");
});
```

Simple!  Let's imagine doing a jQuery AJAX call with this approach (and yes, I'm ignore the fact that you should use promises -- which are WAY better):

```js
$.ajax({
  url: "/myUrl",
  success: function onAjaxSuccess (data){
           },
  error: function onAjaxError (error) {
           }
});
```

You're welcome :)
