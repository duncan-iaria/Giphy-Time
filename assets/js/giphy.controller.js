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
		init: init,
		addGifToView: addGifToView,
		renderButtons: renderButtons,
	}

	return publicAPI;

	function init()
	{
		renderButtons();
	}

	function addGifToView( tData )
	{

		//clear out the current gifs
		view.gifView.empty();

		//add each gif
		for( var i = 0; i < tData.length; i++ )
		{
			var tempGif = $( '<img>' );
			tempGif.attr( "src", tData[i].animatedUrl );
			view.gifView.append( tempGif ); 	
		}
	}

	function renderButtons()
	{	
		//clear out the old buttons
		view.buttonView.empty();

		//add new buttons
		for( var i = 0; i < giphyService.data.length; i++ )
		{
			var tempButton = $( '<button>' );
			tempButton.addClass( 'btn btn-primary btn-lg' );
			tempButton.text( giphyService.data[i] );
			tempButton.attr( 'data', giphyService.data[i] );
			view.buttonView.append( tempButton );
		}
	}

})();


//uses event delegation for all .btns in the button container
$( '#button-container' ).on( 'click', '.btn', function()
{	
	giphyService.getGiphy(  $( this ).attr( 'data' ), giphyController.addGifToView );
});

$( '#submit-button' ).on( 'click', function( tEvent )
{
	//prevent the form from submitting
	tEvent.preventDefault();

	var submitButton = $( this );
	var tempValue = $( '#add-button-input' ).val();

	console.log( tempValue );

	giphyService.data.push( tempValue );
	giphyService.getGiphy( tempValue, giphyController.addGifToView );
	giphyController.renderButtons();
});

//START
giphyController.init();