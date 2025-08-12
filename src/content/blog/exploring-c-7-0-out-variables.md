---
title: "Exploring C# 7.0: Out Variables"
permalink: exploring-csharp70-out-variables
categories:
  - "Development - C#"
tags:
  - .net
  - dotnet
  - asp.net
date: 2016-11-08 18:41:48
summary: "New in C# 7.0 - out varibles will save you some time!"
---

Using the out keyword within C# is nothing new. If you declare a variable within a method called with **out**, you are instructing the compile that you are expecting the method to set the values of those at runtime.

```csharp
class Program
{
  static void Main(string[] args)
  {
    string firstName;
    string lastName;

    CreateName(out firstName, out lastName);
    Console.WriteLine($"Hello {firstName} {lastName}");
  }

  private static void CreateName(out string firstName, out string lastName)
  {
    firstName = "Kevin";
    lastName = "Griffin";
  }
}
```

Commonly the problem is that you have to declare the variable before the method call using out. In C# 7.0, there is the concept of out variables, which will save you a couple keystrokes by allowing you to declare the variable inline.

The above example can be quickly refactored:

```csharp
class Program
{
  static void Main(string[] args)
  {
    // notice I'm declaring the type INSIDE THE CALL!
    CreateName(out string firstName, out string lastName);
    Console.WriteLine($"Hello {firstName} {lastName}");
  }

  private static void CreateName(out string firstName, out string lastName)
  {
    firstName = "Kevin";
    lastName = "Griffin";
  }
}
```
