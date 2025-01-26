---
author: Chris Parnin
category: General
draft: false
image:
  alt: ''
  src: ''
publishDate: '2011-02-20'
snippet: ''
tags:
- research
- crowddoc
title: Measuring API Documentation on the Web
---

Developers search the web for many questions they have about using apis. Developers can also use social media sites such as [codesnipr](https://codesnipr.com), [stackoverflow](https://stackoverflow.com), [refactormycode](https://refactormycode.com/), or blog sites such as this one to provide answers or share knowledge about using apis.  For example, this blog gets many hits each week from people looking on how to do [programmatic search](/blog/2010-11-08-visual-studio-search-results-programmatically) with the automation api in Visual Studio.

In a recent paper accepted for [web2se](https://sites.google.com/site/web2se2011/),  [Christoph Treude](http://ctreude.wordpress.com/) and I wanted to know what potential role social media had in answering these questions.  Especially, when we contrast them with other information provided through official venues such as the official api websites.

To answer our research questions, we performed an preliminary study, where we searched for 173 api methods from [jQuery](https://jquery.com) and manually inspected and analyzed the first page of search results on google (1730 search results in total).  For example, if searching for _"jquery jQuery.post"_, we would see results for the [official api method documentation](https://api.jquery.com/jQuery.post/), a [stackoverflow question](https://stackoverflow.com/questions/2375097/difference-between-jquery-post-and-jquery-get), and a [blog post](https://www.jensbits.com/2009/10/04/jquery-ajax-and-jquery-post-form-submit-examples-with-php/).


| Search Result Type       | Coverage  |   | Mean Rank |
|:-------------------------|----------:|:-:|----------:|
| code snippet             | 8.7%	   |   | 9
| q&a	                     | 9.8%      |   | 9
| forum	                  | 20.2%     |   | 8
| official bug tracker     | 21.4%     |   | 3
| mailing list entry	      | 25.4%	   |   | 7
| official documentation   | 30.1%     |   | 3
| official forum           | 37.0%	   |   | 3
| unofficial documentation | 63.6%     |   | 6
| stackoverflow            | **84.4%**	|   | 6
| blog post	               | **87.9%** |   | 5
| official API	            | 99.4%     |   | 1
|==============================================
|


We characterized these different web resources and then for each category, we counted how often a category appears for a search and measured the mean rank.  We then manually inspected each blog post that appeared in the search results and classified the **type** of blog post and counted the number of **code snippets** and **comments** received.



#### The results of the study show that development blogs:

  * 1.  **cover** 87.9% of the API methods (84% for stackoverflow),


  * 2.  mainly feature **tutorials** and **personal experiences** about using the methods,


  * 3.  effort is **shared** by a large group of developers contributing few blog posts.



A draft version of the paper is available [here](https://chrisparnin.me/pdf/parnin-webapi.pdf).