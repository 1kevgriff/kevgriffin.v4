---
title: "Azure Cloud Talk Podcast: The Accidental CTO"
date: 2025-03-03 12:00:00
permalink: azure-cloud-talk-accidental-cto
summary: "I joined Azure Cloud Talk to chat about my journey as an 'accidental CTO' and share some honest thoughts on AI tools (including my love-hate relationship with Cursor Composer). We talked about the real challenges of software development, why I prefer stable brownfield projects over shiny new tech, and my controversial take that building greenfield software is like having a newborn – painful but somehow we forget and do it again."
excerpt: "I joined Azure Cloud Talk to chat about my journey as an 'accidental CTO' and share some honest thoughts on AI tools (including my love-hate relationship with Cursor Composer). We talked about the real challenges of software development, why I prefer stable brownfield projects over shiny new tech, and my controversial take that building greenfield software is like having a newborn – painful but somehow we forget and do it again."
categories:
  - Azure
  - AI
  - Podcast
tags: ["career", "CTO", "leadership", "technology"]
---

I jumped on Azure Cloud Talk recently with Alec Harrison and Brian Gorman to talk tech from my perspective as an "accidental CTO." We got real about AI tools, and I vented about my struggles with Cursor Composer - there have been times I'm literally yelling at my screen, "Why can't you figure this out? You're going around in circles!"

Alec's found some real productivity gains with AI for routine tasks, but I've hit that frustrating loop too many times where I could've just done the work myself instead of wrestling with AI for hours. During our chat, I found myself nodding along with Brian's take on tech adoption - skip the bleeding edge and wait for things to mature. From my experience, new tech needs to either save money or improve workflow - not just be shiny for the sake of being shiny.

My hot take of the episode? Comparing greenfield software development to having children - it's constant chaos and upkeep for at least eight years before you think about doing it again! This explains why those old COBOL banking platforms stick around: "It's not the five or six major use cases you could think of, it's the 50,000 edge cases you haven't considered yet."

Throughout my career, I've learned that technology choices must serve business needs first. The folks paying me don't care about our tech stack—they just want solutions to their problems. That's why my team's recent UI architecture upgrade wasn't for our technical satisfaction but because implementing new business features in our old system had become too cumbersome. In an industry obsessed with the next shiny object, I've found success by focusing on business value rather than technological novelty.

<iframe height="200px" width="100%" frameborder="no" scrolling="no" seamless src="https://player.simplecast.com/b8eb1619-0be1-4f4a-8b71-9633b9fc7dd8?dark=false"></iframe>

## Azure Cloud Talk Transcript

**Alec Harrison:** We're live. Welcome to the next installment of Azure Cloud Talk. I'm one of your co-hosts, Alec Harrison, here with Brian, and our special guest, now clearly reigning MVP for most popular guest, Kevin Griffin. How's it going, Kevin?

**Kevin Griffin:** Hey, I'm good, guys. Thanks for thinking of me. I love you guys. I'm the unofficial third co-host.

**Alec Harrison:** Right? You pretty much are. In fact, I think pretty soon, if I wouldn't have been here today, you might've even overtaken me. It'd be pretty close.

**Kevin Griffin:** I know about you. We're playing now.

**Alec Harrison:** Nice. Now, MVP contributions are coming up here pretty soon, right on the horizon. Kevin's gonna put "Optional alternative co-host to Azure Cloud Talk." I don't even think I listed it, to be honest. So if Kevin listed it and I don't, that would be just funny.

**Kevin Griffin:** That's a good point. I forgot I should add these podcasts to my profile.

**Alec Harrison:** You really should. They're contributions.

**Kevin Griffin:** Me too, except I don't keep up with how many times I've actually been here.

**Alec Harrison:** Simplecast is a fun thing where we can log the guests, but I don't think there's an easy way to search it. Every time I put a new episode out, I make sure to log, even if it's just me and you, Brian, to log us as contributors, because I think some podcast platforms will show that. But I don't know if Simplecast makes an easy way to search that, to be like "Get me all the episodes Brian was on."

**Kevin Griffin:** Sounds like a job for a Copilot agent.

