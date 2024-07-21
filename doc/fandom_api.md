This isn't properly completed, as there are a bunch of API endpoints that haven't been implemented fully yet. Some notes exist at [API stuff](https://wwr-test.fandom.com/wiki/API_stuff) for unimplemented features.

The endpoints have been implemented in [controllers](../src/lib/controllers/) and large server responses can be found in [responses](../src/lib/responses/).

- [Overview](#overview)
- [Finding data](#finding-data)
  - [Specialised](#specialised)
- [Call arguments](#call-arguments)
- [External links](#external-links)
- [Ignore this bit](#ignore-this-bit)
  - [Poll](#poll)

## Overview

There are 2 main API routes you can use on each wiki. `/wikia.php` leads to the [Nirvana](https://caburum.fandom.com/wiki/Nirvana) API framework. `/api.php` leads to the main MediaWiki API, as well as having some of Fandom's custom extensions. `/api/v1` also exists, but any calls you can do with that you can do with `/wikia.php` (see [/api/v1](https://dev.fandom.com/wiki/Nirvana#/api/v1)).

`services.fandom.com` is another essential component: this contains endpoints for things like notifications and authentication.

## Finding data

Each API call may rely on specific data to make the call work, or you may be able to use the API to find specific data.

- Finding `siteId`: <https://battle-cats.fandom.com/wikia.php?controller=FeedsAndPosts&method=getWikiVariables>`.wikiId`. Most API responses also contain the site ID.
- Finding message wall post from ID
  - Don't actually know how to do this. However you can do this if you found this message through:
    1. scrolling down a user's Message Wall (then you have `wallOwnerId`)
    2. scrolling down a user's Social Activity/<https://battle-cats.fandom.com/wikia.php?controller=DiscussionPost&method=getPosts&containerType=WALL> (then see how [Discussions Restore All](https://dev.fandom.com/wiki/MediaWiki:Discussions_Restore_All.js) does it)
  - These should be the only way you found a message in the first place.
- Finding forum ids: <https://wwr-test.fandom.com/wikia.php?controller=DiscussionForum&method=getForums>`._embedded["doc:forum"][i].id` where `i` is a number.
- Finding comment/page
  - You don't even need the correct page name or namespace. You just need **_a_** page on the wiki (it must have comments though), that page's namespace, and the `commentId`. Making a call to the ArticleComments controller will return a response `res` where `res.thread.containerId` is `stablePageId`.
  - `stablePageId` -> page name
    - <https://battle-cats.fandom.com/es/wikia.php?controller=FeedsAndPosts&method=getArticleNamesAndUsernames&stablePageIds=210,216&userIds=27706221,37518302>`.articleNames[stablePageId].title`.
      - need <https://battle-cats.fandom.com/es/api.php?action=query&meta=siteinfo&siprop=namespaces&format=json> to determine namespace.
    - <https://battle-cats.fandom.com/es/wikia.php?controller=ArticleComments&method=getArticleTitle&stablePageId=210>`.title` (doesn't include namespace so not recommended).
  - page name -> `stablePageId`
    - Page must have comments on it, otherwise it will not have a `stablePageId`.
    - <https://battle-cats.fandom.com/wikia.php?controller=ArticleComments&method=getComments&title=Space+is+the+Place+%28Insane%29&namespace=0&hideDeleted=false>`.threads[0].containerId` with proper title and namespace
- `userId`/username
  - In summary, use the UserApi controller, since it accepts both user IDs and usernames (albeit usernames must begin with capital letters).
  - From `userId`:
    - A lot of the time you don't need to do this as it's given
    - <https://battle-cats.fandom.com/es/wikia.php?controller=UserApi&method=getDetails&ids=27706221,37518302>
    - <https://battle-cats.fandom.com/es/wikia.php?controller=FeedsAndPosts&method=getArticleNamesAndUsernames&stablePageIds=210,216&userIds=27706221,37518302>
  - From username
    - Exact: <https://battle-cats.fandom.com/api.php?action=query&format=json&list=users&ususers=TheWWRNerdGuy|Brute_Bendy>, <https://battle-cats.fandom.com/wikia.php?controller=UserApi&method=getDetails&ids=KockaAdmiralac,27345308,Brute%20Bendy>
    - Inexact: <https://battle-cats.fandom.com/wikia.php?controller=UserApi&method=getUsersByName&query=AnonymousCrouton>
- User avatar
  - This one's actually a little trickier. `UserApi.getDetails` will work for most users, but won't for those with old profile pictures. The correct avatar is always available when using the API to check people's posts.
  - Your avatar only: <https://battle-cats.fandom.com/api.php?action=query&format=json&meta=userinfo&uiprop=options>
  - Other people: <https://battle-cats.fandom.com/wikia.php?controller=UserApi&method=getUsersByName&query=AnonymousCrouton>
- Votes on a poll
  - e.g. for <https://battle-cats.fandom.com/f/p/4400000000000891975>
  - Search for `\"answers\"` in the html response from the poll. The JS object contained in there will have the amount of votes. (i.e. find operation in <view-source:https://battle-cats.fandom.com/f/p/4400000000000891975>)
  - Can also do them individually
    - <https://battle-cats.fandom.com/wikia.php?controller=DiscussionThread&method=getThread&format=json&threadId=4400000000000891975>
    - <https://battle-cats.fandom.com/wikia.php?controller=DiscussionPoll&method=getVoters&pollId=4627184&answerId=17881788>

### Specialised

- First post on wiki: <https://community.fandom.com/f/p/4400000000003133958/r/4400000000010157535> (should add `viewableOnly=false` imo)
- User's first post: <https://battle-cats.fandom.com/wiki/User:TheWWRNerdGuy/Messing_around_with_Discussions_API#First_post_on_wiki>
- First reply to post: <https://community.fandom.com/f/p/4400000000003569082/r/4400000000014032699>

## Call arguments

Most of these have been inline as much as possible but there are just too many and these don't all get their nice abstractions in [string-types](../src/lib/controllers/types/string-types.ts).

- `viewableOnly`: basically `hideDeleted` but Fandom doesn't know how to name variables and they're stuck with it.
- `page`: also takes `pivot` into account.
- `includeCounters`: if false, every request's `postCount` will be 0.
- `sortDirection`
  - On `getThreads`
    - `descending` is standard method. If `sortKey` is `creation_date` then sorts by new. If `trending` then sorts by hot
    - `ascending` goes from the wiki's first post. If `sortKey` is `trending` then gives an error.
  - On `getThread`
    - `descending` is "view older replies". E.g. on [4400000000000090053](https://wwr-test.fandom.com/f/p/4400000000000037009/r/4400000000000090053) the post below that box is [4400000000000090044](https://wwr-test.fandom.com/f/p/4400000000000037009/r/4400000000000090044). Therefore [getThread](https://wwr-test.fandom.com/wikia.php?controller=DiscussionThread&method=getThread&threadId=4400000000000037009&sortDirection=descending&pivot=4400000000000090044&responseGroup=full) with `4400000000000090044` as the pivot will have the first element of `_embedded["doc:posts"]` be `4400000000000090043`. (Think descending post ID)
    - `ascending` is "view newer replies". The same [getThread](https://wwr-test.fandom.com/wikia.php?controller=DiscussionThread&method=getThread&threadId=4400000000000037009&sortDirection=descending&pivot=4400000000000090053&responseGroup=full) with `4400000000000090053` will have `4400000000000090054` be the **_last_** element of `doc:posts`.
- `articleIds`: list of page ids.
- `stablePageId`: entirely different from `articleIds`. Is set after a comment has been made on the page.
- ArticleComments's `title`/`namespace`: they have to be correct internally (i.e. the page with that title in that namespace must exist and have comments), but for requests like `getThread` there is no requirement that they actually correspond to the page where the `threadId` is from. On stuff like `postNewCommentReply` and `editComment` even if you provide the wrong page `Special:SocialActivity` and `Special:UserProfileActivity` will display the right page.
- `pivot`: If you set pivot then it only shows posts that are `< pivot` (or `> pivot` when `sortDirection=ascending`).
- `jsonModel`/`rawContent`/`body`
  - These are not required in `DiscussionThread` calls. They cannot be blank in posts that require content (e.g. anything to do with `DiscussionPost`); at least one of them needs to have content.
  - `rawContent` and `body` are aliases for each other; `body` is renamed to `rawContent` when submitting to the server. Whichever one comes later in the request has priority, as with any other JS object.
  - If `jsonModel` is given then this is used in the display. Otherwise, the website displays `rawContent`, as well as `attachments.contentImages[0]` if it exists.
  - If editing a post, then you can't make `jsonModel` null, but you can if sending a reply (as long as `rawContent` contains content).
  - If `jsonModel` is invalid JSON or doesn't follow the schema, wacky stuff happens with the website editor.
  - Reply history relies on the post's `jsonModel`. Special:UserProfileActivity relies on `rawContent`.
  - `jsonModel`'s length must be between 0 and 65520.

## External links

_See <https://battle-cats.fandom.com/wiki/User:TheWWRNerdGuy/Messing_around_with_Discussions_API#Useful_links>_

## Ignore this bit

// something like global values e.g. username so I can set the user agent (client)
`Fandom's message walls unironically try to load the entire thread into memory.`

- Rickping. Note: this doesn't work on fdv because fandom's using some wacky rendering engine that allows them to nest `<a>` tags.
- You can make it bold by just repeatedly applying strong tags.

  ```ts
  marks: [
  	{ type: 'link', attrs: { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
  	{ type: 'mention', attrs: { userId: '27706221' } },
  ],
  ```

If want to find a comment, you need:

- a page with a comment <https://wwr-test.fandom.com/wiki/CORS?commentId=4400000000000037058>

I tried to use this link and it failed. Then I put a comment on the CORS page. Then this worked. Then suddenly stablePageId 2 corresponded to CORS.

### Poll

If you don't set id then you create a new poll. If you set id then you get the existing poll with that id.

If you redefine the poll then the existing poll gets deleted, irregardless of where it has been used. (e.g. see <https://the-battle-doges.fandom.com/f/p/4400000000000033827> and then see <https://battle-cats.fandom.com/f/p/4400000000000892782>). The first one had the poll removed and the second one was left alone, but because the poll was removed from the first one the second one's poll got deleted.
