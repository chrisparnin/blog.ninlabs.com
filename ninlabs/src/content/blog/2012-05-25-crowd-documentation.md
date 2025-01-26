---
author: Chris Parnin
category: Research
draft: false
image:
  alt: 'Tree map visualizing Stack Overflow discussions overlaid over Android classes'
  src: 'https://blog.ninlabs.com/wp-content/uploads/2012/05/treemap_print.png'
publishDate: '2012-05-25'
snippet: ''
tags:
- research
- crowddoc
title: Crowd Documentation
---

[![](https://blog.ninlabs.com/wp-content/uploads/2012/05/CrowdDocModelSmall.png)](https://blog.ninlabs.com/wp-content/uploads/2012/05/CrowdDocModelSmall.png)Traditional documentation requires a process where a few people write for many potential users (especially in the case of API documentation). The resulting documentation, more often than not just doesn't cut it -- _There aren't enough examples, details, or explanations_.

_Crowd documentation_ turns the traditional documentation process on its head -- knowledge is created and curated by a mostly uncoordinated collective. The potential is massive and already happening: [stackoverflow.com](https://stackoverflow.com) allows users to ask and answer questions about programming topics, blog posts allow developers to write tutorials and provide solutions to otherwise undocumented issues. StackOverflow already has 3 million questions (with 85% percent answered in a median of 11 minutes) and countless number of blog posts have been written.

But a **burning question** remains, can we trust crowd documentation?  Will it be complete, will it be fast, will it be authoritative?  What type of content is created by the crowd and who contributes?



## Analyzing API Discussions on Stackoverflow


[![](https://blog.ninlabs.com/wp-content/uploads/2012/05/ZoomButtonsControllerExampleFitted.png)](https://blog.ninlabs.com/wp-content/uploads/2012/05/ZoomButtonsControllerExampleFitted.png)

To answer these questions, we obtained a data dump of the StackOverflow database and we measured the amount of discussion of different API elements, such as classes or methods, on StackOverflow.  
We wanted to know:



   
  * Will different API elements be widely covered

   
  * If an API element is discussed infrequently is it also discussed infrequently in practice

   
  * How fast is the crowd at covering an entire API



To measure discussion of an API element (focusing on classes), we looked for traceability links in the questions and answer body. We then built a model mapping API elements to the questions and answers via their traceability links.  The results surprised us in several ways:

[![](https://blog.ninlabs.com/wp-content/uploads/2012/05/ApiSaturation.png)](https://blog.ninlabs.com/wp-content/uploads/2012/05/ApiSaturation.png)

You can find a Stackoverflow thread for **a majority of API elements (classes)**, but the growth of availability occurs only **linearly** (despite an exponential growth in users contributing).  We also found that API elements that were not frequently discussed on StackOverflow were **not frequently used in practice** (based on numbers we obtained from google code search).



## Visualizing API Discussions on Stackoverflow


API designers may want insight into the "hot spots" that are problematic for developers or may have "gaps" in coverage. For example, we observed that not many developers talked about accessibility or DRM in Android.  

We have a treemap visualization tool that helps visualize the coverage and usage data of API elements in a treemap.

[![](https://blog.ninlabs.com/wp-content/uploads/2012/05/treemap_print.png)](https://blog.ninlabs.com/wp-content/uploads/2012/05/treemap_print.png)

Play with the [Android Treemap](http://latest-print.crowd-documentation.appspot.com/?api=android).
Play with the [Java Treemap](http://latest-print.crowd-documentation.appspot.com/?api=java).




## Automatically Generating Documentation


And one more thing.  Given all the data about API elements from the crowd, is there something more we can do?

Consider one idea, a format similar to JavaDoc could be automatically generated, including popular questions about a class, recommendations to external resources such as blogs, and popular code snippets. See an example created automatically by our prototype tool:

[![](https://blog.ninlabs.com/wp-content/uploads/2012/05/MessageDigestCrowdDoc.png)](https://blog.ninlabs.com/wp-content/uploads/2012/05/MessageDigestCrowdDoc.png)
Click here for the html version: [MessageDigest auto-crowd doc example](http://se.ninlabs.com/exp/crowd/examples/MessageDigest.html)



## Read More

Read our preliminary [technical report](https://chrisparnin.me/pdf/crowddoc.pdf) for more detail. We go into more detail about traceability links to code examples and the effects of filtering out questions and answers based on filters such as vote scores or views.

Checkout the [reddit discussion](https://www.reddit.com/r/programming/comments/u78yx/crowd_documentation_stackoverflow_discussions_of/).

_"Crowd Documentation: Exploring the Coverage and the Dynamics of API Discussions on Stack Overflow". _[Chris Parnin](https://chrisparnin.me), [Christoph Treude](https://www.ctreude.ca/), [Lars Grammel](https://sites.google.com/site/larsgrammel/), [Margaret-Anne Storey](https://webhome.cs.uvic.ca/~mstorey).