**Alec Harrison:** Yeah. We had some fun. I was just at two different user groups. We were talking about AI and responsible AI. I was talking to a recruiter about recruiting companies to sponsor user groups, which is awesome. It's another way to get their name out there, network with people in the community, bring people together. They flew somebody up from Tampa who works at Microsoft now. I think, Kevin, you might've been connected with him. Brian Swigger? Sweagener? I could be wrong.

**Kevin Griffin:** Oh, it sounds familiar. I'm not placing a face, though, so maybe.

**Alec Harrison:** He gave a talk on AI. I was just having a fun conversation with the recruiter, because I do generative AI every day. It's cool, it's fun. But I would be so woefully underqualified for a traditional AI data scientist role, because what I'm doing today is basically observability, and then just doing iterations. So you have your open AI, all that stuff. So it's just enough AI that I can sound competent to people who don't know AI. But I'm sure as soon as a data scientist or an ML expert would talk to you, they'd be like "You're an idiot. Go away."

**Kevin Griffin:** Is ML and data science really AI, though?

**Alec Harrison:** Well, and that's the other thing. That's sometimes an AI role but I would argue it's not, because even on the ML and data side, you have the data pipelines to even get your data into a place and state that you can get it. You could be an ETL person as your whole career. Are you a data scientist, then, by just moving data around and getting it into a uniform format?

**Kevin Griffin:** It's almost like the backend and the front-end again. The AI that we typically say is kinda more the front-end, and the back end is more the data science. I don't know. Maybe I'm crazy. It's whatever you can convince someone to pay you for. If you can convince someone to call you a data scientist and pay you for it, then cool, job done.

**Alec Harrison:** It's crazy, because I think there's this FOMO, along with some companies actually starting to report real productivity gains with AI. They're showing that "Hey, we are X percent more productive." I don't know about you guys, development-wise, AI's been a huge boost for me, especially with boilerplate junk. I can just tab and actually get to the real problem.

**Kevin Griffin:** I would push back on that. Me and Cursor Composer agent mode have been having words. Literally before jumping on this recording, I'm fighting with Composer, saying "Do you bleep on this?" Because you'd be like "What the... why can't you figure this out? You're going around in circles. You're so close to the solution, and then you right turn. Just go in a different direction. You are so close to figuring this out." And it's to the extent where I'm like "Man, have I just spent so much time fighting with the AI that I could've just done the work?"

**Alec Harrison:** Yep.

**Kevin Griffin:** I don't know if it's a productivity gain. Maybe I'm just working on harder problems. And it's all about prompt writing and giving the right context, and I feel I'm doing all that stuff.

**Alec Harrison:** I've been doing a lot since Rider has the GitHub Copilot connector now. So you can do GitHub Copilot chat, and the client I'm at pays for GitHub Copilot licenses for everybody. If you ask it to do something, it always gives you the very generic... This is in C# too. The super generic using block, the thing you're trying to do, and it does it. One thing it seems to fall short on, and I don't know if it's a Rider thing, but no matter what context I give it, it almost never throws it in unless it generated the using block first, and I just copy and paste that verbatim.

But to your point, I've been doing some fairly basic stuff, reading from a file. I don't wanna Google how to use that package. Or parsing a string with regex. I can just be like "Here's the string I wanna parse out." It's been amazing, because I just copy-paste. I don't leave my IDE. I'm off to the races. When you start getting into some deeper stuff, it does struggle from time to time. But for the most part of what I do, it's just a matter of instead of me typing it out, I can just tab and get slow micro gains. That would have taken me a minute to type the same definition, but instead it took me two seconds, and it's there.

**Kevin Griffin:** I've been doing deeper work with AI. Using Cursor's Composer agent, I'll say, "Here is a Swagger definition for an API I have. I want you to generate the TypeScript connector for it, and I want you to go over to this view component. I want you to go call the API, get the data back, and I want you to use this obscure component that I have to populate it." And I would actually give it a fairly well-written prompt, and it will go do it. What I love about HMO is you can just press go, go get a cup of coffee. And when you come back, it's like "Hey, I've updated five, six files. Go take a look."

