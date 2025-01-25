---
author: Chris Parnin
category: General
draft: false
image:
  alt: ''
  src: ''
publishDate: '2010-12-04'
snippet: ''
tags: []
title: 'Mining Development History: Why and What For?'
---

> _"Those who cannot remember the past are condemned to repeat it"_ 

By now this is a cliché saying, but does history _really_ have any relevance in software development? 

In preparing for writing a research statement and job talks, I've been thinking about an unifying theme of research. One question become clear: Why and what would you use recorded history of software development for?  It was a question asked by my advisor as a challenge, and at the time I had many doubts that there were any useful purposes that could be found.  For example, I thought why do we even have version control besides the purposes of code integration and backups.  How many N versions do we ever look back on a project in practice?  Sure, maybe you're supporting different versions of the product and that's useful to you, but is the actual history relevant to a typical developer with the same intensity as an archeologist cherishing an ancient Mayan pottery fragment?

Similarly, in our world we do not see the construction of the Eiffel Tower or the chisels on a statue, but only what is present now.  What can we learn from looking at the history that we cannot gain from just looking at the code itself?

**Some answers:**



### Did we make an impact?


Did our research or tool make an impact? For example, we looked at whether developers choose to use a [refactoring tool or manual text manipulation](http://portal.acm.org/citation.cfm?id=1555044) to refactor a program.  Turns out, the developer's we studied used refactoring tools for less than 10% of refactorings. We're now asking the similar question about the impact of java generics.



### How do developers _really_ work?


With more detailed history, we can ask more about how developers work.
I started off with [simple questions](http://portal.acm.org/citation.cfm?id=1555044): how many files and methods do developers work with in a day), i.e. what is the mental workload?  Further, how well can we predict what these would be (i.e. building a recommendation tool)?  Next, I looked at work sessions in detail.  How long are developers working in a day, are they frequently interrupted?  This was interesting because it was one of the first research demonstrating how fragmented and broken a developer's day is and what they do to try to [recover](http://dx.doi.org/10.1109/ICPC.2009.5090030).



### Personal and Social History


More recently, I've looking how developers can actively use their personal history and even potentially socialize it. Here, interruptions, multi-tasking, and the very nature of memory was a big motivator.  Programming environments are the perfect breeding ground for forgetting what you were just doing.  I've been looking at different ways you can [present](http://portal.acm.org/citation.cfm?id=1753326.1753342) and interact with your own history to help you get back to speed when resuming a programming task.



### History in the Future


Looking to the future, I'm excited about some of the [code provenance](http://crest.cs.ucl.ac.uk/cow/9/) ideas coming out.  I have a cool Visual Studio 2010 extension that is records some cool stuff and will be doing user studies soon.  With my new history tool, I've been able to do things like



	
  * find all places where code was copied from websites (including url) 

	
  * detect hard to use API calls

	
  * enable instant how-to blogging