---
author: Chris Parnin
category: General
draft: false
image:
  alt: ''
  src: ''
publishDate: '2011-11-02'
snippet: ''
tags:
- research
- code
- tools
title: Auto-blogging - Publishing a coding task to wordpress.
---

Commonly, we need to perform a programming task that we do not know how to do or is not well-documented. Collectively, we perform these reoccurring programming tasks all the time, but only a few of us actively blog or contribute to sites like stackoverflow with answers.  Thus, there are many remaining programming tasks, which are never documented for other teammates (on internal company blogs), don't have any (good) official documentation, or discussion on blogs or Q&A; sites.

If we can make it easier for people to blog, or share these experiences, then collectively we can make learning about these things a whole lot easier.  This might also make other situations, like a task-hand off to another teammate easier.  This post is a research demonstration of a technique that analyzes the coding history of a programmer and then automatically creates a blog summary of how they programmed that bit of functionality.  This is still at the earliest stages, but I hope there is a lot of room for growth and expansion.

Check out the demonstration, and then some of the next steps below.

## Proof-of-concept: Auto-generating a coding task blog post





This is an semi-automatically generated blog post created with the aid of some research tools I'm developing!

First, I'll show you how this post got here, and then use it to illustrate a recent coding task involving programmatically "publishing" a blog post from C# code.