The problem I had before I got here was I gave it context of a bunch of SQL tables, and I said, "I need to write a query." In this query, I was very specific about it. You need to know about this little piece of context, this context. Go pull these rows. Go pull those rows. You need to do the sandwich-joining thing, because I really need one row that has all this information in it. You can figure this out. You're smart. I believe in you, AI.

And it goes off. It does something that looks like the result. And I think this is gonna be the key for anyone using AI. You have to be smart enough to look at the result and go, "That's wrong." And it even helps if you know why it's wrong. So you can go back to the AI and be like "Hey, you did this wrong."

The most frustrating thing that AI does - I actually might need to go check my precondition custom prompt to say... It goes, "Quote, I see the problem." I'm like "No, you don't, because you screwed it up again." I have a love-hate relationship with AI. It will say that every time. "Oh, I see the issue. Oh, I see the issue. Oh, I see the issue." Well, if you were so dang smart, why didn't you see that before you said you were done?

**Brian Gorman:** Right. Why did you have to give me something and then say, "Oh, yeah, there's an issue in my code"? Well, fix it the first time.

**Alec Harrison:** I love when you do that and it keeps going back and forth, giving you the same answer that it just gave you, and you just get stuck in a loop. "No, you don't," because we're in the loop of, "You see the problem. No, no, you don't. Oh, yeah, here's the..." And then you're just in this loop. "It's A. No, it's B. No, it's A. No, it's B."

**Kevin Griffin:** And it starts regenerating code that you already said was wrong. It's circular dependency of itself.

**Alec Harrison:** One thing that was brought up that I thought was interesting is there was people in the back of one of my user groups talking about how do you cheaply... The talk that Brian gave, not Brian Gorman, was about multi-agent conversation. Scott Hanselman showed a video of this. I'll try to link it in there. But basically people reinvented dial-up for agent-to-agent communication on different devices.

**Kevin Griffin:** I saw that. Yup.

**Brian Gorman:** Yeah.

**Alec Harrison:** But what you can do with multi-agents is basically behind the scenes, they can all communicate with each other. The downside to that is they can talk basically at the speed of light and you're paying per token. And if you don't give them a proper exit condition, your bill just went up. So I think there's two questions I have for you guys:

1. How do you continue to experiment and learn when new things come out and not break the bank? Because it's probably not your day job to learn.
2. In your careers, how has that helped propel you to where you are today? Kevin, you're an accidental CTO. Brian, I don't think when you first started off your goal was to be a trainer and teach people stuff. It just ended up there. How have you guys done that without losing everything because you spent so much money on just trying to keep up with tech and all the cool shiny learning tools?

**Brian Gorman:** Well, I can tell you that I had an epiphany about becoming a trainer about three or four years into my career as a full-time developer. Somewhere in there, I was commuting back and forth between Des Moines and Ames at the time, and I just remember thinking that I just really enjoy teaching and not as much the doing. "Those who can't do, teach," right? That's the old saying. But no, it was just dumb luck that I got into it.

You said something that really rang true to me. When Azure first came out, Azure was not free. So I actually found alternatives to Azure early on. There was a place called App Harbor where you could host your apps, and it was $10 a month to get a SQL server and $10 a month for a domain, and the rest of it was free. It was a charge that was constant and guaranteed. So you didn't have to worry about what changed. App Harbor was actually just a wrapper around AWS, I think. They just hosted AWS services as their own platform, became a middleman, which was honestly a genius decision on their part.

It was great. I even had in my MVC course that I created, somewhere in the 2015 range, I specifically said, "We're gonna do App Harbor because I can get a free SQL server that's basic from them." Or if you really wanted to, you could get a more powerful MySQL instance for $10 a month.

So as Azure matured and Microsoft matured around the Azure ecosystem, they started doing things like if you got a Visual Studio subscription, you can get $50 a month or $100 or $150 a month, which lowered the barrier of entry. But it still wasn't free if you didn't have those. And as an independent at the time, I didn't have those. So I was still avoiding it until I got on as a full-time developer again. And then I was like "Oh, now I can use Azure."

In the last few years, Azure has gotten to the point where it's nearly free to do a lot of stuff. You still have some experimental stuff that has cost, but getting an app service in Azure now or getting a static web app is generally free unless you wanna do more production level with it. Which is crazy. That's awesome. That's what it needs to be.

