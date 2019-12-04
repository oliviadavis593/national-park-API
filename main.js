 'use strict';

const apiKey = 'yMEXCJKs2Lbu90tjAm3QRJtKvVXTLahdqch6ihp5';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


//convert objects 
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

//GET request
function getNationalParks(query, maxResults = 10) {
    
    const params = {
        api_key: apiKey,
        limit: maxResults,
        stateCode: query,
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
    $('.results-list').empty();
    //iterate through items array
    let html = '';
    for(let i = 0; i < responseJson.data.length; i+= 1) {
        const park = responseJson.data[i];
        const name = park.name;
        const images = park.images;
        const description = park.description;
        const url = park.url;

        html += `
        <li><h3>${name}</h3>
          <p>Description: ${description}</p>
          <p>URL: <a href="${url}" target="_blank">${url}</a></p>
        </li>`;

    }

    //displays the result section 
    $('.results-list').html(html);
    $('#results').removeClass('hidden');
}




function watchForm() {
    $('.search-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('.national-input').val();
        const maxResults = $('.max-results').val();
        getNationalParks(searchTerm, maxResults);
    });
    
}

watchForm();
