This file is a placeholder I'm using for the main note hub (I really hope this sentence ages well).

- [Overview](#overview)
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

This project aims to implement most of the features of Fandom's Discussions section, but gives you more control over what you can do with it. I am not attempting to recreate Fandom's Discussions: I will give an overview of things you can do with this that you can't do with Discussions, but any descriptions will be necessarily technical.

For security reasons (specifically reasons enforced by the browser) this uses a proxy server: you send an API request to this proxy server; the proxy forwards it to Fandom; the proxy forwards Fandom's response to you.

# Login

# Using Fandom's API

notes are at [API stuff](https://wwr-test.fandom.com/wiki/API_stuff)

## Data models

# Routes

## Client routes

## Server routes

Current:

- `/api`: general `(wikia|api).php` queries
- `/api/login`: login

Planned:

- `/api/services`: for services.fandom e.g. `/api/services/notifications`

# Completing certain tasks

This section will detail things you can do with this but not Fandom Discussions (hooray)

# Testing

Currently none

# Wiki Pages

- API stuff: [Using Fandom's API](#using-fandoms-api)
- CORS: [Overview](#overview)
- Cookie Forgery: [Login](#login)
- FDV API structure: [Overview](#overview)
- Posting: [Using Fandom's API](#using-fandoms-api)
- Sending Requests: [Using Fandom's API](#using-fandoms-api)
- Testing: [Testing](#testing)
