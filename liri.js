require("dotenv").config();

const moment = require('moment')

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require("axios");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);

function movieThis(text){
    /***************
     * I want:
     * Movie Title is response.data.Title
     * Movie Year is response.data.Year
     * IMDB Rating is response.data.Ratings[0].Value
     * Rotten Tomatoes Rating is response.data.Ratings[1].Value
     * Country where movie was produced is response.data.Country
     * Language of movie is response.data.Language
     * Plot of movie is response.data.Plot
     * Actors in the movie is response.data.Actors
     */
    axios.get("http://www.omdbapi.com/?t=" + text + "&apikey=trilogy")
    .then(function(response) {
            let movie_title = response.data.Title;
            let movie_year = response.data.Year;
            let imdb_rating = response.data.Ratings[0].Value;
            let rt_rating = response.data.Ratings[1].Value;
            let movie_country = response.data.Country;
            let movie_language = response.data.Language;
            let movie_plot = response.data.Plot;
            let movie_actors = response.data.Actors;
            console.log("Movie Title: " + movie_title + "\n" +
            "Year the Movie Was Produced: " + movie_year + "\n" +
            "IMDB Rating: " + imdb_rating + "\n" +
            "Rotten Tomatoes Rating: " + rt_rating + "\n" +
            "Country(s) the Movie was Produced: " + movie_country + "\n" +
            "Language(s) of the Movie: " + movie_language + "\n" +
            "Plot of the Movie: " + movie_plot + "\n" +
            "Actors in the Movie: " + movie_actors);
        })
    .catch(function(error) {
        console.log(error);
    });
}

function concertThis(text){
    /*****
     * I want:
     * Name of the venue: response.data[0].venue.name
     * Venue location: response.data[0].venue.city + response.data[0].venue.region + response.data[0].venue.country
     * Date of the event: response.data[0].datetime
     */
    axios.get("https://rest.bandsintown.com/artists/" + text + "/events?app_id=codingbootcamp")
    .then(function(response) {
        if(response.data.length > 0){
            let venue_name = response.data[0].venue.name;
            var venue_location;
            var venue_region;
            if(response.data[0].venue.region === ""){
                venue_region = "";
            } else {
                venue_region = response.data[0].venue.region + ", ";
            }
            venue_location = response.data[0].venue.city + ", " + venue_region + response.data[0].venue.country;
            let venue_date = response.data[0].datetime;
            console.log("Venue Name: " + venue_name + "\n" +
            "Venue location: " + venue_location + "\n" +
            "Date of the event: " + moment(venue_date).format("MM/DD/YYYY"));
        } else {
            console.log("Sorry! No response found!");
        }
        })
    .catch(function(error) {
        console.log(error);
    });
}

function appendLog(text1, text2){
    fs.appendFile("log.txt", text1 + ": " + text2 + ", ", function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Log file updated!");
        }
    })
}

function spotifyThis(text){
let artists_name = "";
let preview_link = "";
    /************************************
     * I want:
     * Artist name(s) data.tracks.items[0].artists[index]
     * The song name is data.tracks.items[0].name
     * Preview Link from Spotify is data.tracks.items[0].preview_url
     * Album the song is from data.tracks.items[0].album.name
     */
    spotify.search({type: "track", query: text, limit: 1}, function(err, data) {
        if(err) {
            return console.log("Error occurred: " + err);
        }
        for(var i = 0;i < data.tracks.items[0].artists.length;i++){
            artists_name += data.tracks.items[0].artists[i].name;
            if(i != (data.tracks.items[0].artists.length - 1)){
                artists_name += ", ";
            }
        } //this sets the artist name string, and even considers cases where there are several artists
        let song_name = data.tracks.items[0].name;

        if(data.tracks.items[0].preview_url != null){
            preview_link = data.tracks.items[0].preview_url;
        } else {
            preview_link = "Sorry! No preview URL available!";
        }//this sets up the preview link and considers cases where it may be null (and there are cases where it is null)

        let album_name = data.tracks.items[0].album.name;

        console.log("Artist(s) name: " + artists_name + "\n"+
        "Song name: " + song_name + "\n" +
        "Preview link: " + preview_link + "\n" +
        "Album name: " + album_name);
    })
}


let command = process.argv[2];
let input = process.argv.slice(3).join(" ");

function runCommand() {
    switch(command){
        case "spotify-this-song":
            if(input === ""){
                input = "The Sign Ace of Base";
            }
            appendLog(command, input);
            spotifyThis(input);
            break;
        
        case "movie-this":
            if(input === ""){
                input = "Mr. Nobody";
            }
            appendLog(command, input);
            movieThis(input);
            break;
    
        case "concert-this":
            appendLog(command, input);
            concertThis(input);
            break;
        
        case "do-what-it-says":
            appendLog(command, " ");
            fs.readFile("random.txt", "utf8", function(error, data) {
                if(error) {
                    return console.log(error);
                }
                var randomText = data.split(",");
                command = randomText[0];
                input = randomText[1];
                runCommand();
            });
            break;
        
        default:
            break;
    }
}

runCommand();
