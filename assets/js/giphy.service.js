// GIPHY SERVICE - HANDLES MAKING THE GIPHY API REQUEST AND SERVING TO CONTROLLER
var giphyService = ( function()
{
	//data vars
	var data = [ 'dog', 'squirrel', 'ferret' ];

	//api vars
	var apiKey = 'dc6zaTOxFJmzC';
	var queryUrl = 'http://api.giphy.com/v1/gifs/random?'
	var parameters = {};

	//global access
	var publicAPI =
	{
		getGiphy: giphyRequest
	}

	return publicAPI;

	function giphyRequest( tQuery, tCallback )
	{
		//console.log( 'you asked for ' + tQuery );
		parameters.tag = tQuery;
		parameters.api_key = apiKey;

		tempQueryUrl = queryUrl + $.param( parameters );

		$.ajax( { url: tempQueryUrl, type: "GET", } )
		.done( function( tResponse )
		{
			//console.log( tResponse );
			processRequest( tResponse.data, tCallback );
		});
	}

	function processRequest( tData, tCallback )
	{
		//console.log( 'uh hey?' );
		var tempData = 
		{
			stillUrl: tData.fixed_width_small_still_url,
			animatedUrl: tData.fixed_width_small_url
		}

		//console.log( tempData );
		tCallback( tempData );
	}
})();