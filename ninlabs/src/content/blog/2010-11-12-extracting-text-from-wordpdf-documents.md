---
author: Chris Parnin
category: General
draft: false
image:
  alt: ''
  src: 'https://blog.ninlabs.com/wp-content/uploads/2010/11/papercloud.png'
publishDate: '2010-11-12'
snippet: ''
tags:
- code
title: Extracting text from Word/PDF documents
---

Need to make a word cloud out of a whole bunch of documents or calculate some simple statistics?
[Lucene](https://lucene.apache.org/java/docs/index.html) is great for indexing documents, but I wanted something quick and dirty I could mess around with.

For example, here is a cloud tag from my research papers:
[![](https://blog.ninlabs.com/wp-content/uploads/2010/11/papercloud.png)](https://blog.ninlabs.com/wp-content/uploads/2010/11/papercloud.png)

Some quick code I cooked up to extract text from a collection of word/pdf:

You'll need to include these references:

```c#
    using Word=Microsoft.Office.Interop.Word;
    using System.Text.RegularExpressions;
    using org.pdfbox.pdmodel;
    using org.pdfbox.util;
    using System.IO;
```

Read up the pdf project parser [here](http://www.codeproject.com/KB/string/pdf2text.aspx).
This will get the raw text from a pdf.  

```c#
    private static string ReadPDFText(string name)
    {
        try
        {
            var doc = PDDocument.load(name);
            var stripper = new PDFTextStripper();
            return stripper.getText(doc);
        }
        catch
        {
            return "";
        }
    }
```

Getting text from word documents, involves using word automation:

```c#
    // Set up object
    var app = new Word.Application();
    app.Visible = false;
    ...
    content = OpenWordDoc(app,file);
    // Shut down
    var missing = Type.Missing;
    app.Quit(ref missing, ref missing, ref missing);
```

You'll have to open the word document and read it's text like this:

```c#
    private static string OpenWordDoc(Word.Application app, string name)
    {
        object readOnly = true;
        object missing = Type.Missing;
        object fileName = System.IO.Path.GetFullPath(name);
            
        var doc = app.Documents.Open(ref fileName,
          ref missing, ref readOnly, ref missing, ref missing, ref missing,
          ref missing, ref missing, ref missing, ref missing, ref missing,
          ref missing, ref missing, ref missing, ref missing, ref missing);

        string text = doc.Content.Text;
        app.Documents.Close(ref missing, ref missing, ref missing);
        return text;
    }
```

Now that you have the raw text, you just need to "tokenize" it.

```c#
    private static Dictionary<string, int> GetWords(string content)
    {
        Dictionary<string, int> dict;
        var list = Regex.Split(content, @"\W+");
        foreach (var word in list)
        {
            string low = word.ToLower();
            if (!dict.ContainsKey(low))
            {
                dict[low] = 0;
            }
            dict[low]++;
        }
        return dict;
    }
```

Now you can filter down and process the results anyway you like:

```c#
    var ranked = dict.OrderBy(pair => -pair.Value).ToList();
    var filtered = ranked.Where( pair => IsAlphabeticString(pair.Key) ).ToList();
```

Now, you can simply output this dictionary and use the output in a word cloud generator such as [wordle.net](https://www.wordle.net/create)

You can download the whole thing here: [GenerateWordTagCloud.zip [C# VS2010 Project]](https://se.ninlabs.com/downloads/GenerateWordTagCloud.zip).