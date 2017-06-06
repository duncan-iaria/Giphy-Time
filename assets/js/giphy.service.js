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
		getGiphy: giphyRequest,
		data: data
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
		var tempData = [];

		for( var i = 0; i < tData.length; i++ )
		{
			var tempGif = 
			{
				stillUrl: tData[i].images.fixed_height_still.url,
				animatedUrl: tData[i].images.fixed_height.url,
				rating: tData[i].rating
			}

			tempData.push( tempGif );
		}
		//console.log( tempData );
		tCallback( tempData );
	}
})();