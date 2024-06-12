This file is a placeholder I'm using for the main note hub (I really hope this sentence ages well).

- [Overview](#overview)
  - [General structure](#general-structure)
- [Login](#login)
- [Using Fandom's API](#using-fandoms-api)
  - [Return codes](#return-codes)
  - [Data models](#data-models)
    - [Thread creation](#thread-creation)
  - [Call arguments](#call-arguments)
- [Frontend design](#frontend-design)
- [Routes](#routes)
  - [Client routes](#client-routes)
  - [Server routes](#server-routes)
- [Completing certain tasks](#completing-certain-tasks)
- [Testing](#testing)
- [Wiki Pages](#wiki-pages)

## Overview

This project aims to implement most of the features of Fandom's Discussions client (including Message Walls and comments), but gives you more control over what you can do with it. I am not attempting to recreate Fandom's Discussions: I will give an overview of things you can do with this that you can't do with Discussions, but any descriptions will be necessarily technical.

### General structure

The project uses Svelte's ability to write the client and server in the same project so you only need one command to run the frontend and the backend.

When the user sends a request on the client, this is sent to the server. This server acts as a proxy server: it reads the user's request, then transforms that into another request sent directly to Fandom. The proxy server reads Fandom's response and returns the data to the client. The proxy server is necessary because of the same-origin policy: the browser would reject a request directly returned from Fandom.

## Login

When the user logs in on the normal website, Fandom sends a cookie that the user's browser automatically sends upon every future request. The proxy server uses the same endpoint to log in, then from the returned `Set-Cookie` header it strips Fandom's `Domain` element and returns the new response to the user. The user can then send a request to the proxy server—this request will automatically contain the cookie; the server forwards the request (including the cookie) to Fandom, and returns the response data.

## Using Fandom's API

This is incomplete

notes are at [API stuff](https://wwr-test.fandom.com/wiki/API_stuff)

Also talk about obtaining data if you have other data e.g. finding out whose message wall a post was on.

### Return codes

For lock it appears that 204 = success and 202 = authorised but failed (but on the website 202 is success). For unlock appears that 204 is just always returned.

### Data models

#### Thread creation

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
- `articleIds`: list of `stablePageId`s.

## Frontend design

I just put bootstrap in because I'm lazy. If you know how to actually design websites pls contribute.

## Routes

### Client routes

I plan to make:

- `/f`: same thing as Fandom's discussions (`/f/p/{postId}/r/{replyId}`)
- `/mw`: message walls. Format will be `/mw/{userId}/p/{postId}/r/{replyId}`
- `/c`: article comments. Format will be `/c/{stablePageId}/p/{commentId}/r/{replyId}`

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

Plan is on the wiki page for testing. An entire 3 sentences

## Wiki Pages

- API stuff: [Using Fandom's API](#using-fandoms-api)
- CORS: [Overview](#overview)
- Cookie Forgery: [Login](#login)
- FDV API structure: [Overview](#overview)
- Posting: [Using Fandom's API](#using-fandoms-api)
- Sending Requests: [Using Fandom's API](#using-fandoms-api)
- Testing: [Testing](#testing)
