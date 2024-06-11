This file is a placeholder I'm using for the main note hub (I really hope this sentence ages well).

- [Overview](#overview)
  - [General structure](#general-structure)
- [Login](#login)
- [Using Fandom's API](#using-fandoms-api)
  - [Data models](#data-models)
- [Routes](#routes)
  - [Client routes](#client-routes)
  - [Server routes](#server-routes)
- [Completing certain tasks](#completing-certain-tasks)
- [Testing](#testing)
- [Wiki Pages](#wiki-pages)

# Overview

This project aims to implement most of the features of Fandom's Discussions client (including Message Walls and comments), but gives you more control over what you can do with it. I am not attempting to recreate Fandom's Discussions: I will give an overview of things you can do with this that you can't do with Discussions, but any descriptions will be necessarily technical.

## General structure

The project uses Svelte's ability to write the client and server in the same project so you only need one command to run the frontend and the backend.

When the user sends a request on the client, this is sent to the server. This server acts as a proxy server: it reads the user's request, then transforms that into another request sent directly to Fandom. The proxy server reads Fandom's response and returns the data to the client. The proxy server is necessary because of the same-origin policy: the browser would reject a request directly returned from Fandom.

# Login

When the user logs in on the normal website, Fandom sends a cookie that the user's browser automatically sends upon every future request. The proxy server uses the same endpoint to log in, then from the returned `Set-Cookie` header it strips Fandom's `Domain` element and returns the new response to the user. The user can then send a request to the proxy server—this request will automatically contain the cookie; the server forwards the request (including the cookie) to Fandom, and returns the response data.

# Using Fandom's API

This is incomplete

notes are at [API stuff](https://wwr-test.fandom.com/wiki/API_stuff)

Also talk about obtaining data if you have other data e.g. finding out whose message wall a post was on.

## Data models

# Routes

## Client routes

I plan to make:

- `/f`: same thing as Fandom's discussions
- `/mw`: message walls. Format will be `/mw/{userId}/{postId}/{replyId}`
- `/c`: article comments. Format will be `/c/{stablePageId}/{commentId}/{replyId}`

## Server routes

Current:

- `/api`: general `(wikia|api).php` queries
- `/api/login`: login

Planned:

- `/api/services`: for services.fandom e.g. `/api/services/notifications`

# Completing certain tasks

This section will detail things you can do with this but not Fandom Discussions (hooray). It will also talk about things like everything I've so far done with just scripts.

- Poll with text
- More control over marks
  - Fake pings
  - Real pings with different text
  - Pinging dead users (requires knowing their id)
  - Astley pings
  - Formatting in code blocks (`<strong>` doesn't work though)
- Pings in message walls (don't notify though, users don't get notified even if you use the attachments)

# Testing

Currently none, there really should be though lol

Plan is on the wiki page for testing. An entire 3 sentences

# Wiki Pages

- API stuff: [Using Fandom's API](#using-fandoms-api)
- CORS: [Overview](#overview)
- Cookie Forgery: [Login](#login)
- FDV API structure: [Overview](#overview)
- Posting: [Using Fandom's API](#using-fandoms-api)
- Sending Requests: [Using Fandom's API](#using-fandoms-api)
- Testing: [Testing](#testing)
