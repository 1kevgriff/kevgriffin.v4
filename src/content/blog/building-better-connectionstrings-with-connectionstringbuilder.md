---
title: Building better ConnectionStrings with ConnectionStringBuilder
description: "ConnectionStringBuilder makes it fool-proof to generate connection strings."
categories:
  - "Development - C#"
permalink: building-better-connectionstrings-with-connectionstringbuilder
date: 2011-02-14 05:00:02
summary: "ConnectionStringBuilder makes it fool-proof to generate connection strings."
---

Okay, I never admitted to being a .NET guru or anything, and that’s why I get so excited whenever I run across a gem in the framework that allows me to do something easier and with fewer issues.

ConnectionStrings has always been one of those things I did the hard way.  For example, I would have a line of code that was like so:

```csharp
string connectionString =  "Data Source={0};Initial Catalog={1};User Id={2};Password={3};";
string.Format(connectionString, serverName, databaseName, userName, password);
```

This seemed like a logical way to build my connection strings.  However, it wasn’t very flexible.  That was until I discovered the suite of ConnectionStringBuilder classes.

Let’s take the above OleDb connection string and use the OleDbConnectionStringBuilder to build it.

```csharp
System.Data.OleDb.OleDbConnectionStringBuilder oleDbConnectionStringBuilder  =
            new OleDbConnectionStringBuilder();
oleDbConnectionStringBuilder.DataSource = "myServer";
oleDbConnectionStringBuilder.FileName = "myAccessFile.mdb";
oleDbConnectionStringBuilder.ToString();
```

Look at how much cleaner that is!  Maybe you’re working with a SQL Server database:

```csharp
System.Data.SqlClient.SqlConnectionStringBuilder connectionStringBuilder =
                new SqlConnectionStringBuilder();
connectionStringBuilder.DataSource = "myServer";
connectionStringBuilder.InitialCatalog = "databaseName";
connectionStringBuilder.UserID = "userName";
connectionStringBuilder.Password = "password";
connectionStringBuilder.ToString();
```

Isn’t that awesome?!  Now, finally, let’s imagine you’re doing all this with Entity Framework:

```csharp
System.Data.EntityClient.EntityConnectionStringBuilder entityConnectionStringBuilder =
                new EntityConnectionStringBuilder();
entityConnectionStringBuilder.ProviderConnectionString = connectionStringBuilder.ToString();
entityConnectionStringBuilder.Metadata = "(entity framework metadata here)";
entityConnectionStringBuilder.ToString();
```

There you go!  Instead of hand writing your connection strings, take a look to see if there is a StringBuilder class that’ll do the work for you.
