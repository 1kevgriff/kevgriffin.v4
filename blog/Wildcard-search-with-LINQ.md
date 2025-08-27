---
title: "Wildcard search with LINQ"
categories:
  - "Development - C#"
permalink: wildcard-search-with-linq
date: 2009-04-21T09:17:26Z
summary: "An example of wildcard search with LINQ"
description: "Learn how to perform wildcard searches using LINQ to Entities with the Contains() method as an alternative to SQL LIKE operations."
tags:
  - LINQ
  - C#
  - Entity Framework
  - Database
---

I just a situation where I needed to perform a wildcard search on a table in my database.  When I used to do ADO.NET, I would simply write my SELECT statements with LIKE keywords to do wildcard searches.

However, in this project, I'm using LINQ to Entities and the solution didn't work the same way as it did back in SQL land.  My alternative was to use the .Contains() method.

For example:

```csharp
var userList = from u in entity.Users
where u.FirstName.Contains(searchParameter) ||
u.LastName.Contains(searchParameter)
select u;
```

Hope this helps if you ever run into this problem.
