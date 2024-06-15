This file is a placeholder I'm using for the main note hub (I really hope this sentence ages well).

- [Overview](#overview)
  - [General structure](#general-structure)
- [Login](#login)
- [Sending requests](#sending-requests)
  - [Basic API](#basic-api)
  - [POST](#post)
- [Using Fandom's API](#using-fandoms-api)
  - [Finding data](#finding-data)
    - [Specialised](#specialised)
  - [Data models](#data-models)
    - [Ignore this bit](#ignore-this-bit)
  - [Call arguments](#call-arguments)
- [Frontend design](#frontend-design)
- [Routes](#routes)
  - [Client routes](#client-routes)
  - [Server routes](#server-routes)
- [Completing certain tasks](#completing-certain-tasks)
- [Testing](#testing)

## Overview

This project aims to implement most of the features of Fandom's Discussions client (including Message Walls and comments), but gives you more control over what you can do with it. I am not attempting to recreate Fandom's Discussions: I will give an overview of things you can do with this that you can't do with Discussions, but any descriptions will be necessarily technical.

### General structure

The project uses Svelte's ability to write the client and server in the same project so you only need one command to run the frontend and the backend.

When the user sends a request on the client, this is sent to the server. This server acts as a proxy server: it reads the user's request, then transforms that into another request sent directly to Fandom. The proxy server reads Fandom's response and returns the data to the client. The proxy server is necessary because of the same-origin policy: the browser would reject a request directly returned from Fandom.

As long as the your localhost is secure this will probably be fine from a security point of view.

## Login

When the user logs in on the normal website, Fandom sends a cookie that the user's browser automatically sends upon every future request. The proxy server uses the same endpoint to log in, then from the returned `Set-Cookie` header it strips Fandom's `Domain` element and returns the new response to the user. The user can then send a request to the proxy server—this request will automatically contain the cookie; the server forwards the request (including the cookie) to Fandom, and returns the response data.

## Sending requests

### Basic API

Requests sent to `/api` generally have the options for `wiki`, `params`, `data` (POST requests only) and `options`.

`wiki` is an object that corresponds to a wiki, such as

```json
{
	"name": "battle-cats",
	"lang": "en"
}
```

This corresponds to `https://battle-cats.fandom.com`. The remaining part of the entrypoint is `options.script` (if this is omitted it is set to `'wikia.php'`), which would extend this URL entrypoint to `https://battle-cats.fandom.com/wikia.php`.

Parameters are constructed like normal URL search parameters (i.e. with `URLSearchParams`). The website will send a request with `fdvEntrypoint` set to `https://battle-cats.fandom.com/wikia.php`. All other parameters given in `params` are as normal.

The server will receive a request like `http://localhost:5173/api?fdvEntrypoint=https://battle-cats.fandom.com/wikia.php&controller=DiscussionThread&method=getThreads&hideDeleted=false`. It will then remove the `fdvEntrypoint` parameter and use that for the next request to fandom directly: `https://battle-cats.fandom.com/wikia.php?controller=DiscussionThread&method=getThreads&hideDeleted=false`. This request contains all the same original headers that the client sent (including `Cookie`).

### POST

POST works the same except it also has the `data` attribute. POSTing also has its own `options` value: `options.contentType`. Certain operations, such as `ArticleComments.postNewCommentThread`, require the `Content-Type` to be `application/x-www-form-urlencoded`, so in these cases the data must be encoded using `URLSearchParams` rather than `JSON.stringify`. If this is not given then the content type is assumed to be JSON.

## Using Fandom's API

This is incomplete

notes are at [API stuff](https://wwr-test.fandom.com/wiki/API_stuff)

Also talk about obtaining data if you have other data e.g. finding out whose message wall a post was on.

### Finding data

- Finding `siteId`: <https://battle-cats.fandom.com/wikia.php?controller=FeedsAndPosts&method=getWikiVariables>`.wikiId`
- Finding message wall post
  - I don't actually know how to do this. However you can do this if you found this message through:
    1. scrolling down a user's Message Wall (then you have `wallOwnerId`)
    2. scrolling down a user's Social Activity/<https://battle-cats.fandom.com/wikia.php?controller=DiscussionPost&method=getPosts&containerType=WALL> (then see how [Discussions Restore All](https://dev.fandom.com/wiki/MediaWiki:Discussions_Restore_All.js) does it)
  - These should be the only way you found a message
- Finding forum ids: <https://wwr-test.fandom.com/wikia.php?controller=DiscussionForum&method=getForums>`._embedded["doc:forum"][i].id` where `i` is a number
- Finding comment/page
  - really easy, you don't even need the correct page name or namespace. You just need **_a_** page on the wiki, and that page's namespace, and the `commentId`. Appears that the page needs actual comments though.
  - will return `res` something where `res.thread.containerId` is `stablePageId`.
  - `stablePageId` -> page name
    - <https://battle-cats.fandom.com/es/wikia.php?controller=FeedsAndPosts&method=getArticleNamesAndUsernames&stablePageIds=210,216&userIds=27706221,37518302>`.articleNames[stablePageId].title`.
      - need <https://battle-cats.fandom.com/es/api.php?action=query&meta=siteinfo&siprop=namespaces&format=json> to determine namespace
    - <https://battle-cats.fandom.com/es/wikia.php?controller=ArticleComments&method=getArticleTitle&stablePageId=210>`.title` (doesn't include namespace so not recommended)
  - page name -> `stablePageId`
    - Page must have comments on it, otherwise it will not have a `stablePageId`
    - <https://battle-cats.fandom.com/wikia.php?controller=ArticleComments&method=getComments&title=Space+is+the+Place+%28Insane%29&namespace=0&hideDeleted=false>`.threads[0].containerId` with proper title and namespace
- `userId`/username
  - From `userId`:
    - A lot of the time you don't need to do this as it's given
    - <https://battle-cats.fandom.com/es/wikia.php?controller=UserApi&method=getDetails&ids=27706221,37518302>
    - <https://battle-cats.fandom.com/es/wikia.php?controller=FeedsAndPosts&method=getArticleNamesAndUsernames&stablePageIds=210,216&userIds=27706221,37518302>
  - From username
    - Exact: <https://wwr-test.fandom.com/api.php?action=query&format=json&list=users&ususers=TheWWRNerdGuy|Brute_Bendy>, <https://community.fandom.com/wikia.php?controller=UserApi&method=getDetails&ids=KockaAdmiralac,27345308,Brute%20Bendy>
    - Inexact: <https://battle-cats.fandom.com/wikia.php?controller=UserApi&method=getUsersByName&query=AnonymousCrouton>

#### Specialised

- First post on wiki: https://community.fandom.com/f/p/4400000000003133958/r/4400000000010157535 (should add `viewableOnly=false` imo)
- User's first post: https://battle-cats.fandom.com/wiki/User:TheWWRNerdGuy/Messing_around_with_Discussions_API#First_post_on_wiki
- First reply to post: https://community.fandom.com/f/p/4400000000003569082/r/4400000000014032699

### Data models

#### Ignore this bit

// Thread creation
// body isn't needed technically, need to investigate further
// body is alias for rawContent
// jsonModel isn't needed either
// jsonModel > body
// figure out how contentimages work, probably similar to attachments or directly in there
// if jsonModel is not proper json just fails lmao
// reply history relies on jsonModel
// special:userprofileactivity relies on body/rawContent
// jsonModel length must be between 0 and 65520
// anything that can be null can also be undefined
// action=query format=json meta=userinfo uiprop=groups|rights
// something like global values e.g. username so I can set the user agent (client)
`*<code>jsonModel</code>: see [[w:c:caburum:Nirvana#JSON post model]]. I can probably try to understand this format from GET requests so not too bothered. Optional for whatever reason, even if neither <code>rawContent</code> nor <code>body</code> are supplied (according to [[Special:SocialActivity]] it gets content suppressed if none of the 3 are present).`
`*<code>rawContent</code>/<code>body</code>. If there is no <code>jsonModel</code> then the post becomes <code>rawContent</code> + first image in <code>contentImages</code> if it exists. If a request contains both <code>rawContent</code> and <code>body</code>, then whichever one comes later takes priority.`
`Fandom's message walls unironically try to load the entire thread into memory.`

- Rickping

  ```ts
  marks: [
  	{ type: 'link', attrs: { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
  	{ type: 'mention', attrs: { userId: '27706221' } },
  ],
  ```

If want to find a comment, you need:

- a page with a comment <https://wwr-test.fandom.com/wiki/CORS?commentId=4400000000000037058>

I tried to use this link and it failed. Then I put a comment on the CORS page. Then this worked. Then suddenly stablePageId 2 corresponded to CORS.

### Call arguments

I've tried to document these inline as much as possible but there are just too many and these don't all get their nice abstractions in [string-types](../src/lib/controllers/types/string-types.ts).

<!-- prettier-ignore -->
- `viewableOnly`: basically `hideDeleted` but Fandom doesn't know how to name variables and they're stuck with it.
- `page`: also takes `pivot` into account.
- `includeCounters`: if false, every request's `postCount` will be 0.
- `sortDirection`
  - On `getThreads`
    - `descending` is standard method. If `sortKey` is `creation_date` then sorts by new. If `trending` then sorts by hot
    - `ascending` goes from the wiki's first post. If `sortKey` is `trending` then gives an error.
  - On `getThread`
    - `descending` is "view older replies". E.g. on [4400000000000090053](https://wwr-test.fandom.com/f/p/4400000000000037009/r/4400000000000090053) the post below that box is [4400000000000090044](https://wwr-test.fandom.com/f/p/4400000000000037009/r/4400000000000090044). Therefore [getThread](https://wwr-test.fandom.com/wikia.php?controller=DiscussionThread&method=getThread&threadId=4400000000000037009&sortDirection=descending&pivot=4400000000000090044&responseGroup=full) with `4400000000000090044` as the pivot will have the first element of `_embedded["doc:posts"]` be `4400000000000090043`.
    - `ascending` is "view newer replies". The same [getThread](https://wwr-test.fandom.com/wikia.php?controller=DiscussionThread&method=getThread&threadId=4400000000000037009&sortDirection=descending&pivot=4400000000000090053&responseGroup=full) with `4400000000000090053` will have `4400000000000090054` be the ***last*** element of `doc:posts`.
- `articleIds`: list of page ids.
- `stablePageId`: appears to actualy be different from `articleIds`. Is set after a comment has been made on the page.
- `title`/`namespace`: they have to be correct internally (i.e. the page with that title in that namespace must exist and have comments), but for requests like `getThread` there is no requirement that they actually correspond to the page where the `threadId` is from. On stuff like `postNewCommentReply` and `editComment` even if you provide the wrong page `Special:SocialActivity` and `Special:UserProfileActivity` will display the right page.

## Frontend design

I just put bootstrap in because I'm lazy. If you know how to actually design websites pls contribute.

## Routes

### Client routes

I plan to make:

- `/f`: same thing as Fandom's discussions (`/f/p/{postId}/r/{replyId}`)
- `/mw`: message walls. Format will be `/mw/{userId}/p/{postId}/r/{replyId}`
- `/c`: article comments. Format will be `/c/{stablePageId}/p/{commentId}/r/{replyId}`
  - Note: I may make it not use `stablePageId` since that way you can't view every page
  - Saying that you probably should be able to just use the Fandom website to post a comment on said page
  - OR I could make it `/c/0/{{FULLPAGENAME}}`

### Server routes

Current:

- `/api`: general `(wikia|api).php` queries
- `/api/login`: login

Planned:

- `/api/services`: for services.fandom e.g. `/api/services/notifications`
- `/api/upload`: just in case uploading form data requires a different route than the JSON-only `/api`

## Completing certain tasks

This section will detail things you can do with this but not Fandom Discussions (hooray). It will also talk about things like everything I've so far done with just scripts.

- Poll with text
- More control over marks
  - Fake pings
  - Real pings with different text
  - Pinging dead users (requires knowing their id)
  - Astley pings
  - Formatting in code blocks (`<strong>` doesn't work though)
- Pings in message walls (don't notify though, users don't get notified even if you use the attachments)
- Read and reply to [Hello Internet Funni People](https://battle-cats.fandom.com/wiki/Message_Wall:LiterallyJustN?threadId=4400000000000763415) without using 10 TB of RAM

## Testing

Currently none, there really should be though lol

Plan is an entire 3 sentences:

make a new fandom account

use dotenv or something

just test raw requests
