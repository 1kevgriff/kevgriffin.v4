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

![SQL Result + Object](./images/whatisdapper_data_to_objects.png)

There are a ton of ways to do this currently:

### Write your own mapping from a result set

This process is really tedious, and I've written my fair share of code that gets the `string` from ordinal position 0 and the `long` from ordinal position 52.

~~I'm not even going to show demo code, because I don't want you to write it.  Use Dapper.~~

EDIT:  Ok - here's how'd you write it.

Imagine you have a (relational) database table called `Users`.  It has columns in it.

|Column|type|
|------|----|
|Id|bigint|
|FirstName|nvarchar(50)|
|LastName|nvarchar(50)|
|EmailAddress|nvarchar(255)|
|DateOfBirth|datetime|

If you wanted to query that content, you could simply write the following SQL:

```sql
SELECT Id, FirstName, LastName, EmailAddress, DateOfBirth
FROM [dbo].[Users]
```

And if you wanted to get that data into an object that is actually useful... you'd... well..

```csharp
public class ApplicationUser
{
    public long Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string EmailAddress { get; set; }
    public DateTime DateOfBirth { get; set; }
}
```

Yeah!  Write a `DataReader`...

```csharp
var sql = @"SELECT Id, FirstName, LastName, EmailAddress, DateOfBirth
        FROM [dbo].[Users]";

using (var connection = new SqlConnection(CONNECTION_STRING))
{
    await connection.OpenAsync();
    using (var reader = await connection.ExecuteReaderAsync(sql))
    {
        var applicationUsers = new List<ApplicationUser>();
        while (await reader.ReadAsync())
        {
            applicationUsers.Add(new ApplicationUser()
            {
                Id = reader.GetInt64(0), // ordinal position
                FirstName = reader.GetString(1),
                LastName = reader.GetString(2),
                EmailAddress = reader.GetString(3),
                DateOfBirth = reader.GetDateTime(4)
            });
        }
        return applicationUsers;
    }
}
```

Not bad, right?  Maybe not, until you're trying to retrieve a 10+ column result set.

Also, what if you want to change the order of your parameters?  You need to reorder the ordinal positions of your readers.

> Yes, you can get the ordinal by calling `reader.GetOrdinal("EmailAddress");`.  Please don't do that in the `.ReadAsync()` loop though.  Call it once outside of the loop and cache the results.  Calling `GetOrdinal` for each column on each row read is expensive and will slow down you application.

And the more obvious detail, you need to know the data types for the columsn you're retrieving!  Is it a string? Or a datetime?  Or an Int16, Int32, or Int64??  Wowza.


### Data Tables  

The first .NET project I worked on back in 2007 used DataTables exclusively for all data access.  This was to the extent where I believed DataTables were the ONLY way to get the results of a SQL Query.

And DataTables aren't too bad.  The biggest downside to them is that they're memory hogs, and using them with larger datasets can imped performance.

Example:

```csharp
var sql = @"SELECT Id, FirstName, LastName, EmailAddress, DateOfBirth
        FROM [dbo].[Users]";

using (var connection = new SqlConnection(CONNECTION_STRING))
{
    await connection.OpenAsync();
    using (var reader = await connection.ExecuteReaderAsync(sql))
    {
        DataTable table = new DataTable();
        table.Load(reader);

        var emailAddress = table.Rows[0]["EmailAddress"];
    }
}
```

Again - not bad!  This approach is more accessible (in my opinion) than the DataReader.

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

Remember our object?

```csharp
public class ApplicationUser
{
    public long Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string EmailAddress { get; set; }
    public DateTime DateOfBirth { get; set; }
}
```

Here's the Dapper approach to Querying and Mapping the results to an object (or in our case, a collection of objects).

```csharp
using (var connection = new SqlConnection(CONNECTION_STRING))
{
    var sql = "SELECT Id, FirstName, LastName, EmailAddress, DateOfBirth From [dbo].[Users]";

    var results = await connection
        .QueryAsync<ApplicationUser>(sql);
}
```

