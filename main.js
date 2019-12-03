'use strict';

const apiKey = 'yMEXCJKs2Lbu90tjAm3QRJtKvVXTLahdqch6ihp5';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

$(document).ready(() => {
    console.log('App has loaded...Please submit something!');
    watchForm();
});

//convert objects 
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

//GET request
function getNationalParks(query, maxResults=10) {
    maxResults -= 1;

    const params = {
        api_key: apiKey,
        limit: maxResults,
        stateCode: query
    };

    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    //removes previous search results 
    $('#results-list').empty();
    //iterate through items array
    let html = '';
    for(let i = 0; i < responseJson.data.length; i+= 1) {
        const park = responseJson.data[i];
        const name = park.name;
        const image = park.images;
        const description = park.description;
        const url = park.url;

        html += `
        <li><h3>${name}</h3>
          <img href="${images}">
          <p>Description: ${description}</p>
          <p>URL: <a href="${url}">${url}</a></p>
        </li>`;
    }

    //displays the result section 
    $('#results-list').html(html);
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('.search-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('.national-input').find(this).val();
        const maxResults = $('.max-results').find(this).val();
        getNationalParks(searchTerm, maxResults);
    });
    
}
