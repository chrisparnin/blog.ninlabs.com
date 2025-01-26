---
author: Chris Parnin
category: Research
draft: false
image:
  alt: ''
  src: '/media/CrowdVsTraditional.png'
publishDate: '2013-03-04'
snippet: ''
tags:
- research
- programming
- api
- crowddocumentation
title: Api Documentation
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
We previously found that even without any inherent coordination, a crowd of Android developers can cover as much as 88% of the API classes in discussions on Stack Overflow.

We collected 1,316 days of Android developer history (average 11 weeks per developer) and we found 9,234 visits to [stackoverflow](http://stackoverflow.com), as well as 2,547 to [developer.android.com](http://developer.android.com), which hosts the official documentation for Android.  We also analyzed the code examples that could be found in the Stack Overflow data dump and [developer.android.com/guide](http://developer.android.com/guide).

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

We looked at developers (A-Q) and analyzed how often they visited an Android Stack Overflow question and official Android documentation.

A comparison of visits to Stack Overflow questions tagged "android" vs visits to official android documentation.

![CrowdVsTraditional](/media/CrowdVsTraditional.png)

A day in the life of three different developers (A,E,Q) and a visualization of their of web visits:

![DeveloperVisits](/media/DeveloperVisits.png)

Some quotes from developers we surveyed about Android official documentation:

> **C:** Keeping it updated and relevant to all versions of Android.  Additionally, a lot of times the examples are for use cases that are irrelevant to what I need it for (either too complicated or not detailed enough - it’s a fine line!).  
> **D:** The biggest thing lacking from official documentation is edge case and error documentation.  
> **J:** The official docs don’t have enough examples!

Code examples?
-------------

The official Android documentation guide only had *explanations* (measured by API class references in a paragraph of text) for 36% of its API classes, compared to Stack Overflow’s 88%.

**There were twice as many code examples on Stack Overflow than official documentation**: The official Android documentation guide only has code snippets for 26% of its API classes compared to Stack Overflow’s 56% in accepted answers.

The entire official Android documentation guide provides a total of 1,711 authoritative code snippets, compared to 156,747 crowd-curated code snippets on Stack Overflow.

Documentation usage patterns.
-------------

#### Developer flows

![DeveloperFlow](/media/DeveloperFlow.png)

Most developers visited Stack Overflow via search, whereas they directly visited official documentation.  Two developers: A and B, directly visited Stack Overflow to continually monitor the "newest android questions" on Stack Overflow.

#### Apprenticeships with experts

> Initially, I used to search in developer.android.com. But in my opinion, for a novice who starts android by going through the developer documentation, will be a tough job. So what I did was, going through the posts written by the top reputed Stack Overflow members. This is the easiest way to learn android. Once you have the basic knowledge on android, dev-docs are more useful for me to understand.

Interestingly, that is the same philosophy supported by the recent [Stack-ed](http://www.stack-ed.com) site:

> The most reputable StackOverflow contributors and their accepted answers to questions.


But 17 developers...
-------------
> You only studied 17 developers.  What can you really conclude?  

We had to pay spend `$1000` in amazon gift certificates to do this research. If you have doubts, the best way to help is by **[donating your history](http://www.cc.gatech.edu/~vector/donatehistory.html)**!  In return, you get a cool browser extension, [DocSight](http://chrome.google.com/webstore/detail/docsight/ceacnbgdhcnofnomlkmackaennjfmnpc), to revisit and visualize your own developer documentation history! 

Please email `chris.parnin@gatech.edu` if you would like to see a more detailed research report or please comment below for any questions.