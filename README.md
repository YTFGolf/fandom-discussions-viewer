# fandom-discussions-viewer

This project is an attempt to implement [Fandom](<https://en.wikipedia.org/wiki/Fandom_(website)>)'s Discussions API in an open-source project.

For security reasons (specifically reasons enforced by the browser) this uses a proxy server: you send an API request to this proxy server; the proxy forwards it to Fandom; the proxy forwards Fandom's response to you.

# Installation

This project requires [Node.js](https://nodejs.org). It uses [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
