const apiKey = 'AIzaSyAoNhGsb_XBj-MkWBiQ7QN0l75JFzPmYoA';

$(function() {
    $('#search-term').on('submit', function(event) {
        searchVideos($('#query').val());
        event.preventDefault();
    });
});

function searchVideos(query) {
    $.getJSON(`http://www.googleapis.com/youtube/v3/search`, {
        part: 'snippet',
        key: apiKey,
        relevanceLanguage: 'en',
        safeSearch: 'moderate',
        type: 'video',
        maxResults: 10,
        q: query
    }, function(data) {
        let searchContainer = $('#search-results');
        searchContainer.empty();
        for (let i=0; i < data.items.length; i++) {
            let thumbnail = data.items[i].snippet.thumbnails.medium.url;
            let videoId = data.items[i].id.videoId;
            searchContainer.append(`<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank"><img src="${thumbnail}" alt="Youtube Thumbnail"/></a>`);
        }
    });
}
