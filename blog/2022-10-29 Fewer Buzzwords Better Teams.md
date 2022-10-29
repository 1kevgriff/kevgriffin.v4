---
title: Fewer Buzzwords, Better Teams
date: 2022-10-30 08:00:00
permalink: fewer-buzzwords-better-teams
categories:
  - Arcitecture
  - Thought Leadering
  - CTO
summary: "Our team with one product grew to include two new teams.  This meant more people, larger tech stack, and more complexity when it came to support and future growth."
excerpt: "Our team with one product grew to include two new teams.  This meant more people, larger tech stack, and more complexity when it came to support and future growth."
---

I read a post the other day about how some larger organizations allow their teams to choose which technologies they want to use individually. With teams managing different parts of a system, one group might use something boring but stable, like a C# or Java, and another might use something more mainstream, like Rust or Go.

Over the past year, one of the companies I work with acquired not one but two companies. This acquisition meant new team members, new code bases, and different technology stacks.

My dilemma has been how to best support the organization with different technologies in our stack. 

## The Stacks

Let's put it this way:  Stack one (the alpha stack) is .NET 6.0 running on Microsoft Azure services. Our data persists in SQL Azure and Redis, and we're heavily invested in Azure services to scale effortlessly. Our front-end stack is a goliath of Razor, Angular, React, and Vue (in our defense, we're migrating to Vue 100% or Blazor, I'm still determining).  

Stack two (the beta stack) is NodeJS/Express service running in EC2 services on AWS (it was like half a dozen services on separate EC2). Data persists in hosted MongoDB and AWS S3. The front end is all Angular.

Stack three (the gamma stack) is a niche product, and it's mostly C++ running directly on clients. 

## Support
There is an expectation of support for the products we maintain. I don't mean pager duty "get out of bed" help, but "this needs to be addressed as soon as possible" support. Generally not an issue because we have a person on each team to deal with the situation.

People get sick. People take time off. 

Support is sometimes shaky because alpha stack team members need help to jump on the beta stack or vice versa quickly.  

We've been fortunate not to have an issue.

But if everything were ONE stack, support would be much easier as any team member could jump on any aspect of the product.

## Growth
Recently, I've been going through the exercise of interviewing folks to join our team.

As you can imagine, there is a lengthy conversation about the skill set that I'm expecting of a person to join the team. It would be nice if the future team member had all the alpha and beta stack checkboxes.

![Unicorn](https://media.giphy.com/media/s4bIoJ3U3Ilri/giphy.gif)

You have probably seen or joked about how tech companies want 5+ years of experience in 30 technologies, which is never the case. Instead, head hunters throw out every possible buzzword in hopes of landing qualified applicants.

Our team should have a small, concise list of technologies we support across our products.  

> Note: for this discussion, I'm excluding the gamma team (C++) because it's pretty flippin' impossible to find someone that does C#, NodeJS, React-Angular-Vue, etc., AND C++. They'd probably command a high rate if you were to see this magically awesome person. Budget killer!

## Standardization

You've probably figured out where I'm going with this, and I've decreed that our alpha and beta stacks will standardize on a single stack. Specifically, we are going to be a .NET shop. There are various reasons, but most of our product is in the alpha stack, which makes sense.  

Standardization will take time to happen. Some team members will require training and mentoring, and others might leave altogether. As an organization, we're willing to make the sacrifices necessary to ensure the products have the best stewardship possible.

I am not pushing standardization on the gamma stack, though. It's not a valid use case for us, and it's too different of a product that I would be irresponsible to move it to another stack.

## Experimentation

Standardizing the tech stack doesn't mean we'll be writing it stone.

![commandments](https://media.giphy.com/media/11XcgX9MWV3a8M/giphy.gif)

I'm a firm believer in the best tool for the job. I want to encourage the teams to experiment with new tech and recommend whether the group should integrate the latest tech into the stack. The unit can collectively decide, as everyone would be required to train on the new platform.

Along the same lines, the team should continuously discuss whether any part of the tech stack should be deprecated and removed. Just because we're using it doesn't mean it is still valid. Can the tech be substituted with something else in our stack without degrading performance or support?

## Is this the right approach?

Maybe? It's a nice pipedream to assume that independent teams would be able to make the best decisions for themselves. But those organizations have larger budgets and annual revenue than we do, and I'd treat a 100+ person development team differently than a 7-person development team.

While some team members appreciate and welcome the new stuff, they'll get to learn, and others are pushing back. Eventually, we'll need to resolve potential problems, even if that means replacing team members.

For our group, I need to ensure that every cog in the engine is interchangeable with each other. People should be able to be sick or take a day off without feeling like they're leaving a critical part of the engine broken.

## What do you think?

I'm interested in your opinion! Have you been on a team that standardized on a different tech stack than your own?
