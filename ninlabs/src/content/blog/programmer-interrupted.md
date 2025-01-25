---
author: Chris Parnin
category: General
draft: false
image:
  alt: ''
  src: ''
publishDate: '2013-01-19'
snippet: ''
tags:
- research
- programming
- memory
- interruption
title: Programmer Interrupted
---

I'm writing this post in an apt state: low-sleep, busy, disorientated, and interrupted. 
I try all the remedies: [Pomodoro][], [working in coffee shops][], [headphones][], 
and avoiding work until being [distraction free in the late night][].

But it is only so long before interruption finds a way to pierce my protective bubble.  Like you, *I am programmer, interrupted*. Unfortunately, our understanding of interruption and remedies for them are not too far from homeopathic cures and bloodletting leeches.

But what is the evidence and what can we do about it?
Every few months I still see programmers who are asked to [not use headphones][] during work hours or are interrupted by meetings too frequently but have little defense against these claims.  I also fear our declining ability to handle these mental workloads and interruptions [as we age][].

The costs of interruptions have been studied in office environments. An interrupted task is estimated to take twice as long and contain twice as many errors as uninterrupted tasks ([Czerwinski:04][]). Workers have to work in a fragmented state as 57% of tasks are interrupted ([Mark:05][]). 

For programmers, there is less evidence of the 
effects and prevalence of interruptions. Typically, the number that gets tossed around 
for getting back into the "zone" is at least 15 minutes after an interruption. 
Interviews with programmers produce a similiar number ([vanSolingen:98][]). 
Nevertheless, numerous figures have weighed in: Paul Graham stresses the differences between a [maker's schedule and manager's schedule][MakerSchedule]. 
Jason Fried says the office is [where we go to get interrupted][whywecantworkatwork].


### Interruptions of Programmers

Based on a analysis of 10,000 programming sessions recorded from 86 programmers using Eclipse and Visual Studio and a survey of 414 programmers ([Parnin:10][]), we found:

* A programmer takes between 10-15 minutes to start editing code after resuming work from an interruption.

* When interrupted during an edit of a method, only 10% of times did a programmer resume work in less than a minute.

* **A programmer is likely to get just one uninterrupted 2-hour session in a day**

We also looked at some of the ways programmers coped with interruption: 

* Most sessions programmers navigated to several locations to rebuild context before resuming an edit.

* Programmers insert intentional compile errors to force a "roadblock" reminder.

* A source diff is seen as a last resort way to recover state but can be cumbersome to review


### Worst Time to Interrupt a Programmer

Research shows that the worst time to interrupt anyone is when they have the highest memory load.  Using neural correlates for memory load, such as pupillometry, studies have shown that interruptions during peak loads cause the biggest disruption([Iqbal:04][]).

![Pupil](/media/Pupil.png)

We looked at subvocal utterances during a programming tasks to find different levels of memory load during programming tasks ([Parnin:11][]).

![Subvocal](/media/Subvocal.png)

If an interrupted person is allowed to suspend their working state or reach a "good breakpoint", then the impact of the interruption can be reduced ([Trafton:03][]).  However, programmers often need at least 7 minutes before they transition from a high memory state to low memory state ([Iqbal:07][]).  An experiment evaluating which state a programmer less desired an interruption found these states to be especially problematic ([Fogarty:05]):

* During an edit, especially with concurrent edits in multiple locations.
* Navigation and search activities.
* Comprehending data flow and control flow in code.
* IDE window is out of focus.


### A Memory-Supported Programming Environment 

Ultimately, we cannot eliminate interruptions. In some cases interruption may even be beneficial.  But we can find ways to reduce the impact on the memory failures that often result from interruption.  I introduce some types of memory that get disrupted or heavily burdened during programming and some conceptual aids that can support them.

#### Prospective Memory

_Prospective memory_ holds reminders to perform future actions in specific circumstances _e.g._ to buy milk on the way home from work ([PM][]).

Various studies have described how developers have tried to cope with prospective memory failures.  For example, developers often leave TODO comments in the code they are working on ([Storey:08][]). A drawback of this mechanism is that there is no impetus for viewing these reminders.  Instead, to force a prospective prompt, developers may intentionally leave a compile error to ensure they remember to perform a task ([Parnin:10][]).  A problem with compile errors is that they inhibit the ability to switch to another task on the same codebase.  Finally, developers also do what other office workers do: leave sticky notes and emails to themselves ([Parnin:10][]).

A **smart reminder** is reminder that can be triggered based on conditions such as _a teammate checking in code_, or _proximity to a reminder_:
![SmartReminder](/media/SmartReminder.png)

#### Attentive Memory

