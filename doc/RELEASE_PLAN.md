## General

- Controllers
  - Important
    - [ ] Fandom\DiscussionModeration\DiscussionImages
    - [ ] Fandom\FeedsAndPosts\Discussion\DiscussionContribution
    - [ ] Fandom\FeedsAndPosts\Discussion\DiscussionForum
  - Eh
    - [ ] Fandom\DiscussionModeration\DiscussionModeration
    - [x] Fandom\FeedsAndPosts\Discussion\DiscussionPoll
    - [ ] Fandom\FeedsAndPosts\Discussion\DiscussionPermalink
    - [x] Fandom\FeedsAndPosts\Discussion\DiscussionVote
  - Probably not
    - [ ] Fandom\DiscussionModeration\DiscussionLeaderboard (probably can be shelved for now)
    - [ ] Fandom\UserProfileActivity\UserProfileActivity (looks interesting)
    - [ ] Fandom\Activity\ActivityApi (probably unimportant)
- Implement global stores
  - Requests. 3 options: normal (if fail then let fail), flood (retry all that failed), wait (if fail then try again until not fail).
- Proper testing
  - Mainly to avoid regression; vitest doesn't appear to like using the server's API, so either I reimplement in vitest or I do testing on the live server
  - `npm run dev -- --port 7357`
  - Can make test tab in new container so always works.
  - Is testing necessary? Since is just using API.
- Add stuff to editor
  - Attempt erase formatting again (can probably do some command chaining and enumerating for different kinds of nodes, or do the textbetween thing and replace `\n` with `</p><br><p>` or split by `\n`)
- `/f`
  - Main post editor
    - Can edit poll how want and then at the end the user can submit it (like `ForumCreatePost` container)
- Add `/f/u/...`
- Doc
  - Split up into own files
  - notes can go in temp.md
- Things that need to be accomplished
  - [x] Poll with text
  - [x] Fake pings (Sort of but editor does not support these yet)
  - [x] Real pings with different text
  - [x] Pinging dead users
  - [x] Astley pings (eh sort of)
  - [ ] MW pings
  - [ ] HIFP
- Improve editor for images/opengraphs

## Current

- Improve poll editor (at least add images/options)
- Improve title editor
- Parser for wiki link
- Counter for amount of replies to post
- `/f`
