// Imports
const axios = require('axios');
const randomMovieNames = require('random-movie-names');

// Constants
const iceBreakerQuestions = [
    "What’s the hardest part about working virtually for you? The easiest?",
    "Be honest, how often do you work from bed?",
    "What’s one thing we could do to improve our virtual meetings?",
    "What’s the last great TV show or movie you wanted?",
    "Best book you’ve ever read?",
    "If you could learn one new professional skill, what would it be?",
    "What’s your favorite sandwich and why?",
    "If aliens landed on earth tomorrow and offered to take you home with them, would you go?",
    "Does your current car have a name? What is it?",
    "What is your most used emoji?",
    "You have to sing karaoke, what song do you pick?",
    "What is one article of clothing that someone could wear that would make you walk out on a date with them?"
];

// Function that will handle the drop sub command
module.exports = async function handleDrop(subCommand){
    let response;
    let result;
    if(subCommand.includes("joke")){
        const options = {
            method: 'GET',
            url: 'https://api.chucknorris.io/jokes/random'
        };
        response = await axios.request(options);
        result = response.data.value || "Sorry no joke at the moment";
    } 
    else if(subCommand.includes("tech") && subCommand.includes("news")){
        const options = {
            method: 'GET',
            url: `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_DATA_API_KEY}&category=technology&country=us`
        };
        response = await axios.request(options);
        result = response.data.results[0].description || "Sorry no tech news at the moment";
    }
    else if(subCommand.includes("news")){
        const options = {
            method: 'GET',
            url: `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_DATA_API_KEY}&country=us`
        };
        response = await axios.request(options);
        result = response.data.results[0].description || "Sorry no news at the moment";
    } 
    else if(subCommand.includes("sprint") && subCommand.includes("name")){
        result = randomMovieNames();   
    }
    else if(subCommand.includes("ice breaker")){
        result = iceBreakerQuestions[Math.floor(Math.random()*iceBreakerQuestions.length)];
        console.log(result);
    }
    else {
        return "You can only drop a joke or news or tech news or a sprint name or a ice breaker question";
    }
    return result;
 };