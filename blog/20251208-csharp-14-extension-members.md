---
title: "What's New in C# 14: Extension Members"
date: 2025-12-08T00:00:00Z
permalink: csharp-14-extension-members
description: "Explore how C# 14 extension members let you add computed properties to existing .NET types."
summary: "A hands-on look at using extension members to improve expressiveness and eliminate boilerplate in C#."
excerpt: "Explore how C# 14 extension members let you add computed properties to existing .NET types."
tags:
  - C#
  - .NET
  - Extension Members
categories:
  - "Development - C#"
image: /og/csharp-14-extension-members.png
---

If you've been writing C# for longer than you care to admit, you probably remember the moment extension methods landed in the language. It felt like someone quietly slipped a cheat code under the table. Suddenly we could add methods to types we didn't own. No subclassing. No wrappers. No modifying third-party libraries. Just… magic.

LINQ? Built almost entirely on extension methods. Fluent APIs? Extension methods. Half the helper utilities sitting in every enterprise codebase? Extension methods.

They were a revelation. And for a long time, they were enough.

But then you hit that one moment — every developer eventually does — where you think:

"Okay, this works… but it still feels wrong to call a method when what I really want is a property."

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

With C# 14's extension members, you get to model the feature correctly — as a property, not a method:

```csharp
public static class DateTimeExtensions
{
    extension (DateTime date)
    {
        public DateTime MondayOfCurrentWeek
        {
            get
            {
                int diff = (7 + (date.DayOfWeek - DayOfWeek.Monday)) % 7;
                return date.Date.AddDays(-diff);
            }
        }
    }
}
```

## Breaking Down the Syntax

If you're looking at that code and thinking "wait, that's not how extension methods work," you're absolutely right. Extension members use a completely different syntax. Let's break it down:

### The Declaration: Static Class with Extension Block

```csharp
public static class DateTimeExtensions
{
    extension (DateTime date)
    {
        // members go here
    }
}
```

- **public static class DateTimeExtensions** — Extension members must be declared inside a static class (similar to extension methods)
- **extension (DateTime date)** — The **extension** keyword followed by a parameter declaration in parentheses. This parameter represents the instance being extended
- **date** — Inside the extension block, you use this parameter name (not **this**) to access the instance

### Inside the Extension Body

Inside the extension block, you define members just like you would in a regular class:

```csharp
{
    public DateTime MondayOfCurrentWeek
    {
        get { ... }
    }
}
```

- **public DateTime MondayOfCurrentWeek** — A property declaration (no **this** parameter needed in the signature)
- **get { ... }** — Standard property getter syntax
- **date** — Inside the getter, you use the parameter name from the extension declaration to access the instance

### Key Differences from Extension Methods

| Extension Methods (Old) | Extension Members (New) |
|-------------------------|-------------------------|
| **public static class** with static methods | **public static class** with **extension(...)** block |
| **this DateTime date** parameter in method signature | **extension (DateTime date)** block parameter |
| Method syntax: **MondayOfCurrentWeek()** | Property syntax: **MondayOfCurrentWeek** |
| Static method calls | Instance property access |

The mental model shifts: instead of "a static method that takes **this** as the first parameter," you're defining "members that belong to the type, just defined elsewhere."

> **Important:** Extension members compile to static helper code — they don't modify the original type's metadata. From the compiler's perspective, they're still static methods (or static accessor methods for properties) in a helper class. The original type remains unchanged, but consumers get a more natural API experience.

Usage now matches the semantics perfectly:

```csharp
var monday = DateTime.Now.MondayOfCurrentWeek;
```

No parenthesis.
No method-call mental overhead.
No need to explain to the next developer why “MondayOfCurrentWeek()” looks like a method but represents a property.

This reads like part of the language — not bolted-on utility code.

> **Note on Overload Resolution:** Extension members follow normal overload resolution and member lookup rules. While having both a property and a method with the same name can create ambiguity in some scenarios, the compiler can resolve many cases through normal overload resolution. If ambiguity occurs, you can resolve it using fully qualified static invocation or **using static** directives. In practice, it's often clearer to use distinct names when providing both property and method variants (e.g., **MondayOfCurrentWeek** for the property and **GetMondayOfCurrentWeek()** for the method).

## Limitations & Gotchas

While extension members are powerful, there are some important constraints to keep in mind:

- **No Backing Fields / Computed-Only Properties:** Extension members cannot define backing fields or add state to the target type. This means properties in extension members must be computed on every access — you can't cache state or maintain a field. They remain stateless wrappers that compute values or perform operations based on the existing instance.

- **Generic Constraints:** Some generic scenarios or signature constraints from traditional extension methods may not translate directly to the new extension syntax. You may need to use traditional extension methods for certain advanced generic patterns.

## When to Use Extension Members vs. Extension Methods

- **Use Extension Members** when you want to model computed state or relationships as properties. They're ideal for "what is this?" scenarios.

- **Use Extension Methods** when you need parameters beyond the instance, or when working with complex generic scenarios that don't fit the extension member pattern.

Both syntaxes will continue to coexist — extension members complement, rather than replace, extension methods.

## Want to See More Examples?

If you want to explore extension members (and other C# 14 features) with hands-on, runnable demos, check out my [C# 14 Demos repository on GitHub](https://github.com/1kevgriff/Griffin.CSharp14Demos). It includes complete working examples with side-by-side comparisons of traditional approaches vs. the new C# 14 syntax.

## Closing Thoughts: A Small Feature That Unlocks a Lot

Extension methods were one of the best gifts C# has ever received. They reshaped how we write fluent APIs, how LINQ works, and how we build expressive code without inheritance chaos.

Extension members are the evolution of that idea — not a replacement, but the missing half.

They let your code read the way your brain already thinks.

If you care about clean API design, rich domain models, or writing code that feels more “English-like” and less “compiler-like,” extension members are going to slide right into your toolbox.

And I promise, once you use them a few times, you'll wonder how we lived without them.
