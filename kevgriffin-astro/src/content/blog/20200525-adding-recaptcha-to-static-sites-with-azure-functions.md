---
title: Adding reCAPTCHA to Static Sites with Azure Functions
permalink: recaptcha-static-sites-azure-functions
description: >-
  My mailing list was suffering from spam signups due to an unprotected form.
  Since it was a static site, I needed a solution that didn't require me to host
  infrastructure. In this article, I'll discuss how I used Azure Functions to
  process reCAPTCHA tokens for my static site.
summary: >-
  My mailing list was suffering from spam signups due to an unprotected form. 
  Since it was a static site, I needed a solution that didn't require me to host
  infrastructure. In this article, I'll discuss how I used Azure Functions to
  process reCAPTCHA tokens for my static site.
tags:
  - Azure Functions
  - reCAPTCHA
  - Static Sites
  - Serverless
categories:
  - Azure
excerpt: >-
  My mailing list was suffering from spam signups due to an unprotected form. 
  Since it was a static site, I needed a solution that didn't require me to host
  infrastructure. In this article, I'll discuss how I used Azure Functions to
  process reCAPTCHA tokens for my static site.
pubDate: '2020-05-25T19:30:00.000Z'
draft: false
---

I've been running a mailing list for a couple years, and even though I haven't been sending content as often as I'd like to, it's nice having mechanism where I can push out something cool I've been working on to hundreds of people.

Recently, I've added a _call to action_ on most of my pages trying to entice people to sign up. It's a simple form and the results get send to my email marketing systen, [ActiveCampaign](https://www.activecampaign.com/?_r=IB69H8G9).

But it turns out that this is a prime target for spam bots that regularly register legitimate email addresses. And this is horrible! While I have double-opt enabled, I've had several people that have received the double-opt in email and reported it as spam. And rightfully so, I guess, because these folks didn't ask for the emails to be sent to them.

Obviously, this is a problem that needed fixing. What is the best way to approach it?

[ActiveCampaign](https://www.activecampaign.com/?_r=IB69H8G9) even has a support article discussing this issues. My solution (the double opt-in) is the **second** best solution, but like I mentioned above, people can still report the opt in email as spam.

The _true_ solution it to implement has type of captcha. And you've seen these before.

![Captcha what?](https://media.giphy.com/media/GLKFrfwDJQFaw/giphy.gif)

They kinda suck. But it turns out that [reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) supports invisible detection. That's the type of bot detection I could go for!

## Setting Up reCAPTCHA

The client-side part of integrating reCAPTCHA is low effort.  Add a script tag and a call to the reCAPTCHA service.

```html
<script src="https://www.google.com/recaptcha/api.js?render=[recaptcha key here]"></script>
```

```javascript
cta.addEventListener("click", (evt) => {
  grecaptcha.ready(() => {
    grecaptcha
      .execute("[recaptcha key here]", { action: "submit" })
      .then((token) => {
        // token!!
      });
  });
});
```

Once you have the token - you need to validate it.  This cannot happen on the client, because as a rule of thumb, you never trust anything from the client.

But this is also a static site generated through Gridsome.  There is physically no server-side component that I can bounce requests off of. All my hosting is done via blob storage in Microsoft Azure (probably migrating to new Azure Static Sites in a couple weeks).

## Enter Azure Functions

So what do you do when you need a minor amount of computing power, but you don't want to maintain infrastructure?

**SERVERLESS**
![Jim from The Office doing jazz hands](https://media.giphy.com/media/BNKGM6uOgPhp6/giphy.gif)

I wrote an Azure Function to handle the processing on the reCAPTCHA token.

```csharp
[FunctionName("ValidateCtaForm")]
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req)
{
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    var data = JsonConvert.DeserializeObject<CtaForm>(requestBody);

    /* this is the payload I send from my site */
    if (string.IsNullOrWhiteSpace(data.CTALocation)) return new BadRequestResult();
    if (string.IsNullOrWhiteSpace(data.Name)) return new BadRequestResult();
    if (string.IsNullOrWhiteSpace(data.EmailAddress)) return new BadRequestResult();
    if (string.IsNullOrWhiteSpace(data.Token)) return new BadRequestResult();

    // validate recaptcha token
    using (var client = new HttpClient())
    {
        var query = new QueryBuilder();
        query.Add("secret", Environment.GetEnvironmentVariable("RecaptchaSecretKey"));
        query.Add("response", data.Token);
        query.Add("remoteIp", req.HttpContext.Connection.RemoteIpAddress.ToString());

        var uri = new UriBuilder("https://www.google.com/recaptcha/api/siteverify");
        uri.Query = query.ToString();

        var request = new HttpRequestMessage(HttpMethod.Post, uri.ToString());

        var response = await client.SendAsync(request);
        if (!response.IsSuccessStatusCode)
        {
            return new BadRequestResult();  // recaptcha rejected our request
        }

        var responseString = await response.Content.ReadAsStringAsync();
        var responseData = JsonConvert.DeserializeObject<RecapatchaResponse>(responseString);

        if (!responseData.Success)
        {
            return new BadRequestResult();
        }

        /* ADD CONTACT TO ACTIVECAMPAIGN */
    }

    return new OkResult();
}
```

I noticed there were a couple reCAPTCHA packages on Nuget, but them seemed sketchy or out of date with the latest updates to reCAPTCHA.  Sometimes you don't need a package when a simple HTTP request will do.  And that's exactly what I did.


reCAPTCHA asks for two pieces of information (and one optional):

* `secret` is your server-side, secret key.  This should never be shared publicly.
* `response` is the token you receive from reCAPTCHA on your site.
* `remoteIp` is optional, but I have that information, so why not send it.  As far as I can tell, there is no downside to excluding it.

The response will probably always return 200 OK - even on errors, because hey, Google isn't a web company so who'd expect them to write good APIs.  🙄

This is the sample JSON for response.

```json
{
    "success": true|false,
    "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
    "error-codes": [...]        // optional
}
```

> Soapbox.  Success, true or false is a ~~stupid~~ non-optimal way to build APIs.  HTTP status codes exist for a reason.  But who am I to talk, I've written some crummy software in my life too.

I can deserialize the reRECAPTCHA response into the following object:

```csharp
public class RecapatchaResponse
{
    public bool Success { get; set; }

    [JsonProperty("challenge_ts")]
    public DateTimeOffset ChallengeTs { get; set; }

    public string Hostname { get; set; }

    [JsonProperty("error-codes")]
    public List<string> ErrorCodes { get; set; }
}
```

## What's next

Assuming that your `Success` is true - you're done!  In my case, I use this as the opportunity to add the contact information to ActiveCampaign.  

On a failure (or `Success` is false), I simply send a BadRequest exception (a non-200 OK is what I'm interested in).

The `ErrorCodes` collection will contain errors, but you'd need to read and interept them independently.  In my case, I'm fine just returning an error, but you might want to send back a more specific error.

If you're looking at trying to add services to static sites, definitely consider serverless options.  I was definitely a holdout in the early days of Azure Functions and AWS Lambda, but every day I see little tasks that are perfect for serverless functions.

I hope this article has been useful for you.  If it has, leave some love below.  Or better yet, follow me on [Twitch](https://www.twitch.tv/1kevgriff), [YouTube](https://www.youtube.com/c/swiftkick), and [Twitter](https://twitter.com/1kevgriff).