[Attentive memory](http://blog.ninlabs.com/2012/02/memory-2-0-attentive-memory/) holds conscious memories that can be freely attended to.

Some programming tasks require developers to make similar changes across a codebase.  For example, if a developer needs to refactor code in order to move a component from one location to another or to update the code to use a new version of an API, then that developer needs to systematically and carefully edit all those locations affected by the desired change.  Unfortunately, even a simple change can lead to many complications, requiring the developer to track the status of many locations in the code.  Even worse, after an interruption to such as task, the tracked statuses in attentive memory quickly evaporate and the numerous visited and edited locations confound retrieval.

**Touch points** allow a programmer to track status across many locations in code.

![TouchPoint](/media/TouchPoint.png)

#### Associative Memory

_Associative memory_ holds a set of non-conscious links between manifestations of co-occurring stimuli.

Developers commonly experience disorientation when navigating to unfamiliar code.  The disorientation stems from associative memory failures that arise when a developer must recall information about the places of code they are viewing or what to view next.
Researchers believe the lack of rich and stable environmental cues in interface elements, such as document tabs, prevent associative memories from being recalled.

The presence of multiply modalities in a stimulus increases the ability to form an associative memory.  In this sense, a _modality_ refers to distinct type of perceptions that is processed by a distinct regions of the brain, such as auditory or visual pathways.  Examples of different modalities include: lexical, spatial, operational, and structural.
When multiple modalities are present in the same stimulus, more pathways are activated, thus increasing the chance of forming an associative memory.  In contrast, a monotonous stimulus with a single modality is less likely to form an associative memory.

An **associative link** helps a programmer by situating information of multiple modalities with a program element.  In particular, by improving navigating document tabs, which default configuration are especially spartan, often just showing the name of the document. 

![AssociativeLink](/media/AssociativeLink.png)

#### Episodic Memory

_Episodic memory_ is the recollection of past events.

Software developers continually encounter new learning experiences about their craft. 
Retaining and making use of those such acquired knowledge requires that developers are able to recollect those experiences from their episodic memory.
When recalling from episodic memory, developers commonly experience failures that limit their ability to recall essential details or recollect the key events.  For example, a developer may forget the changes they performed for a programming task, or forget details such as a the blog post that was used for implementing a part of the task.

A **code narrative** is an episodic memory aid that helps a developer recall contextual details and the history of programming activity. 
Two narrative structures are currently supported: A review mode for high-level recall of events and a share mode for publishing a coding task for others.

![CodeNarrative](/media/CodeNarrativeEx.png)

See [a blog post](http://codenarratives.tumblr.com/post/22999194625/sharing-wrappers-with-datacontractjsonserializer-and) shared and published semi-automatically via a code narrative.

#### Conceptual Memory

Conceptual memory is a continuum between perceptions and abstractions.
How does the brain remember objects such as a hammer and concepts such as _tool_? 
The brain first learns basic features of encountered stimuli such as the wood grains 
and metal curves of a hammer and then organizes those features into progressively higher levels of abstraction.

Developers are expected to maintain expertise in their craft throughout their careers. Unfortunately, the path to becoming an expert is not easily walked:
For a novice, evidence suggests this can be a 10 year journey ([Chi:82][]).  Furthermore, for experts trying to become experts in new domains,
like the desktop developer becoming a web developer, there are many concepts that must be put aside and new ones learned.

Studies examining the difference between an expert and novice find that performance differences arise from differences in brain activity. Not only do experts require less brain activity than novices, they also use different parts of their brains ([Milton:07][]): Experts use conceptual memory whereas novices use attentive memory. That is, experts are able to exploit abstractions in conceptual memory, whereas novices must hold primitive representations in attentive memory.

**Sketchlets**(alpha) helps a programmer form and prime concepts by 
supporting abstraction and reviewing concepts that need to be refreshed.

![Sketchlets](/media/Sketchlets.png)

### Future

* fMRI studies of programmers.  See [preliminary research](http://wwwiti.cs.uni-magdeburg.de/~feigensp/experiments/fMRI/index.php)!
* Will future programmers take **designer nootropics** for boosting memory and attention to keep up?
* Can we predict the memory load of using a language feature or performing a particular programming tasks?
* What new tool ideas can be derived for programmers?
* What experiments need to be run?

**Interested in participating in an experiment or have any ideas?** Email me at `chris.parnin@gatech.edu` or comment below.

### References

* [Pomodoro](http://www.lifehack.org/articles/productivity/the-pomodoro-technique-is-it-right-for-you.html)
* [working in coffee shops](http://lifehacker.com/5637503/how-to-stay-productive-working-from-coffee-shops-or-anywhere-out-of-the-office)
* [headphones](http://www.codinghorror.com/blog/2005/12/headphone-snobbery.html)
* [distraction free in the late night](http://www.businessinsider.com/why-programmers-work-at-night-2013-1)
* [not use headphones](http://programmers.stackexchange.com/questions/97917/my-company-wont-let-me-listen-to-music-anymore)
* [as we age](http://improvingsoftware.com/2009/05/19/programmers-before-you-turn-40-get-a-plan-b/)

* [Czerwinski:04 - A diary study of task switching and interruptions](http://dx.doi.org/10.1145/985692.985715)
* [Mark:05 - No task left behind?: examining the nature of fragmented work](http://dx.doi.org/10.1145/1054972.1055017)
* [vanSolingen:98 - Interrupts: just a minute never is](http://dx.doi.org/10.1109/52.714843)
* [Maker's Schedule](http://www.paulgraham.com/makersschedule.html)
* [Why We Cant Work at Work](http://bigthink.com/ideas/18522)

* [Iqbal:04 - Task-evoked pupillary response to mental workload in HCI](http://dx.doi.org/10.1145/985921.986094)
* [Parnin:11 - Subvocalization – Toward Hearing the Inner Thoughts of Developers](http://www.cc.gatech.edu/~vector/papers/emg.pdf)
* [Iqbal:07 - Understanding and developing models for detecting and differentiating breakpoints during interactive tasks](http://dx.doi.org/10.1145/1240624.1240732)
* [Trafton:03 - Preparing to resume an interrupted task: effects of prospective goal encoding and retrospective rehearsal](http://dx.doi.org/10.1016/S1071-5819(03)00023-5)
* [Fogarty:05 - Examining task engagement in sensor-based statistical models of human interruptibility](http://dx.doi.org/10.1145/1054972.1055018)

* [Parnin:10 - Resumption strategies for interrupted programming tasks](http://www.cc.gatech.edu/~vector/papers/sqj.pdf)
* [Storey:08 - TODO or to bug: exploring how task annotations play a role in the work practices of software developers](http://dx.doi.org/doi:10.1145/1368088.1368123)
* [PM - Prospective Memory: Cognitive, Neuroscience, Developmental, and Applied Perspectives](http://books.google.com/books?id=_d1OtGDF7IUC&d)
* [Chi:82 - Expertise in Problem Solving](http://www.public.asu.edu/~mtchi/papers/ChiGlaserRees.pdf)
* [Milton:07 - The mind of expert motor performance is cool and focused](http://dx.doi.org/10.1016/j.neuroimage.2007.01.003)

[Pomodoro]:http://www.lifehack.org/articles/productivity/the-pomodoro-technique-is-it-right-for-you.html
[working in coffee shops]:http://lifehacker.com/5637503/how-to-stay-productive-working-from-coffee-shops-or-anywhere-out-of-the-office
[headphones]:http://www.codinghorror.com/blog/2005/12/headphone-snobbery.html
[distraction free in the late night]:http://www.businessinsider.com/why-programmers-work-at-night-2013-1
[not use headphones]:http://programmers.stackexchange.com/questions/97917/my-company-wont-let-me-listen-to-music-anymore
[as we age]:http://improvingsoftware.com/2009/05/19/programmers-before-you-turn-40-get-a-plan-b/
[Czerwinski:04]:http://dx.doi.org/10.1145/985692.985715
[Mark:05]:http://dx.doi.org/10.1145/1054972.1055017
[vanSolingen:98]:http://dx.doi.org/10.1109/52.714843
[MakerSchedule]:http://www.paulgraham.com/makersschedule.html
[whywecantworkatwork]:http://bigthink.com/ideas/18522

[Iqbal:04]:http://dx.doi.org/10.1145/985921.986094
[Parnin:11]:http://www.cc.gatech.edu/~vector/papers/emg.pdf
[Iqbal:07]:http://dx.doi.org/10.1145/1240624.1240732
[Trafton:03]:http://dx.doi.org/10.1016/S1071-5819(03)00023-5
[Fogarty:05]:http://dx.doi.org/10.1145/1054972.1055018

[Parnin:10]:http://www.cc.gatech.edu/~vector/papers/sqj.pdf

[Storey:08]:http://dx.doi.org/doi:10.1145/1368088.1368123
[PM]:http://books.google.com/books?id=_d1OtGDF7IUC&d
[Chi:82]:http://www.public.asu.edu/~mtchi/papers/ChiGlaserRees.pdf
[Milton:07]:http://dx.doi.org/10.1016/j.neuroimage.2007.01.003