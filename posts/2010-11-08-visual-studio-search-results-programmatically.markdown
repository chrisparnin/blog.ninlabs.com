---
comments: true
date: 2010-11-08
layout: post
slug: visual-studio-search-results-programmatically
title: Visual Studio Search Results, Programmatically
wordpress_id: 54
tags:
- code
- vsx
---

If you want to log searches for code or perhaps wanted to provide a better UI for search results, then you need to listen to search events with a Visual Studio Addin/VSPackage.

Unfortunately, there still isn't a direct interface for getting search results... you actually have to copy the text from the UI window...yuck.

Here is some code that does this:

First, setup the find "done" event handler.
    EnvDTE.FindEvents m_findEvents;

    protected override void Initialize()
    {
        Trace.WriteLine (string.Format(CultureInfo.CurrentCulture, "Entering Initialize() of: {0}", this.ToString()));
        base.Initialize();

        var dte = (EnvDTE.DTE)GetService(typeof(EnvDTE.DTE));
        if (dte != null)
        {
           m_findEvents = dte.Events.FindEvents;
           m_findEvents.FindDone += new EnvDTE._dispFindEvents_FindDoneEventHandler(m_findEvents_FindDone);
        }
    }

Now, process the results by grabbing the find results window and copying the text in the window.

    void m_findEvents_FindDone(EnvDTE.vsFindResult Result, bool Cancelled)
    {
        var dte = (EnvDTE.DTE)GetService(typeof(EnvDTE.DTE));
        // Get search term, window location, etc...;
        var x = dte.Find.FindWhat;
        var guid = dte.Find.ResultsLocation == vsFindResultsLocation.vsFindResults1 ?
                "{0F887920-C2B6-11D2-9375-0080C747D9A0}" : "{0F887921-C2B6-11D2-9375-0080C747D9A0}";

        var findWindow = dte.Windows.Item(guid);
        var selection = findWindow.Selection as TextSelection;
        // Get search text results;
        var endPoint = selection.AnchorPoint.CreateEditPoint();
        endPoint.EndOfDocument();
        var text = endPoint.GetLines(1, endPoint.Line);
     }

References:

* A good [reference](http://dotneteers.net/blogs/divedeeper/archive/2009/02/02/LearnVSXNowPart41.aspx) on tool windows.
* An older [post](http://www.helixoft.com/blog/archives/23) on this topic.

In order to get "Find Symbol" results, might have to use a mpf service...
