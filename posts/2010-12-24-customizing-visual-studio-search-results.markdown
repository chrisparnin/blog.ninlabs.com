---
comments: true
date: 2010-12-24
layout: post
slug: customizing-visual-studio-search-results
title: Customizing Visual Studio Search Results
wordpress_id: 102
tags:
- code
- vsx
---

Display of search results in Visual Studio has been remarkably primitive despite numerous improvements in other areas.  Eclipse, in contrast has added some compelling features such as clustered results grouped by packages and classes and the ability to prune results.  Now, simplicity has its place, sometimes the simple list of text makes it easier to scan.

Previously, I described how to retrieve search results [programmatically](http://blog.ninlabs.com/2010/11/visual-studio-search-results-programmatically/).  Here, I show a proof-of-concept on how to customize the look and feel of search results in Visual Studio:

[![](http://blog.ninlabs.com/wp-content/uploads/2010/12/CustomizedSearchResults.png)](http://blog.ninlabs.com/wp-content/uploads/2010/12/CustomizedSearchResults.png)

I've written a proof-of-concept visual studio extension that will highlight search results that you have visited. Unlike [other customization attempts](http://saraford.net/2008/11/24/did-you-know-you-can-customize-how-search-results-are-displayed-in-the-find-results-window-363/) that modify registry settings to shorten file paths, here, we can actually change the visual tree.

Here's how I did it:

First, get the search results window as a [IWpfTextView](http://msdn.microsoft.com/en-us/library/microsoft.visualstudio.text.editor.iwpftextview.aspx).

    // Get search results window 1
    IVsUIShell shell = (IVsUIShell)this.GetService(typeof(SVsUIShell));
    Guid windowGuid = new Guid(EnvDTE.Constants.vsWindowKindFindResults1);
    IVsWindowFrame windowFrame = null;
    shell.FindToolWindow((uint)__VSFINDTOOLWIN.FTW_fFindFirst, ref windowGuid, out windowFrame);

    // Get Document
    object view;
    windowFrame.GetProperty((int)__VSFPROPID.VSFPROPID_DocView, out view);

    //Get WPF Version of view;
    IComponentModel componentModel = this.GetService(typeof(SComponentModel)) as IComponentModel;
    var factory = componentModel.GetService<IVsEditorAdaptersFactoryService>();
    var wpfView = factory.GetWpfTextView(view as IVsTextView);

    // Listen to double click events
    if (wpfView != null)
    {
       var viz = wpfView.VisualElement as Control;
       if (viz != null)
       {
           viz.MouseDoubleClick += delegate(object sender, MouseButtonEventArgs e)
           {
               var me = sender as IWpfTextView;
               new ExperimentalAdornment(me);
           };
       }
    }

Surprisingly, the search results window supports MEF adornments just like VSX Editors.  This means we can add things like highlights without having to trash the WPF visual tree.

So second step is to define an adornment.  Note we actually don't have to create it here, since we only create it for when a search results is clicked on (see MouseDoubleClick above).

    [Export(typeof(IWpfTextViewCreationListener))]
    [ContentType("text")]
    [TextViewRole(PredefinedTextViewRoles.Document)]
    internal sealed class TextAdornment1Factory : IWpfTextViewCreationListener
    {
        [Export(typeof(AdornmentLayerDefinition))]
        [Name("ExperimentalAdornment")]
        [Order(After = PredefinedAdornmentLayers.Selection, Before = PredefinedAdornmentLayers.Text)]
        [TextViewRole(PredefinedTextViewRoles.Document)]
        public AdornmentLayerDefinition editorAdornmentLayer = null;
        public void TextViewCreated(IWpfTextView textView)
        {
        }
    }

Third step is the highlighting code:

    class ExperimentalAdornment
    {
        IAdornmentLayer _layer;
        IWpfTextView _view;
        int _lineNumber = 0;
        public ExperimentalAdornment(IWpfTextView view)
        {
            _layer = view.GetAdornmentLayer("ExperimentalAdornment");
            _view = view;

            _lineNumber = view.Selection.Start.Position.GetContainingLine().LineNumber;
            _view.LayoutChanged += OnLayoutChanged;
        }

        private void OnLayoutChanged(object sender, TextViewLayoutChangedEventArgs e)
        {
            var line = _view.TextSnapshot.GetLineFromLineNumber(_lineNumber);
            if (line != null)
            {
                FormatLine(line.Extent);
            }
        }

        private void FormatLine(SnapshotSpan span)
        {
            var g = _view.TextViewLines.GetMarkerGeometry(span);
            if (g != null)
            {
                //var textblock = new TextBlock();
                //textblock.Text = span.GetText();
                //textblock.FontFamily = new FontFamily("Consolas");
                //textblock.FontWeight = FontWeights.ExtraBold;

                var rectangle = new Rectangle();
                rectangle.Width = g.Bounds.Width;
                rectangle.Height = g.Bounds.Height;
                rectangle.Fill = Brushes.LightSalmon;

                Canvas.SetLeft(rectangle, g.Bounds.Left);
                Canvas.SetTop(rectangle, g.Bounds.Top);

                var res = _layer.AddAdornment(AdornmentPositioningBehavior.TextRelative, span, null, rectangle, null);
            }
        }
    }

Here is another screen shot but with instead a bold overlay:
[![](http://blog.ninlabs.com/wp-content/uploads/2010/12/BoldSearchResults.png)](http://blog.ninlabs.com/wp-content/uploads/2010/12/BoldSearchResults.png)

Now, it may be possible to do inline updates of search code if that code has been modified.  Very useful if tracking changes in many locations:
[![](http://blog.ninlabs.com/wp-content/uploads/2010/12/SearchUpdates.png)](http://blog.ninlabs.com/wp-content/uploads/2010/12/SearchUpdates.png)

These are only a few examples and the code as is would need a lot of work before release -- but hopefully this inspires others to discover many other possibilities.
