---
author: Chris Parnin
category: General
draft: false
image:
  alt: ''
  src: ''
publishDate: '2012-06-29'
snippet: ''
tags:
- tools
- programming
title: Code Timelines
---

Software development isn't just about the code we _write_.  It also spans the many situations, experiences, and new knowledge we encounter when we write code.

Funny thing is we can't seem to directly recall or reflect on that stuff very easily.  This is no more apparent than we just finished a whole bunch coding and just seem to draw a blank when writing a commit message.

[![](http://blog.ninlabs.com/wp-content/uploads/2012/06/CheckinBlank.png)](http://blog.ninlabs.com/wp-content/uploads/2012/06/CheckinBlank.png)

How can we improve a developer's ability to recall and reflect over recent coding experiences? Can we keep better tally over our activities and even curate and share them?



### Timelines



[![](http://blog.ninlabs.com/wp-content/uploads/2012/06/CodeNarrative.png)](http://blog.ninlabs.com/wp-content/uploads/2012/06/CodeNarrative.png)

Timeline events include uncaught exceptions:

[![](http://blog.ninlabs.com/wp-content/uploads/2012/06/Exceptions.png)](http://blog.ninlabs.com/wp-content/uploads/2012/06/Exceptions.png)



### Collected History



How the system works: Every code change is submitted to a local git repository.  
Uncaught exceptions and caught exceptions that hit a breakpoint are logged.  Navigation, searches, code copied and pasted from the web are also logged.  External data such as SVN/GIT repositories and local browser history are integrated into the history.

Temporally close events are organized into "bubbles".  Each bubble represents an important type of event.  





  * A **Diff** bubble only shows a subset of changed lines by showing the most "interesting" changed lines are selected from the diff (e.g. not an import statement).


  * **Exception** bubbles show stacktrace information and the site of the exception.

  * **Web Visit** bubbles show stackoverflow questions that were visited.

  * **Commit** bubbles show information about a recent commit.



### Next steps


- What other type of event bubbles should there be?
- What other interfaces would be useful (I also have a calendar with bubbles)?
- In what different ways would you like to share these types of experiences?
- Over what time span and level of abstraction would you view events?