# Introduction #

I put up this wiki page to serve as a possible discussion forum for the various AutoSMS clients available. Feel free to post comments, questions, etc. here. Though for bugs and enhancement requests, best to post to the issues section of this site.

Note that this page will be moderated, and unfit content posts will be removed.

This page also serves as an FAQ.

# FAQ #

**Why is there a list of phone service providers/carriers? And why do I need to select it for the recipient's carrier to send him/her a message?**

Likely because the AutoSMS service needs to pass your message to the SMS gateway of the recipient carrier for your recipient to receive it. Similar to sending an email to someone, you need to specify the domain or hosting provider of the recipient like user@gmail.com or user@yahoo.com. We've been spoiled by not having to do that for SMS messages.

Think of it this way, basically, you pay (as part of your phone service plan) to send SMS to recipient from your phone. The plan provider receives your SMS to recipient's phone number and does a lookup via some directory/algorithm, etc. to find out which phone carrier the recipient is on based on the phone number and then passes it to the SMS gateway of the recipient's carrier. Unfortunately, I believe that lookup process isn't really available for free, hence free services like AutoSMS probably resort to alternate options. For example, you can find a carrier's email-to-SMS gateway so that you can send SMS to recipient from your email account, see [wikipedia pages](http://en.wikipedia.org/wiki/List_of_SMS_gateways). You just need to know the gateway (meaning you need to know the carrier) So of course there's a catch when things are free (i.e. just a little more work to send a message).

**Why do I need to enter a CAPTCHA code?**

To prevent spammers, bots, and automation etc. to easily send out spam messages to many people (abuse prevention).

**Why is there no option to provide a sender/return phone number or email address?**

Ask the (API) service provider, but part of the name of the service at least for Android is anonytext, hence I guess it's supposed to be "anonymous". You can however, add your contact info as part of the SMS text message as a workaround.

The clients I build are limited/restricted to the API functionality offered by the SMS service provider that I'm using for these clients.

**Why does the service return message saying that I need to enter the code correctly when I know I did, and thus it won't send out my message?**

This is a limitation of the (API) service provider. It does not distinguish when a code is entered incorrectly or there's some other problem.

For example, the API service requires session state / cookie support, so if you build a client that doesn't offer that, it will fail with this particular error message quirk. (Such is the case of using the Microsoft HTA version of the client on a computer with IE 6 or older, no IE7 or newer. Seems lately, such is also the case for Safari extension - [issue 2](http://code.google.com/p/autosmsclients/issues/detail?id=2)).

# Known Issues #

**NOTE:** lately, there seems to be issue with Safari Extension in that it intermittently works. When it fails, the error message just keeps saying to enter the CAPTCHA code, noted as [issue 2](http://code.google.com/p/autosmsclients/issues/detail?id=2).