---
draft: false
title: "ICSE Roundup"
snippet: "The [International Conference on Program Comprehension](http://icpc2011.cs.usask.ca/conf_site/Home.html) (ICPC 2011) was a charming affair, bringing together a diverse set of researchers from around the globe.

Here are some of my personal reflections:
"
image: {
    src: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?&fit=crop&w=430&h=240",
    alt: "full stack web development"
}
publishDate: "2011-07-09 11:39"
category: "Conference Report"
author: "Chris Parnin"
tags: [research, conference]
---

The [International Conference on Program Comprehension](http://icpc2011.cs.usask.ca/conf_site/Home.html) (ICPC 2011) was a charming affair, bringing together a diverse set of researchers from around the globe.

Here are some of my personal reflections:



## Three Research Perspectives



[Leon Moonen](http://home.simula.no/~leonm/) drew upon centuries of wisdom collected by architects and map makers to find **design principles** of wayfinding that could be applied toward software exploration and navigation interfaces.

[Margaret Burnett](http://web.engr.oregonstate.edu/~burnett/) showed how studying the **barriers** faced by a segment of a population (in this case gender) could be used to for making design improvements that benefit the whole population.

[Margaret-Anne Storey](http://webhome.cs.uvic.ca/~mstorey) reflected on [the trials and tribulations](http://www.slideshare.net/mastorey/icpc-2011-storey-8471063) of trying to bring a software visualization system (SHriMP) to become loved and adopted by professional programmers.  In the process, she emphasized on the importance of working with **cognitive theories**, but also pointed out that our current set of program comprehension theories have long since expired.



## Technical Program



The technical program was both interesting and strong with a nice mix of topics.  Which was something, personally, I did not see at ICSE.

The program started out on a technical note: clustering, identifier splitting, smoothing filters to improve information retrieval (IR) tasks in software.  The tradition of awarding best papers to IR papers also continued with "Improving IR-based Traceability Recovery Using Smoothing Filters" taking the price.

Another strong topic that emerged was the study of the interaction or work history of developers.  [Annie Ying](http://www.cs.mcgill.ca/~martin/papers/icpc2011.pdf) looked at edit patterns and their relation of task difficulty. [David Röthlisberger](http://www.droethlisberger.ch/) studying patterns of artifact relevancy for different types of programming tasks.  [Lile Hattori](http://www.inf.usi.ch/phd/hattori/) had an well-performed [study](http://www.inf.usi.ch/faculty/lanza/Downloads/Hatt2011a.pdf) studying the benefit of replaying code changes in the IDE in comparison to viewing differences in subversion.   

There were also some really nice empirical studies and tools.  [Anja Guzzi](http://swerl.tudelft.nl/bin/view/Main/AnjaGuzzi) gave a spunky presentation (one of the best talks) on collaborative bookmarks in the IDE (Check out [Pollicino](http://www.st.ewi.tudelft.nl/~guzzi/pollicino/)).  Stefan Endrikat laid a critical eye over aspect-oriented programming (AOP) with a study that cast doubt over the purported benefits of AOP.
[Daqing Hou](http://people.clarkson.edu/~dhou/) manually poured over newsgroup postings to get a better understanding of why developers have trouble about certain API methods.



## Industrial Challenge



The [industrial challenge](http://icpc2011.cs.usask.ca/conf_site/IndustrialTrack.html) was a different but refreshing way of engaging researchers.  There were two parts: first use current code comprehension tools to try find and fix three bugs in a robot controller part.  Second, use those insights to write fictional emails to other stakeholders: customer support, another company tech lead, and CEO.

There were several interesting outcomes:

- No submission used a IR-based technique despite popularity in community.
- Two submissions used statistical debugging techniques, and both performed very poorly due to superficial understanding of the bugs.
- The simplest techniques worked the best: program slicing and code differences.
- The social aspect (emails) proved to be the most difficult aspect for participants.  The challenge exposed the need to explore more of the ecosystem of program comprehension, and how different stakeholders may have different information needs that are not currently targeted by any research effort or tool.

See how the winner did it: [part 1](http://blog.frama-c.com/index.php?post/2011/06/06/Fixing-robots%2C-part-1), [part 2](http://blog.frama-c.com/index.php?post/2011/06/09/Fixing-robots-part-2), and [final thoughts](http://blog.frama-c.com/index.php?post/2011/06/12/Final-thoughts-ICPC-2011-industrial-challenge).



## Other Notes



- We need to archive conference tweets.  They're already gone from twitter...  UPDATE: Andrian Kuhn has archived them [here](https://github.com/akuhn/data/blob/master/tweets/icpc2011.json).

- Many researchers don't have their slides, papers, or tools online!

- I would like to see more IR-papers that focus on tool-building and describe the experiences of putting these tools in the hands of developers.