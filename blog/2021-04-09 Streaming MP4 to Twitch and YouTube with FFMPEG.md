---
title: Streaming an MP4 to Twitch and YouTube with FFMPEG
date: 2021-04-09 11:00:00
permalink: streaming-mp4-to-twitch-youtube-with-ffmpeg
categories:
  - Misc.
summary: "In this post, I discuss how I was able to 'stream' an MP4 LIVE to YouTube and Twitch using FFMPEG"
excerpt: "Recently, I regained some of the rights to some video courses I've built over the past two years. Because this was specially created content, I wanted to see if there was a way that I could distribute it that was more than just \"posting it on YouTube\"."
---

Recently, I regained some of the rights to some video courses I've built over the past two years.  Because this was specially created content, I wanted to see if there was a way that I could distribute it that was more than just "posting it on YouTube".

As a member of the [Live Coders](https://livecoders.dev/), I try to stream on [Twitch](https://twitch.tv/1kevgriff) at least once a week.  But sometimes schedules conflict, and I'm not able to do anything.

So I thought: 

> HEY!  What if I could take the 3-4 hours of content I've built and stream it on my channels? 

Turns out, it's not that difficult with [FFMPEG](https://ffmpeg.org/).

## Step 1: Create an MP4

This was pretty straightforward for me.  I took all 3 hours of my content, and I dropped it into Adobe Premiere end-to-end.  About 10 minutes later, I have a new, fully encoded file that was ready to go.

## Step 2: Set up your streams

In order to go live with FFMPEG, you need two key pieces of information:

* Your RTMP server
* Your RTMP key

> RTMP stands for Real-Time Messaging Protocol, and it's a protocol used to transmit large bits of audio and video.  It's used by YouTube, Twitch, and other streaming services.  

Want me to save you some time, here are the servers for YouTube and Twitch:  

YouTube Primary Server:  
`rtmp://a.rtmp.youtube.com/live2/{stream_key}`  

Twitch Primary Server ([find yours](https://stream.twitch.tv/ingests/)):  
`rtmp://iad05.contribute.live-video.net/app/{stream_key}`


## Step 3: Setting up FFMPEG and GO LIVE 🔴

Here is the command I'm using to setup FFMPEG:

```bash
ffmpeg -re 
      -i [YOUR FILE NAME HERE] 
      -pix_fmt yuvj420p 
      -x264-params keyint=48:min-keyint=48:scenecut=-1 
      -b:v 4500k 
      -b:a 128k 
      -ar 44100 
      -acodec aac 
      -vcodec libx264 
      -preset medium 
      -crf 28 
      -threads 4 
      -f flv 
      rtmp://[LIVE STREAM RTMP URL]
```

This command will automatically start streaming your content to your RTMP server of choice.  When the video is done streaming, the stream will automatically shut down!

## More than one streaming service?

I don't have a way to solve this natively with FFMPEG at the moment, but I do use [Restream](https://restream.io/join/N77gz) for streaming to multiple services.  I highly recommend it!

## Issues I'm Working On

The above process works REALLY well, but I'm not happy with the bitrate I'm getting into YouTube or Twitch.  It's too low, even though the FFMPEG settings seem to be at the right place.  I'm going to continue to experiment with settings and see if I can do better.

If you have ideas, please let me know on [Twitter](https://twitter.com/1kevgriff)!

Until then, make sure you're following me on [YouTube](https://youtube.com/swiftkick) and [Twitch](https://www.twitch.tv/1kevgriff) so you know when I go live!  
