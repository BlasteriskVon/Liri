Thank you for looking at my application. 

The issue my application is addressing is the inconvinience a user may experience in attempting to search for specific information on a musical artist, song or film.

My app addresses these issues via accessing APIs of Spotify, OMDB and Bands in Town. With these resources, the app can take input and return information regarding a specific song, film or information on the next time (and area) a band will be performing.

The app is run via a terminal, specifically by inputing "node liri.js x y." "x" and "y" are placeholders for the commands and search queries. "x" would be either spotify-this-song, concert-this, movie-this, or do-what-it-says. And "y" would be the corresponding search query. Regarding the commands, they would respectively:
* Search for that song among the Spotify API, then return information on that song.
* Search the Bands in Town API for information on the next event the band will be performing in as well as the location.
* Search the OMDB API for information of the corresponding movie and returning with said information.
* Reads through the random.txt file which should contain a command and a search query. It then runs that command with that query.

The technologies involved in this application were the packages of dotenv, moment, node-spotify-api, axios and fs. My role was utilizing these packages to build the logic of the overall application.

![Screenshot for App](/assets/screenshot.png)

https://github.com/BlasteriskVon/Liri - automagic!
[Liri](https://github.com/BlasteriskVon/Liri)