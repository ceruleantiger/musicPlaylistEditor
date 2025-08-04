# Music Playlist Editor
A music playlist editor, a client-server web app, built with Express.js and the iTunes Search API.
Users can search songs by keyword, view results, add them to a custom playlist, and remove them.
The playlist is stored locally in the browser using 'localStorage', so it persists across sessions. 
The server handles search queries and has no awareness of what playlists users are creating and remembering locally.

## Feature
- Search music using the iTunes API
- View song results with title, artist, album, and artwork
- Add and remove songs from the playlist
- Dynamic UI updates with client-side JavaScript
- Client-side persistence using `localStorage`:
  - Playlist is remembered **across browser sessions**
  - [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  - Works even if the page is reloaded or the browser is closed and reopened

## Run
npm install express

npm install

node server.js

http://localhost:3000/mytunes.html

