---
title: Api Documentation 
subtitle: Where do developers go?
date: '2013-03-04'
description: Where do developers go?
categories:
- research
- programming
- api
- crowddocumentation
---
Why it sucks
------------

Software companies, such as Microsoft, create documentation for millions of topics concerning its APIs, services, and software platforms ([MSDN][]). 
Creating this documentation comes at a considerable cost and effort.  And after all this effort much documentation is rarely consulted ([Lethbridge][]).  API documentation is especially difficult to create ([Robillard][]): as just a few writers must create documentation that teaches concepts and that maximally covers the many ways the thousands to millions of developers may be using their API.

Now, the trend may shift even more of the undocumented burden onto developers.  The YouTube API recently moved their official developers support
from Google Groups to Stack Overflow ([Move][])&mdash; relying on a few thousand questions about the API and on mechanisms of Stack Overflow.
And there is no sign in sight that documentation is all the sudden going to get better.

Developers revolt
------------

Instead, developers have been indirectly documenting APIs themselves through a process called [crowd documentation](http://blog.ninlabs.com/2012/05/crowd-documentation/), by publishing blog posts and curating questions and answers about APIs. 
We previously found that even without any inherent coordination, a crowd of developers can cover as much as 88% of the API classes in discussions on Stack Overflow.

#### In our new study, we find that:

* Developers may be getting as much as 50% of their documentation from Stack Overflow.
* More examples can be found on Stack Overflow than the official documentation guide.
* In web searches, Stack Overflow questions are visited 2x-10x more often than official documentation.

#### We also found some interesting patterns of web browsing behavior:

* Developers directly browse official documentation in intermittent bursts.
* Some developers learn APIs through "apprenticeships" with expert Stack Overflow users.
* Developers continously reference Stack Overflow questions during development via search.

[Lethbridge]:http://dx.doi.org/10.1109/MS.2003.1241364
[Robillard]:http://dx.doi.org/10.1109/MS.2009.193
[MSDN]:http://thirdblogfromthesun.com/2010/09/how-big-is-the-msdn-library/
[Move]:http://apiblog.youtube.com/2012/09/the-youtube-api-on-stack-overflow.html 


Where do developers go?
-------------

A day in the life of three different developers (A,E,Q) and a visualizatin of their of web visits:

![DeveloperVisits]({{urls.media}}/DeveloperVisits.png)

Documentation usage patterns.
-------------

#### Apprenticeships with experts

> Initially, I used to search in developer.android.com. But in my opinion, for a novice who starts android by going through the developer documentation, will be a tough job. So what I did was, going through the posts written by the top reputed Stack Overflow members. This is the easiest way to learn android. Once you have the basic knowledge on android, dev-docs are more useful for me to understand.

Interestingly, that is the same philosophy supported by the recent [Stack-ed](http://www.stack-ed.com) site:

> The most reputable StackOverflow contributors and their accepted answers to questions.


* Android less documentation

But 17 developers...
-------------
> You only studied 17 developers.  What can you really conclude?  

We had to pay spend $1000 in amazon gift certificates to do this research. If you have doubts, the best way to help is by [donating your history]!  In return, you get a cool browser extension, [DocSight](http://chrome.google.com/webstore/detail/docsight/ceacnbgdhcnofnomlkmackaennjfmnpc), to revisit and visualize your own developer documentation history! 
