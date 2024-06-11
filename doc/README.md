This file is a placeholder I'm using for the main note hub (I really hope this sentence ages well).

- [Overview](#overview)
- [Login](#login)
- [Using Fandom's API](#using-fandoms-api)
  - [Data models](#data-models)
- [Routes](#routes)
  - [Client routes](#client-routes)
  - [Server routes](#server-routes)
- [Testing](#testing)
- [Wiki Pages](#wiki-pages)

# Overview

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
