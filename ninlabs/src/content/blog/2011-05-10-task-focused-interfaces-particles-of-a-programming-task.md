---
author: Chris Parnin
category: General
draft: false
image:
  alt: ''
  src: ''
publishDate: '2011-05-10'
snippet: ''
tags:
- research
- interruption
title: 'Task-focused Interfaces: Particles of a programming task?'
---

## Hunting Particles

**Tasks**, for the purpose of this post, are assigned units of work. In practice, this may be a “story” or “defect” from an iteration in the agile world, or a “work item” in TFS land, or even a “feature” in trackers such as trac. There are many names given to tasks, but for the programmer, ultimately they are externally assigned **responsibilities**.

Tasks are also broken down. For example, in version one, a “epic” is often broken down into several “stories”, and ending with “tasks” that may be split across multiple iterations or developers.

But does it end there? Are tasks indivisible atoms of software development? [Survey says, not likely](http://portal.acm.org/citation.cfm?id=1753326.1753342). When 414 professional developers were asked about the nature of assigned tasks, more often then not, developers felt the actual work had to be broken down much further, usually after exploration and experimentation and involved elaboration on many steps, issues, and TODOs.

![TaskSurvey](http://blog.ninlabs.com/wp-content/uploads/2011/05/tasks.png)

## Task-focused Interfaces

Although we have excellent tools for issue and task tracking, there is a gap in tool support for managing and tracking the knowledge and breakdowns beyond the initial assigned responsibility. Instead, these sorts of information are scattered on scraps of paper, white boards, source code comments, or human memory. Studies on interruptions of programmers show that after an interruption, programmers [spend 15-30 minutes](http://dx.doi.org/10.1007/s11219-010-9104-9) gathering loss information before making their first edit.

The most successful attempt at solving this problem has been, [Mylyn](http://www.eclipse.org/mylyn/), a “task-focused interface” available in Eclipse that will track the “task context”.

There are two weaknesses that can be improved upon:
1) The idea of “task context” has been mostly limited to the files and methods that were visited or edited during a particular task. Surely there is much more bits of “context” than places in code.
2) Breakdowns of tasks are a little heavy weight. Although the idea of “subtasks” are supported, they are not frequently [used in practice](http://www.eclipse.org/org/usagedata/results.php). Eclipse usage data suggests that less than 10 users have created subtasks compared to the hundreds that have “activated” Mylyn tasks.

## Task-focused Interfaces 2.0: Tasklets and Memlets

I have been researching alternatives how IDE interfaces can better support task information. I have looked at spatial interfaces, such as [CodePad](http://dx.doi.org/10.1145/1879211.1879217), that can serve as an “external thought-space”. [Code Bubbles](http://www.andrewbragdon.com/codebubbles_site.asp) is also an interesting stab at this concept.

![CodePad](http://www.cc.gatech.edu/~vector/images/codepad.png)

More recently, I’ve been looking at how to support more capturing “particles” of a task. **Tasklets**, can be opened as tabs, and let you keep a separate workspace and state for different activities (information seeking task without trashing your context). **Memlets** record everything about programming state. Stack traces, search results, code diffs, code fragments and annotations, prospective reminders, thoughts, issues, and objectives. These all exist within a tasklet or task’s workspace. Memlets also include automatically associated properties, like [url provenance](/tech-preview-code-provenance-for-visual-studio) when copying code from a stackoverflow post.

All these are stored in an local history repository. But they can be pushed and promoted beyond the “personal” boundary and into “public” or “team” space. Sorta sounds like git, but for your context. They are also fully searchable. Rather than just searching code, you can search for a “recent” change, or information held in a “recent” stack trace.