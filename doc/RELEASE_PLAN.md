- Finish all controllers
  - Essential
    - [x] Fandom\FeedsAndPosts\Discussion\DiscussionPost
    - [x] Fandom\FeedsAndPosts\Discussion\DiscussionThread
    - [x] Fandom\ArticleComments\Api\ArticleComments
    - [x] Fandom\MessageWall\MessageWall
    - [x] Fandom\FeedsAndPosts\FeedsAndPosts
    - [x] Fandom\Includes\Api\UserApi
  - Important
    - [ ] Fandom\DiscussionModeration\DiscussionImages
    - [ ] Fandom\FeedsAndPosts\Discussion\DiscussionContribution
    - [ ] Fandom\FeedsAndPosts\Discussion\DiscussionForum
  - Eh
    - [ ] Fandom\DiscussionModeration\DiscussionModeration
    - [ ] Fandom\FeedsAndPosts\Discussion\DiscussionPoll
    - [ ] Fandom\FeedsAndPosts\Discussion\DiscussionPermalink
    - [ ] Fandom\FeedsAndPosts\Discussion\DiscussionVote
  - Probably not
    - [ ] Fandom\DiscussionModeration\DiscussionLeaderboard (probably can be shelved for now)
    - [ ] Fandom\UserProfileActivity\UserProfileActivity (looks interesting)
    - [ ] Fandom\Activity\ActivityApi (probably unimportant)
- Implement global stores
  - Requests. 3 options: normal (if fail then let fail), flood (retry all that failed), wait (if fail then try again until not fail)
  - user details e.g. name, id, rights
  - persistent config e.g. if I set hideDeleted false then that should remain until I clear local storage/log out
- Login/logout on navbar
- Proper testing
  - Mainly to avoid regression; vitest doesn't appear to like using the server's API, so either I reimplement in vitest or I do testing on the live server
  - `npm run dev -- --port 7357`
  - Can make test tab in new container so always works.