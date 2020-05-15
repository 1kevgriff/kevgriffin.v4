---
title: What is Dapper, and why you should consider it for your .NET projects
date: 2020-05-15 09:30:00
permalink: what-is-dapper
categories:
  - .NET
excerpt: "I have a pretty firm opinion that if you're using a relational database with .NET, you need to have Dapper in your stack."
---

On the speaking circuit, I've been doing a good number of presentations on Dapper.  My talk is entitled `Better Object Mapping in .NET with Dapper` and this is an attempt to catch the eyes of developers who might have heard of object mapping from things like Entity Framework.  

## What is Dapper?
Dapper is a `Micro-ORM` or `Micro Object Relational Mapper`.  

Maybe it's better to start at the beginning.  If you're using a relational database, such as SQL Server, MySql, or PostgreSQL, you probably have had to deal with the problem of "how do I turn a result set into an object I can actually do work with?"  

![](./images/whatisdapper_data_to_objects.png)

There are a ton of ways to do this currently:

### Write your own mapping from a result set.

This process is really tedious, and I've written my fair share of code that gets the `string` from ordinal position 0 and the `long` from ordinal position 52.

I'm not even going to show demo code, because I don't want you to write it.  Use Dapper.  

### Data Tables  

The first .NET project I worked on back in 2007 used DataTables exclusively for all data access.  This was to the extent where I believed DataTables were the ONLY way to get the results of a SQL Query.

And DataTables aren't too bad.  The biggest downside to them is that they're memory hogs, and using them with larger datasets can imped performance.

### Entity Framework

EF is the 6,000 pound gorilla in the room.  It's what Microsoft recommends using for data access.  And I have a lot of opinions on why I don't like Entity Framework for data access, but I don't feel this is the place nor the time.

By the way, it's great for demos.

### Other Micro ORMS

Here are some other ORMs that are interesting to look at:

- [Massive](https://github.com/FransBouma/Massive)
- [PetaPOCO](https://github.com/CollaboratingPlatypus/PetaPoco)
- [nHibernate](https://nhibernate.info)

## What makes Dapper special?

At its core, Dapper is simply a collection of extension methods off of a `SqlConnnection` object.

Here is an example of using Dapper to query the database and return a list of objects.

```csharp
using (var connection = new SqlConnection(CONNECTION_STRING))
{
    var sql = "SELECT FirstName, LastName, EmailAddress From [dbo].[Users]";

    var results = await connection
        .QueryAsync<ApplicationUser>(sql);
}
```

That's it.  No need to `.Open` the connection.  Just create it and call the `Query` or `QueryAsync` method.  

`cta:`

## It seems like you're over-simplfying?

I totally am.  But my goal here is to tell you what Dapper is meant to do.  

Most database operations you need to make: SELECT, UPDATE, INSERT, DELETE are supported with a couple lines of code.

Use Stored Procedures?  [No problem](/dapper-stored-procedures)

I also use Dapper in every single application I scaffold out.  It's *that* critical to my project success.

## Is it open-source?

Yes!  And even better, it's built by the good folks over at [StackOverflow](https://stackoverflow.com).  Maybe you've heard of it.  It's one of the most frequented websites on the internet, and they do not play around when it comes to performance.  

Dapper was created by their team in order to make mapping data to objects as painless as possible while being fast. [Check out their performance benchmarks](https://github.com/StackExchange/Dapper#performance)

## Give it a try!

If you're jumping into Dapper for the first time, take it easy!  There are a lot of great examples in the [GitHub repo](https://github.com/StackExchange/Dapper) for getting started.

If you run into problems, feel free to ask me on [Twitter](https://twitter.com/1kevgriff).  I'm happy to research your questions and write some detailed explainations on more complex use-cases.