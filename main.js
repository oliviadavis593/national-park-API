'use strict';

const apiKey = 'yMEXCJKs2Lbu90tjAm3QRJtKvVXTLahdqch6ihp5';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

$(document).ready(() => {
    console.log('App has loaded...Please submit something!');
    watchForm();
});

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key =>  `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

//GET request
function getNationalParks(query, maxResults=10) {
    const params = {
        key: apiKey,
        limit: maxResults,
        stateCode: query
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url) 
        .then(response => {
            if(response.ok) {
                return response.json
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(responseJson))
        .catch(error => {
            $('#js-error-message').text(`Something went wrong: ${error.message}`);
        });
}

function watchForm() {
    $('.search-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('.national-input').val();
        const maxResults = $('.max-results').val();
        getNationalParks(searchTerm, maxResults);
    });
    
}
