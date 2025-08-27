---
title: "How do you call a stored procedure with Dapper?"
date: 2020-05-15T08:30:00Z
description: "Learn how to use Dapper with stored procedures in .NET applications, including both query and non-query scenarios."
summary: "Are you interested in using Dapper, but your database uses Stored Procedures? No problem!"
tags: ["Dapper", "stored procedures", "C#", ".NET", "database", "SQL Server"]
permalink: dapper-stored-procedures
categories:
  - .NET
excerpt: "Are you interested in using Dapper, but your database uses Stored Procedures?  No problem!"
---

During one of my latest renditions of [Better Object Relational Mapping with Dapper](), the question arose about using stored procedures.

How do you call a stored procedure with Dapper?

```csharp
using (var connection = new SqlConnection(CONNECTION_STRING))
{
    var storedProcedureName = "getAllUsers";

    var results = await connection
        .QueryAsync<ApplicationUser>(storedProcedureName, 
                                commandType: CommandType.StoredProcedure);
}
```

Looking at the code above, calling a stored procedure is similar to calling any other query with Dapper.


But what if your Stored Procedure doesn't return a result?  No problem.  `ExecuteAsync` works just as well.

```csharp
using (var connection = new SqlConnection(CONNECTION_STRING))
{
    var storedProcedureName = "deleteAllUsers";

    await connection.ExecuteAsync(storedProcedureName, 
                            commandType: CommandType.StoredProcedure);
}
```  

And there you go!  Using stored procedures with Dapper can be a great way to take advantage of the strengths of the database while reducing complexity of your code.