[![](http://blog.ninlabs.com/wp-content/uploads/2011/11/overall-1024x626.png)](http://blog.ninlabs.com/wp-content/uploads/2011/11/overall.png)



## Auto-generating code snippets in Visual Studio.





First, click "Auto-Populate" (by default looks at most recent activity in 24 hours).



[![](https://blog.ninlabs.com/wp-content/uploads/2011/11/Step1.png)](https://blog.ninlabs.com/wp-content/uploads/2011/11/Step1.png)



This populates the code narrative with a series of code changes, chunked by files, and ordered by median change activity per file.



[![](https://blog.ninlabs.com/wp-content/uploads/2011/11/Step2.png)](https://blog.ninlabs.com/wp-content/uploads/2011/11/Step2.png)


The code snippet has symbolic links such as method definitions that can be clicked to return to that location in code (if more context is needed).  The code snippet can be edited or removed as needed.





Another useful item is a section.  Sections can be used to break up the code snippets, and can even be expanded or collapsed to ease review and edit of the code narrative.



[![](https://blog.ninlabs.com/wp-content/uploads/2011/11/Step3.png)](https://blog.ninlabs.com/wp-content/uploads/2011/11/Step3.png)



Finally, explanatory text or an exposition item, such as this paragraph, can be inserted, to help add clarification to a code snippet.  Any item can be dragged and dropped to reorder items to the desired position.





## Sample Coding Task - Programmatically publishing a blog post with C#




First, I added a Publish link to my Code Narrative tool window in Visual Studio.  We'll eventually hook up the command in the view model below.


    <Label>
        <Hyperlink Command="{Binding PublishCommand}">Publish</Hyperlink>
    </Label>

Next, I create some simple data structures for the published blog post and site.

```c#
    public class BlogPost
    {
        public string Title { get; set; }
        public DateTime DateTime { get; set; }
        public List<string> Entries { get; set; }
    }

    public class BlogSite
    {
        public string Url = "http://blog.ninlabs.com";
        public string User = "******";
        public string Password = "*****";
    }
```

Next up, I create a BlogConnector which will provide the primary abstraction for making a connection to a blog site.

```c#
    class BlogConnector
    {
        private MetaWeblogClientProtocol protocol;
        BlogSite m_site;
        public BlogConnector(BlogSite site)
        {
            m_site = site;
            var url = site.Url.TrimEnd('/');
            protocol = new MetaWeblogClientProtocol();
            protocol.Url = url + "/xmlrpc.php";
            protocol.Credentials = new NetworkCredential(site.User, site.Password);
        }

        public string NewPost(BlogPost content, bool publish)
        {
            // Convert XML RPC post
            var post = new Post();
            post.title = content.Title;
            post.dateCreated = content.DateTime;
            post.description = string.Join("\n", content.Entries);
            post.categories = new string[]{"tutorial", "auto-blog"};

            // first paramter, blogId, is ignored by wordpress.
            return protocol.newPost("", m_site.User, m_site.Password, post, publish);
        }
    }
```

But, `MetaWeblogClientProtocol` is where all the magic happens.  This is using the `XML-RPC` protocol to do the actual interaction with the wordpress backend.
This requires a 3rd party library, which can be found [here](https://www.xml-rpc.net/download.html).


```c#
    // minimal wordpress client (new post only), using the MetaWeblog API.
    // based on metaweblog xml rpc client at:
    // http://msdn2.microsoft.com/en-us/library/bb259701.aspx

    // blog post information.
    [XmlRpcMissingMapping(MappingAction.Ignore)]
    struct Post
    {
        public DateTime dateCreated;
        public string description;
        public string title;
        public string[] categories;
    }

    internal class MetaWeblogClientProtocol : XmlRpcClientProtocol
    {
        // new post.
        [XmlRpcMethod("metaWeblog.newPost")]
        public string newPost(
        string blogId,
        string userName,
        string password,
        Post content,
        bool publish)
        {
            return (string)this.Invoke("newPost", new object[] { blogId, userName, password, content, publish });
        }
    }
```

Next, we translate my "narrative" data structures to HTML equivalents.  The code tag is targeting a wordpress syntax highlighting extension.

```c#
    public class StoryHtml
    {
        public List<string> FormatItems(IEnumerable<NarrativeItem> items,string lang)
        {
            var list = new List<string>();
            foreach (var item in items)
            {
                if (item.Kind == NarrativeItemKind.CodeSnippetBuilder)
                    list.Add(FormatCodeSnippet(item, lang));
                if (item.Kind == NarrativeItemKind.Exposition)
                    list.Add(FormatExposition(item));
                if (item.Kind == NarrativeItemKind.SectionBuilder)
                    list.Add(FormatSection(item));
            }
            return list;
        }

        public string FormatSection(NarrativeItem item)
        {
            if (item.Kind != NarrativeItemKind.SectionBuilder)
            {
                throw new ArgumentException();
            }
            return string.Format("<h2>{0}</h2>", item.SnippetText);
        }

        public string FormatCodeSnippet(NarrativeItem item, string lang)
        {
            if (item.Kind != NarrativeItemKind.CodeSnippetBuilder)
            {
                throw new ArgumentException();
            }
            // Actually, code is surrounded with [], but need to figure out how escape that!
            return string.Format("code lang=\"{0}\"{1}/code", lang, item.SnippetText);
        }

        public string FormatExposition(NarrativeItem item)
        {
            if (item.Kind != NarrativeItemKind.Exposition)
            {
                throw new ArgumentException();
            }
            return string.Format("<p>{0}</p>", item.SnippetText);
        }
    }
```

Finally, we can hook up the command, put everything together, and then publish this coding task!

```c#
    PublishCommand = new RelayCommand(
                () =>
                {
                    var blogConnector = new BlogConnector(new BlogSite());
                    var blogpost = new BlogPost()
                    {
                        Title = "Auto-blogging - Publishing a coding task to wordpress.",
                        DateTime = DateTime.Now,
                        Entries = new StoryHtml().FormatItems( Items, "csharp" )
                    };
                    blogConnector.NewPost(blogpost, false);
                },
                () => { return true; });
```

## Next steps...


Coming up, hoping to expand this in several ways, and answer many research questions I have!

First a shout out to a [previous post](https://www.devx.com/VS_2010/Article/44073) that has helped point out some of the basic technology approaches for doing this.

  * working on algorithms that chunk up the code snippets more intelligently,
  
  * auto-generating sections based on coding activity and breaks,
  
  * auto-generating exposition based on activities and using as a place for adding interesting facts about the code snippet or task (copied X code from [this blog post](https://blog.ninlabs.com/2011/01/tech-preview-code-provenance-for-visual-studio/)), or a troublesome exception that was happening,
  
  * improving code narrative edit UI, and
  
  * inserting images in Visual Studio (doing that manually now).
  
  * Automatically extract a compilable and executable snapshot of the code needed for the task which can be included as a download.