So where I'm going with all this is, you're saying, "How do I learn AI without breaking the bank?" You stay up with what's going on as much as you can. You see what other people are doing in their videos. And as it matures and the cost lowers and the barrier of entry lowers, or there's more robust control around what you're spending, so you don't spend $5,000 a month storing your voice on a server somewhere, then you can start doing more with it to not break the bank.

**Alec Harrison:** I don't know anybody who did that. On accident. Not on purpose. Yeah, I misunderstood the pricing. And there is a hosting your voice fee for custom voice. I've been told that was a steal of a deal in that industry, but that was almost two years ago now. With Riverside being able to do that, ElevenLabs, all these different companies, I imagine the cost to do custom voice has probably dropped exponentially because AI has.

**Brian Gorman:** Right. And that's exactly what I'm saying. The prices will go down. Unless you get ChatGPT-4.5, apparently.

**Alec Harrison:** All the price on that. That sucker's crazy.

**Brian Gorman:** Isn't that unbelievable? Okay, we'll wait to use that.

**Alec Harrison:** Isn't it 30 times more expensive than 4.0?

**Brian Gorman:** I think it was $5 a month for 4.0. It's $75 a month for 4.5. Orders of magnitude more expensive.

**Alec Harrison:** But in three months it'll be down to the $5.

**Brian Gorman:** There we go. That's what I'm saying. Wait three months and then you can play with a new model.

**Alec Harrison:** Yeah. The work I do, we use GPT-4.0 mini because it's good enough. And you're talking cents for millions of tokens, not dollars. I think that's the other thing people get caught up in, they want to get caught up in the hype, in the latest and greatest thing. Like "oh my goodness, the multi-model conversation." The takeaway of the talk last night was, don't do this unless you need to. Because every model that you add is gonna increase your cost. As they talk to each other, it increases your cost.

I would put it the same as going microservices when you really only have one core business function. You could do that, but by the time you get microservices or micro frontends on top of that, your orchestration is heavier than the actual work you're doing. And that pyramid doesn't stand.

**Brian Gorman:** I think my general philosophy is I don't do bleeding edge. I had that period in my life where I was trying to be as bleeding edge as possible, and then I just found myself in this situation where I had too much work to do. So I didn't really have the luxury of sitting around just trying bleeding edge stuff. I had to get paid. And it's a special type of person who's able to sit around and get paid to do bleeding edge work.

So I will do cutting edge, let's go a level down. When it becomes appropriate and I see it starting to pick up steam and people have already figured out the problems with it, then that's something I can jump on and I can start putting into my workflows or at least be aware enough of what it does to see how it might be useful to me.

But I'm a huge fan of just boring old, it works tech and it solves the problem. Because, what? They pay the same. And I have far fewer frustrations with the stuff that just works than the stuff that's bleeding edge. Now, that's not to say that we don't integrate cutting edge stuff into our day-to-day. We're just more pragmatic about it. It's gotta make sense or...

**Kevin Griffin:** There's potential for it to save us money. Either has to save us money or it has to improve our workflow. It can't just be shiny for the sense of shiny. I think there's a lot of people out there that just chase the shiny, and I'm not one of those people.

**Alec Harrison:** How has that helped you? You kinda made a comment of being the accidental CTO. I think one thing you touched on there that I think a lot of engineers miss is being able to talk about the business justification for what you're doing, whether it's saving us money, making us money, making something easier to maintain. Do you credit that as the reason why you're maybe the accidental CTO instead of just a programmer in some dark basement somewhere?

**Kevin Griffin:** Yeah, I think so. Ultimately, everything that we do, you, Alec, Brian, me, everyone listening, ultimately we're being paid to perform a job, and we're being paid by a business. If you are an independent consultant, you're being paid by a business as a consultant. If you are running a product, you have customers who are paying you to solve a problem. That boils down to: does it make business sense in whatever you're doing?

