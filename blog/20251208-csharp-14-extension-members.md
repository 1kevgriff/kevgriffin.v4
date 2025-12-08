---
title: "What's New in C# 14: Extension Members"
date: 2025-12-08T00:00:00Z
permalink: csharp-14-extension-members
description: "What's new in C# 14: Extension Members"
summary: "What's new in C# 14: Extension Members"
tags:
  - C#
  - .NET
  - Extension Members
categories:
  - "Development - C#"
---

If you’ve been writing C# for longer than you care to admit (hi, friend), you probably remember the moment extension methods landed in the language. It felt like someone quietly slipped a cheat code under the table. Suddenly we could add methods to types we didn’t own. No subclassing. No wrappers. No modifying third-party libraries. Just… magic.

LINQ? Built almost entirely on extension methods. Fluent APIs? Extension methods. Half the helper utilities sitting in every enterprise codebase? Extension methods.

They were a revelation. And for a long time, they were enough.

But then you hit that one moment — every developer eventually does — where you think:

“Okay, this works… but it still feels weird to call a method when what I really want is a property.”

And C# finally did something about it.

Let's walk through that feeling using a tiny example we all know and love: working with dates.

## An Example of Extension "Methods"

One of the small but constant irritations of working with dates is needing the start of the current week. For most business logic, that means “Monday of this week.”

You can write inline code for it every time, but we’re adults with careers — we don’t need to keep rewriting the same 4–7 lines of date math.

So with extension methods, you'd probably write something like:

```csharp
public static class DateTimeExtensions
{
    public static DateTime MondayOfCurrentWeek(this DateTime date)
    {
        int diff = (7 + (date.DayOfWeek - DayOfWeek.Monday)) % 7;
        return date.Date.AddDays(-diff);
    }
}
```

```csharp
var monday = DateTime.Now.MondayOfCurrentWeek();
```

This is clean enough. It solves the problem. No muss, no fuss.

Except… it still has that feeling:

**“I’m calling a method, but what I really want is a property of this date.”**

## Why It Would Be More Natural to Have a Property

Conceptually, “Monday of this week” isn’t something you do to a date.
It’s not an operation.
It’s not a verb.

It's a relationship:

“Given this date, what’s the Monday that anchors its week?”

As developers, we express concepts like this as properties — not actions:

```csharp
var monday = date.MondayOfCurrentWeek;   // ← what we wanted all along
```

But historically, C# forced us to fake that semantics with a method.

It worked, but it never felt quite right.

This is exactly the conceptual gap that extension members were designed to fill.

## Sample Example, but with Extension Members

With C# 14’s extension members, you get to model the feature correctly — as a property, not a method:

```csharp
extension DateTimeExtensions for DateTime
{
    public DateTime MondayOfCurrentWeek
    {
        get
        {
            int diff = (7 + (this.DayOfWeek - DayOfWeek.Monday)) % 7;
            return this.Date.AddDays(-diff);
        }
    }
}
```

## Breaking Down the Syntax

If you're looking at that code and thinking "wait, that's not how extension methods work," you're absolutely right. Extension members use a completely different syntax. Let's break it down:

### The Declaration: `extension ... for ...`

```csharp
extension DateTimeExtensions for DateTime
```

- **`extension`** — This is the new keyword that declares an extension type
- **`DateTimeExtensions`** — The name of your extension (like a class name, but it's not a class)
- **`for DateTime`** — The type you're extending (the `for` keyword connects the extension to the target type)

This replaces the old pattern of `public static class DateTimeExtensions` with static methods.

### Inside the Extension Body

Inside the extension, you define members just like you would in a regular class:

```csharp
{
    public DateTime MondayOfCurrentWeek
    {
        get { ... }
    }
}
```

- **`public DateTime MondayOfCurrentWeek`** — A property declaration (no `this` parameter needed in the signature)
- **`get { ... }`** — Standard property getter syntax
- **`this`** — Inside the getter, `this` refers to the instance of `DateTime` you're extending

### Key Differences from Extension Methods

| Extension Methods (Old) | Extension Members (New) |
|-------------------------|-------------------------|
| `public static class` | `extension ... for` |
| `this DateTime date` parameter | `this` keyword inside body |
| Method syntax: `MondayOfCurrentWeek()` | Property syntax: `MondayOfCurrentWeek` |
| Static method calls | Instance property access |

The mental model shifts: instead of "a static method that takes `this` as the first parameter," you're defining "members that belong to the type, just defined elsewhere."

Usage now matches the semantics perfectly:

```csharp
var monday = DateTime.Now.MondayOfCurrentWeek;
```

No parenthesis.
No method-call mental overhead.
No need to explain to the next developer why “MondayOfCurrentWeek()” looks like a method but represents a property.

This reads like part of the language — not bolted-on utility code.

> **Note:** Extension methods and extension properties must have unique names. You cannot overload them or share names between methods and properties.
>
> For example, you cannot have both:
> - `MondayOfCurrentWeek` as an extension property
> - `MondayOfCurrentWeek()` as an extension method
>
> The compiler requires that extension member names be unique within the same extension scope. This means if you want to provide both a property and a method version, you'll need to use different names (e.g., `MondayOfCurrentWeek` for the property and `GetMondayOfCurrentWeek()` for the method).

## Want to See More Examples?

If you want to explore extension members (and other C# 14 features) with hands-on, runnable demos, check out my [C# 14 Demos repository on GitHub](https://github.com/1kevgriff/Griffin.CSharp14Demos). It includes complete working examples with side-by-side comparisons of traditional approaches vs. the new C# 14 syntax.

## Closing Thoughts: A Small Feature That Unlocks a Lot

Extension methods were one of the best gifts C# has ever received. They reshaped how we write fluent APIs, how LINQ works, and how we build expressive code without inheritance chaos.

Extension members are the evolution of that idea — not a replacement, but the missing half.

They let your code read the way your brain already thinks.

If you care about clean API design, rich domain models, or writing code that feels more “English-like” and less “compiler-like,” extension members are going to slide right into your toolbox.

And I promise, once you use them a few times, you'll wonder how we lived without them.
