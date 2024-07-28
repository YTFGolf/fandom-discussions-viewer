This file is a placeholder I'm using for the main note hub (I really hope this sentence ages well).

- [Overview](#overview)
  - [General structure](#general-structure)
- [Login](#login)
- [Sending requests](#sending-requests)
  - [Basic API](#basic-api)
  - [POST](#post)
- [Routes](#routes)
  - [Client routes](#client-routes)
  - [Server routes](#server-routes)
- [Completing certain tasks](#completing-certain-tasks)
- [Testing](#testing)

## Overview

This project aims to implement most of the features of Fandom's Discussions client (including Message Walls and comments), but gives you more control over what you can do with it. I am not attempting to recreate Fandom's Discussions: I will give an overview of things you can do with this that you can't do with Discussions, but any descriptions will be necessarily technical.

### General structure

The project uses Svelte/SvelteKit's ability to write the client and server in the same project so you only need one command to run the frontend and the backend.

When the user sends a request on the client, this is sent to the server. This server acts as a proxy server: it reads the user's request, then transforms that into another request sent directly to Fandom. The proxy server reads Fandom's response and returns the data to the client. The proxy server is necessary because of the same-origin policy: the browser would reject a request directly returned from Fandom.

As long as your localhost is secure this will probably be fine from a security point of view.

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

Okay this is more the stuff that should be possible with this but not discussions.

- Poll with text
- Vote for multiple answers in poll, vote for answers more than once
- More control over marks
  - Fake pings
  - Real pings with different text
  - Pinging dead users (requires knowing their id)
  - Astley pings
  - Formatting in code blocks
- Pings in message walls (don't notify though)
- Read and reply to [Hello Internet Funni People](https://battle-cats.fandom.com/wiki/Message_Wall:LiterallyJustN?threadId=4400000000000763415) without using 10 TB of RAM

## Testing

Currently none, there really should be though lol

Plan is an entire 2 sentences:

use dotenv or something

just test raw requests