I call myself the accidental CTO because I'm the "CTO" for a client of mine, and I've been working with them for over 10 years. I started as just a freelance consultant, helping them with bits here and there, but grew into helping them go through two acquisitions and going from a team of me to a team of seven developers, and coordinating one product to now coordinating seven or eight products. We do a lot.

Ultimately, the folks that pay me, that have trust in me to build and manage this platform, don't know jack about the technology underneath the scenes, and they don't care. What they care about is, "Kevin, does this solve our problem? We want our customers to be able to do X, Y, and Z." And I go, "Cool." And it doesn't matter if I do that in .NET 9, ASP.NET, Blazor, or web forms to solve the exact same problem. Now, I wouldn't be as happy writing web forms. Don't get me wrong.

But the point is, it doesn't matter the tech stack because the business doesn't care. Now, we have a situation where we were spitting out a whole bunch of just static HTML. It was decorated with a little bit of jQuery, and we're injecting a little bit of Vue here and there. It was a Frankenstein of an app.

And the business cases were coming in. They're like "Hey, could you do this? Could you do this? Could you do this?" And it was all front-end stuff. So the answer is yes, we could do that, but in the way we're currently solving the problem, it's a lot of work. So, what we should do is we should upgrade our UI. So we're in middle of a big UI upgrade process so we can do all this business-centric stuff, but it makes sense for the business now.

If the business was never asking me to solve these particular problems or implement these features a certain way, we probably would have never gone that way, just upgrading our UI, because people were still paying for the product that we had, and right now, they're still paying for static HTML that's decorated with a little bit of jQuery and Vue.

But we weren't going to upgrade to just make ourselves happy, because you have to remember, every single time you touch software, the potential for it breaking goes up exponentially. So, the system that we're running right now has been running for seven, eight years in production. It's pretty good, solid code that we make very few tweaks to, we don't touch very often. It does its job.

And now we're going through and we're uplifting all that. So what does that mean? When we launch it, we're gonna spend at least a month just fixing issues we didn't find in testing, in QA, or user acceptance. It's just a headache. It's gonna keep us busy.

**Brian Gorman:** Yeah, but won't you feel so much better now that it's modern?

**Kevin Griffin:** Maybe. I think I will a couple sprints afterwards where it's like "Oh, we can finally implement this feature the business has been asking for because now we have all this other infrastructure that exists."

I spent a lot of time trying to figure out the best way to explain we can't go from A to B. We really... we're trying to go from A to X and we have to go to B, C, D, everything in between. There's so many steps to go from what we have now to where we wanna be. The business owners, non-technical owners don't understand all the steps involved, and I've been really lucky. The folks I work for are amazing, because if I sit down just to explain to them, "There's a couple steps involved," and they're like "What? We trust you Kevin. You haven't let us down yet, so go take the time and do what you think you need to do."

**Brian Gorman:** Greenfield.

**Kevin Griffin:** Well, no. Oh my gosh, no. Everyone out there is like "Why is Kevin hating on Greenfield?" Because y'all have never done a Greenfield application that's lasted longer than six months probably. That's why.

**Brian Gorman:** Oh, interesting challenge.

**Kevin Griffin:** Brownfield all the way.

**Alec Harrison:** Yeah.

**Kevin Griffin:** Greenfield's great until you deploy it and go, "Oh my gosh, there are so many issues with this."

**Brian Gorman:** Somebody wrote the Brownfield as a Greenfield at some point though, so it was a Greenfield at one point.

**Kevin Griffin:** It was at one point. And then you learn all the lessons, you fix all the issues, and it becomes fairly stable. And what do you do? You leave it alone.

**Brian Gorman:** Why are you drinking Romulan Ale from a KCDC glass?

**Kevin Griffin:** It is Gatorade.

**Brian Gorman:** It looks like Romulan Ale.

**Alec Harrison:** I think one thing people get sidetracked on, or maybe don't get recognized or exposed to is - I say it's a special breed to work with a small company like you did Kevin. It's a unique experience because the vast majority of people get into a big enterprise. It's already there. There's not really any real fear or worry of if this project blows up, the entire company's gonna fall over.

All of that has been already done, right? They're at the point where they just show up and they're like "Man, this app sucks. Why are we using this app at our big enterprise company?" And it's because when they wrote it, to your point, there was two dudes and one tech guy building it, and they were trying to sell it. They didn't really care about is this gonna last 50 years, because when they started off, the business had enough money for two months of operation.