That's it.  No need to `.Open` the connection.  Just create it and call the `Query` or `QueryAsync` method.  

`cta:`

## What about parameters?  How do I avoid SQL injection?

That's a great question.  Let's go back to the `DataReader` example and see how it was done there:

```csharp
var sql = @"SELECT Id, FirstName, LastName, EmailAddress, DateOfBirth
                    FROM [dbo].[Users] WHERE FirstName = @firstName";

using (var connection = new SqlConnection(CONNECTION_STRING))
{
    await connection.OpenAsync();
    using (var command = connection.CreateCommand())
    {
        command.CommandText = sql;
        command.Parameters.AddWithValue("firstName", "Kevin");

        using (var reader = await command.ExecuteReaderAsync())
        {
            var applicationUsers = new List<ApplicationUser>();
            while (await reader.ReadAsync())
            {
                applicationUsers.Add(new ApplicationUser()
                {
                    Id = reader.GetInt64(0), // ordinal position
                    FirstName = reader.GetString(1),
                    LastName = reader.GetString(2),
                    EmailAddress = reader.GetString(3),
                    DateOfBirth = reader.GetDateTime(4)
                });
            }
            return applicationUsers;
        }
    }
}
```

What's the difference?  First, the SQL statement has a WHERE clause in it.  I've added a parameter with the `@firstName` identifier.

> Note: Please please please parameterize your SQL queries. This is one of the easiest things you can do to protect your databases.  

In order for the query to work, you need to pass the parameter value to the data reader.  I had to take an extra step by creating a full `SqlCommand` instead of just executing a reader.  Not a big deal - but it's necessary to add parameters.

`command.Parameters.AddWithValue("firstName", "Kevin");` tells the command which parameter I want to map to and the value to use for it.

Now!  Let's do the same with Dapper.

```csharp
var sql = @"SELECT Id, FirstName, LastName, EmailAddress, DateOfBirth
        FROM [dbo].[Users] WHERE FirstName = @firstName";

using (var connection = new SqlConnection(CONNECTION_STRING))
{
    var results = await connection
        .QueryAsync<ApplicationUser>(sql, new { firstName = "Kevin" });
}
```

The next parameter of `QueryAsync` (or many other Dapper methods) is a parameter object.

I'm passing an anonymouse object for my parameters, and Dapper will assist with telling the database that I want `@firstName` to map to `Kevin`.  I don't need to worry about any of that work.

## It seems like you're over-simplfying?

I totally am.  But my goal here is to tell you what Dapper is meant to do.  

Most database operations you need to make: SELECT, UPDATE, INSERT, DELETE are supported with a couple lines of code.  I'm planning several follow up posts that cover scenarios around these topics, but I felt this article would become more reference than "hey, this is a tool I like and you should check it out."

>[Rob](https://twitter.com/robconery) made a great point earlier, I'm not really diving in deep enough into **mapping**.  There is a rabbit hole of use-cases where Dapper can be combined with other awesome libaries, like [AutoMapper](https://github.com/AutoMapper/AutoMapper).  I'm not diving in deep here, but it seems like a great idea for future posts.

Use Stored Procedures?  [No problem](/dapper-stored-procedures)

I also use Dapper in every single application I scaffold out.  It's *that* critical to my project success.

## Is it open-source?

Yes!  And even better, it's built by the good folks over at [StackOverflow](https://stackoverflow.com).  Maybe you've heard of it.  It's one of the most frequented websites on the internet, and they do not play around when it comes to performance.  

Dapper was created by their team in order to make mapping data to objects as painless as possible while being fast. [Check out their performance benchmarks](https://github.com/StackExchange/Dapper#performance)

## Give it a try!

If you're jumping into Dapper for the first time, take it easy!  There are a lot of great examples in the [GitHub repo](https://github.com/StackExchange/Dapper) for getting started.

If you run into problems, feel free to ask me on [Twitter](https://twitter.com/1kevgriff).  I'm happy to research your questions and write some detailed explainations on more complex use-cases.