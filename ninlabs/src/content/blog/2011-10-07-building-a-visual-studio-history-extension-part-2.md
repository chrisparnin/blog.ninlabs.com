---
author: Chris
category: Code
draft: false
image:
  alt: ''
  src: ''
publishDate: '2011-10-07'
snippet: ''
tags:
- code
- vsx
title: 'Building a Visual Studio History Extension Part #2'
---

Continuing my last post on creating a basic history extension, let's actually do something!  Here, we dive into capturing events to code documents in Visual Studio and using that to create a help build a local code history for edits.

First, let's make a new `SaveListener` class that will subscribe to `Running Document Table` events.

```c#
    class SaveListener : IVsRunningDocTableEvents3 {
```

We need to request the SVsRunningDocumentTable service and subscribe to it's events.

```c#
    IVsRunningDocumentTable m_RDT;
    uint m_rdtCookie = 0;

    public bool Register()
    {
       // Register events for running document table.
       m_RDT = (IVsRunningDocumentTable)Package.GetGlobalService(typeof(SVsRunningDocumentTable));
       m_RDT.AdviseRunningDocTableEvents(this, out m_rdtCookie);

       return true;
    }
```

Because `SaveListener` implements the [IVsRunningDocTableEvents3](http://msdn.microsoft.com/en-us/library/microsoft.visualstudio.shell.interop.ivsrunningdoctableevents3(v=vs.80).aspx) interface, we'll able to pass `this` to receive event notifications.

For this blog post, let's try to grab and cache a copy of files about to be saved. This snippet will let us get some information about the file about to be saved such as the file name:

```c#
    public int OnBeforeSave(uint docCookie)
    {
       uint flags, readlocks, editlocks;
       string name; IVsHierarchy hier;
       uint itemid; IntPtr docData;
       m_RDT.GetDocumentInfo(docCookie, out flags, out readlocks, out editlocks, out name, out hier, out itemid, out docData);

       CopyFileToCache(name);

       return VSConstants.S_OK;
    }
```

Here is some C# IO code that will take care of copying the file to a cache directory:

```c#
    public void CopyFileToCache(string file)
    {
       try
       {
          var newPath = PrepareDocumentCache(file, DateTime.Now);
          System.IO.File.Copy(file, newPath, true);
       }
       catch (Exception ex)
       {
         Trace.WriteLine(ex.Message);
       }
    }

    private string PrepareDocumentCache(string file, DateTime day)
    {
       string relativePath = file.Replace(SolutionBaseDirectory + "\\", "");
       var dayStr = MakeDayString(day);
       var time = MakeTimeString(day);
       var newPath = System.IO.Path.Combine(ContextRepository, dayStr, relativePath + "$" + time);
       var dirPath = System.IO.Path.GetDirectoryName(newPath);
       if (!System.IO.File.Exists(dirPath))
       {
          // This will create subdirectories too if missing...
          System.IO.Directory.CreateDirectory(dirPath);
       }
       return newPath;
    }

    private static string MakeDayString(DateTime day)
    {
       return string.Format("{0:0000}", day.Year) + "\\" + string.Format("{0:00}", day.Month) + "\\" + string.Format("{0:00}", day.Day);
    }

    private static string MakeTimeString(DateTime time)
    {
       return time.ToString("hh.mm.ss.fff.tt");
    }
```

Let's add some code to shutdown the save listener.

```c#
    public void Shutdown()
    {
       if (m_RDT != null)
       {
          m_RDT.UnadviseRunningDocTableEvents(m_rdtCookie);
          m_RDT = null;
       }
    }
```

Finally, let's hook up the save listener from our Package we created in the first post so we can start it up and shut it down at the right time:

```c#
    SaveListener m_saveListener;
    public int OnAfterOpenSolution(object pUnkReserved, int fNewSolution)
    {
       m_dte = (EnvDTE.DTE)this.GetService(typeof(EnvDTE.DTE));
       if (m_dte == null)
          ErrorHandler.ThrowOnFailure(1);
       if( m_dte.Solution != null )
       {
          Trace.WriteLine(m_dte.Solution.FullName);
          m_saveListener = new SaveListener();
          m_saveListener.SolutionBaseDirectory = System.IO.Path.GetDirectoryName(m_dte.Solution.FullName);
          m_saveListener.ContextRepository = ".codeHistory";
          m_saveListener.Register();
       }
       return VSConstants.S_OK;
    }
```

Ok!  That's the basic idea behind creating a local history extension. Here, we're just copying the file to a cache.  Eclipse does something similar, except they use a heap directory structure.  I even have having each save be a commit to git, and it works nicely!

For some applications of a local history repository, check out my earlier post of ["code diffs redesigned"](http://blog.ninlabs.com/2010/11/code-diffs-redesigned/).  Another idea is to try out some developer analytics.  What API calls was I spending all my time mucking around with?  Maybe there is a lesson to be learned there?