It's about pumping features out to make more money, not thinking, "Hey, how are we gonna have this company last 30, 40, 50 years?" And then you just keep tacking onto this core system because to make your next million dollars, you need this tiny little feature. And then you just build it out, and you get to a point where, hey, let's replace the thing.

And so many greenfield projects I would say I've seen fail, because they're like "Oh, this old thing sucks. Let's just replace it all together." And they just get overzealous, and say "Yeah, we could just build this in the latest JavaScript framework of our choice and our cool hot back end of choice," and then it's like, okay, well the old system handles load at this scale. Does your system handle that? The old system has all these weird quirks that happen, but we all know about them. How are you gonna address those so we don't have them in the future, and also, so you don't introduce new ones?

And all those things sometimes compound, or you're doing code archeology. In your case, you've been around, but in other companies, the guy who built the first thing might've been gone for a decade. So, you can't go and just call him up and be like "Hey, Kevin, why did you do this weird thing on line 52?" It's, "Eh, that looks junk. Let's throw it away," and then you find out that that was the thing keeping you from losing all your money.

**Kevin Griffin:** Yeah, and not meaning to get political about it, but in the recent news, you have the DOGE folks, the couple teenagers that they got to go in and look at these COBOL-based systems that basically pay out Social Security. And they go "Oh, this is awful."

Yes, but I had to explain this to my dad. My dad's almost 70-something years old, and he's like "I don't understand what the problem is. Let the kids do it." I said, "Dad, you don't understand. There is a certain level of experience that you gain as a software developer where you realize that you just don't touch that system unless you understand how every aspect of it works." You just don't go play in that. You don't touch old systems that have very critical business functions. That's the reason banks haven't moved off of these old mainframes.

**Brian Gorman:** Yeah, this is why we still have COBOL and mainframes, because the effort to get it working correctly in a new system is not trivial. It's not as easy as saying "Oh, this looks bad. Let's just delete it and see what happens."

**Kevin Griffin:** It's not the five or six major use cases that you could come up with just sitting here. It's the 50,000 use cases you haven't considered yet. And you don't understand that unless you've been in this business long enough.

**Brian Gorman:** Right, but let's also speak to the fact that there could be something in that 50,000 that has been a problem that they might actually find.

**Kevin Griffin:** Yep. Absolutely. And I'm not saying Brownfield software is perfect. But in the grand scheme of things, Brownfield software has taken care of 99% of the issues.

The system I'm working on now was at one point a greenfield application, where I replaced a preexisting application. And the justification for that was the person who wrote the existing software was insane. It was just filled with bad practices. In order to do proper surgery to that system, it was actually easier in that case to rewrite it.

But it was what I just described a couple minutes ago. It was a six and nine-month ordeal to rewrite the software, to get it back to the same bar that it was at before the rewrite. And then, you push that out into the public, and customers start using it, customers start complaining. It's like "Well, this doesn't work the way I expected to." So, you spend three, four months just tweaking and adjusting based off customer expectations. And then you get to the point where it's like "Okay, now, we can start adding new stuff on top of it."

But then you rinse, repeat for 10 years doing that, just adding new stuff on top of it. You start getting yourself into the same cycle. "Well, maybe I should rewrite this because I have all this new knowledge."

But any parent out here will understand this. When you have a three-year-old, and you get to this point where you're like "Well, maybe we should have another kid." And you forget about how bad it was the first six months of having a kid. Just how little sleep you got, how whiny and poopy the little sucker was. Having a newborn is an awful experience. Just lack of sleep, lack of energy, all that good stuff. But then you get to this point where it's like "What? Maybe we should do this again. This is a good idea." Because you have forgotten how bad it was.

**Brian Gorman:** This might be a bad time to tell you, Kevin, that my wife and I are expecting.

**Kevin Griffin:** Hey, man. Congratulations.

**Brian Gorman:** Welcome to the pain, brother.

