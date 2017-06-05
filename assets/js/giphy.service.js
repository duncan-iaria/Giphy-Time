// GIPHY SERVICE - HANDLES MAKING THE GIPHY API REQUEST AND SERVING TO CONTROLLER
var giphyService = ( function()
{
	//data vars
	var data = [ 'dog', 'squirrel', 'ferret' ];

	//api vars
	var apiKey = 'dc6zaTOxFJmzC';
	var queryUrl = 'http://api.giphy.com/v1/gifs/search?'
	var parameters = {};
	var gifReturnLimit = 10;

	//global access
	var publicAPI =
	{
		getGiphy: giphyRequest
	}

	return publicAPI;

	function giphyRequest( tQuery, tCallback )
	{
		//console.log( 'you asked for ' + tQuery );
		parameters.q = tQuery;
		parameters.limit = gifReturnLimit;
		parameters.api_key = apiKey;

		tempQueryUrl = queryUrl + $.param( parameters );

		$.ajax( { url: tempQueryUrl, type: "GET", } )
		.done( function( tResponse )
		{
			console.log( tResponse );
			processRequest( tResponse.data, tCallback );
		});
	}

	function processRequest( tData, tCallback )
	{
		//console.log( 'uh hey?' );
		var tempData = [];

		console.log( tData[0].images );

		for( var i = 0; i < tData.length; i++ )
		{
			console.log( tData[i].images.fixed_height.url );
			var tempGif = 
			{
				stillUrl: tData[i].images.fixed_height_still.url,
				animatedUrl: tData[i].images.fixed_height.url
			}

			tempData.push( tempGif );
		}
		//console.log( tempData );
		tCallback( tempData );
	}
})();