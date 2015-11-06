// wait for DOM to load before running JS
$(function() {
	var source = $('#tracks-template').html();
  var template = Handlebars.compile(source);
  console.log(template)
	// check to make sure JS is loaded
	console.log('JS is loaded!');
	$('#search').on('submit', function(event) {
		$('.results').empty();
		$('.results').addClass('impatient');
		event.preventDefault();
		var searchTrack = $('#track').val();
		$('#track').val('');
		$.get('https://api.spotify.com/v1/search?q=' + searchTrack + '&type=track', function(data) {
			var trackResults = data.tracks.items;
			$('.results').removeClass('impatient');
			if (data.tracks.total === 0) {
				$('.results').append('<h1>Sorry no matches found.  Please search again</h1>');
			}
			var trackHtml = template({ tracks: trackResults });
			$('.results').append(trackHtml);
			// trackResults.forEach(function(trackEach) {
			// 	var tracks = trackEach.name;
			// 	var name = trackEach.artists[0].name;
			// 	var artwork = trackEach.album.images[0].url;
			// 	var previewURL = trackEach.preview_url;
			// 	var albumName = trackEach.album.name;
			// 	var trackHtml = template({tracks: trackResults});
			// 	trackHtml.appendTo(',results');
				// if (artwork) {
				// 	$('<div class="trackRows row"><div class="artDiv col-md-4"><img class="artwork" src="' + artwork + '"></div><div class="trackInfo" col-md-8"><p class="trackText">Artist: ' + name + '</p><p>Album: ' + albumName + ' </p><p>Track: ' + tracks + '</p><audio preload=none controls><source src="' + previewURL + '" type="audio/mpeg"></audio></div></div>').appendTo('.results');
				// } else {
				// 	$('<div class="trackRows row"><div class="noArtDiv col-md-4"><p>No album art available</p></div><div class="trackInfo" col-md-8"><p class="trackText">Artist: ' + name + '</p><p>Album: ' + albumName + ' </p><p>Track: ' + tracks + '</p><audio preload=none controls><source src="' + previewURL + '" type="audio/mpeg"></audio></div></div>').appendTo('.results');
				// }
			});
		});
});