**Kevin Griffin:** I have three sons. Yeah, you go through that, and then eventually you get to the point where it's like "Man, I kinda miss sleeping. Sleeping is great." So, I'll leave it there. Greenfield software is just like having a child. It is constant upkeep for a minimum of eight years before you get to the point where it's like "Maybe we should do this again."

**Brian Gorman:** This is the best software analogy I've ever heard in my life.

**Kevin Griffin:** It is. This is way better than the gardening analogy.

**Brian Gorman:** Yes. It's much more like raising a child, because you're basically that invested in it, and your life kinda depends on its life also staying alive.

**Kevin Griffin:** Yeah.

**Brian Gorman:** But, wow. You do forget, and it just seems nice to have new software, new things, new technologies. We're back to your original statement, Alec. We've got the FOMO. Gosh, if we don't get a RAG system built into our search within the next month, we're gonna lose all of our customers. We better do it. But to do that, it's gonna... Just rewrite the thing then, cause we need it desperately.

**Kevin Griffin:** Well, a lot of these early AI companies just don't exist anymore, because the thing they were doing was just pulled in as a feature under another business. But it was another business that was sustainable without the AI feature. I don't think that a lot of people are going to products because of their fancy AI features. There's probably specific use cases, but you see Apple Intelligence, right? Or Apple Not Intelligence. Where Apple waited till it was the best timing so they could put out a good, polished product, but then everyone's like "This is awful. This isn't good at all. This isn't helping me."

**Brian Gorman:** If someone could create an automatic video creating system that did whiteboard code that was filled in as I talked about it, and I literally could not have to spend hours editing, that would be a system that I would say AI has won.

**Kevin Griffin:** And that probably exists, but it'll write it in Java instead of C#, right? Because it'll get confused.

**Brian Gorman:** I would take it in Java. I don't care. If I just wanna talk about a leetcode problem or just a data structure in general. What difference does it make if I'm using Java or C#? It might matter semantically to someone who only knows C# or Java and just doesn't want to go down that road. But at the end of the day, they're 99% the same thing. And the concept is the data structure, not the code that's implementing it.

Sounds like a great startup idea for any of our listeners out there. If you are looking for a startup, you have your first customer, Brian. He'll test it out for you. I can go out to ChatGPT right now, and I can say, "Hey, give me an outline for an introduction to coding with C# course," and it will tell me all the videos. And then I can say things like "Hey, would you estimate how many videos I need, how long those videos are gonna be," so I can kinda generate how long the thing is gonna last. But then I go to try to find an automatic video creation software, and it's painful.

**Kevin Griffin:** Deep research is also another crazy thing. But I think as we kinda come to the end here, Kevin, do you have any last minute plugs? Speaking at any conferences or any of that stuff?

**Kevin Griffin:** No. I am an organizer for STIR Trek in Columbus, Ohio. So, we just announced speakers, and tickets are on sale. So, if you wanna go to the largest developer conference in Central Ohio, just go to STIR Trek. Which is funny, cause I'm not from Ohio.

**Brian Gorman:** Yeah. How'd you get involved with that?

**Kevin Griffin:** I just know people, man.

**Brian Gorman:** Oh, man. He's a people person. He's everywhere.

**Kevin Griffin:** The power of the network. After that, what am I going to? I actually don't know. I think I have a lot of CFPs out that haven't accepted or rejected me yet. So, we'll see. I have no idea.

**Brian Gorman:** So I am officially going to be starting up Sci-Fi DevCon. The call for presentations will be on the 17th. It's all virtual. It's a calendar event. Just talk about something tech, add some sci-fi flair to it.

**Kevin Griffin:** I'm in. Let's figure it out.

**Brian Gorman:** Okay. Let's do it.

**Kevin Griffin:** I've been wanting to do a Quantum Leap talk.

**Brian Gorman:** Then I need your talk. And you can record it ahead of time and just put it out there, and we'll just release it on that day.

**Kevin Griffin:** Old Quantum Leap, not this new one.

**Brian Gorman:** Oh, the new one was good too.

**Alec Harrison:** All right, everybody. Thanks for joining us. Check out Sci-Fi DevCon, and I'll see y'all next time. Bye, everybody.

**Kevin Griffin:** All right. Thanks, guys.