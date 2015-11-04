// wait for DOM to load before running JS
$(function() {

  // check to make sure JS is loaded
console.log('JS is loaded!');
	$('#search').on('submit', function(event) {
		$('li').remove();
		event.preventDefault();
		var searchTrack = $('#track').val();
		$('#track').val('');
		$.get('https://api.spotify.com/v1/search?q=' + searchTrack + '&type=track', function (data){
			var trackResults = data.tracks.items;
			console.log(data.tracks.items);
			trackResults.forEach( function (trackEach) {
				var tracks = trackEach.name;
				var name = trackEach.artists[0].name;
				var artwork = trackEach.album.images[0].url;
				var previewURL = trackEach.preview_url;
				console.log(previewURL);
				if (artwork) {
					$('<li class="listResults">'+ name + ' ' + ':' + tracks + ' ' + '<img class="artwork" src="' + artwork + '"></li>').appendTo('ul');
					$('<li><audio controls><source src="' + previewURL + '" type="audio/mpeg"></audio></li>').appendTo('ul');	
				}
				else {
					$('<li class="listResults">'+ name + ' : ' + tracks + '</li>').appendTo('ul');	
				}	
		});
	});
	});


});


// preview_url: "https://p.scdn.co/mp3-preview/b1a554562d2642de452ba243bf40d9e4a90ee6db"
// <iframe src="https://embed.spotify.com/?uri=spotify:track:5JunxkcjfCYcY7xJ29tLai" frameborder="0" allowtransparency="true"></iframe>