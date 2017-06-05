// GIPHY CONTROLLER - HANDLES INPUTS AND UPDATING THE VIEW
var giphyController = ( function()
{
	var view =
	{
		buttonView: $( '#button-container' ),
		gifView: $( '#gif-container' )
	}

	var publicAPI = 
	{
		view: view,
		addGifToView: addGifToView,
	}

	function addGifToView( tData )
	{
		for( var i = 0; i < tData.length; i++ )
		{
			var tempGif = $( '<img>' );
			tempGif.attr("src", tData[i].animatedUrl );
			giphyController.view.gifView.append( tempGif ); 	
		}
	}

	return publicAPI;

})();


//uses event delegation for all .btns in the button container
$( '#button-container' ).on( 'click', '.btn', function()
{	
	giphyService.getGiphy( 'cat', giphyController.addGifToView );
});