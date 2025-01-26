---
author: Chris Parnin
category: Code
draft: false
image:
  alt: ''
  src: ''
publishDate: '2011-10-06'
snippet: ''
tags:
- code
- vsx
title: 'Building a Visual Studio History Extension Part #1'
---

I will publishing a series of blog posts describing how to extend Visual Studio (VSX in particular) to maintain a history of code changes or actions within the IDE.  The audience for these articles would most likely be researchers who are trying to understand how to do interesting developer analytics, intelligent work summaries, or build interesting work history visualizations, or next-gen developer tools.

I will be starting out with how to set up an package which will be the core entry point into Visual Studio receiving events.  It used to be prior to Visual Studio 10, you could only create a VSIP Package that allowed deep integration with Visual Studio if you jumped through all sorts of hoops and hurtles.

First, make sure you have the [Visual Studio SDK SP1](http://www.microsoft.com/download/en/details.aspx?id=21835) installed.  These will install some private assemblies and create some project templates.

Let's create the project called VSHistory.
[![](http://blog.ninlabs.com/wp-content/uploads/2011/10/NewPackage.png)](http://blog.ninlabs.com/wp-content/uploads/2011/10/NewPackage.png)

This will create a new file VSHistoryPackage.cs.  One attribute that we will want to add that is essential for a history extension is an "autoload" attribute.  This will make sure the package is loaded and initialized without having to launch it from a menu: in this case, it is autoloaded when an solution is available.

```c#
    [ProvideAutoLoad(VSConstants.UICONTEXT.SolutionExists_string)]
```

Next thing we will want to add is an [IVsSolutionEvents](http://msdn.microsoft.com/en-us/library/microsoft.visualstudio.shell.interop.ivssolutionevents(v=vs.80).aspx) interface.  This will make sure we can respond to events like a project or opening.

```c#
    public sealed class VSHistoryPackage : Package, IVsSolutionEvents

    public int OnAfterOpenSolution(object pUnkReserved, int fNewSolution)
    {
       return VSConstants.S_OK;
    }
```

Ok.  Let's start by with learning an important concept as well as grabbing a handy service.
The EnvDTE automation framework for Addins is old, obsolete, and a second-class citizen, but sometimes there are some things only it provides.  You can ask for this service using this pattern:

```c#
    EnvDTE.DTE m_dte;
    public int OnAfterOpenSolution(object pUnkReserved, int fNewSolution)
    {
       m_dte = (EnvDTE.DTE)this.GetService(typeof(EnvDTE.DTE));
       if (m_dte == null)
          ErrorHandler.ThrowOnFailure(1);
       if (m_dte.Solution != null)
       {
          Trace.WriteLine(m_dte.Solution.FullName);
       }
       return VSConstants.S_OK;
    }
```

To start listening to these events we need to get the Solution service and listen to it's events.

```c#
    uint m_solutionCookie = 0;
    protected override void Initialize()
    {
       Trace.WriteLine (string.Format(CultureInfo.CurrentCulture, "Entering Initialize() of: {0}", this.ToString()));
       base.Initialize();

       IVsSolution solution = (IVsSolution)GetService(typeof(SVsSolution));
       ErrorHandler.ThrowOnFailure(solution.AdviseSolutionEvents(this, out m_solutionCookie));
    }
```

Next post will cover using the running documents table to capture saves to code documents.