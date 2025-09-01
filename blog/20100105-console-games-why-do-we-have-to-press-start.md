---
title: "Console Games: Why do we have to press start?"
date: 2010-01-05T06:00:00Z
permalink: console-games-why-do-we-have-to-press-start
description: "Ever wondered why console games make you press start before reaching the main menu? There's actually a good UX reason for this design pattern."
summary: "Ever wondered why console games make you press start before reaching the main menu?"
tags:
  - Gaming
  - UX Design
  - Console Games
  - User Experience
categories:
  - "Development - Game Development"
---

Interesting question came up on Twitter the other day:

“Press Start” screens? Why can’t I just go straight to the main menu?

If you’re a gamer, especially on consoles, you’ve seen this screen more often than you’d care to. It’s a little annoyance. However, there is a very good reason for having this screen in place.

Imagine you’re running four controller on your Xbox, and all four of them are turned on. Then you put in a single player game, and it comes up to that annoying “Press Start” screen. Which controller do you use to press start with? The answer is easy: any of them!

The “Press Start” screen is designed to determine which controller the game should poll for input. During this screen, the game is polling all connected controllers for input. If any of them register a “start” button push, the game makes that controller the “default” controller. The use-case for this scenario is that the player should be able to use any connected controller to play the game, and not be forced to use controller #1. This is considered a best practice.

_The More You Know…_
