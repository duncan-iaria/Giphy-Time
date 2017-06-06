// GIPHY CONTROLLER - HANDLES INPUTS AND UPDATING THE VIEW
var giphyController = ( function()
{
	var view =
	{
		buttonView: $( '#button-container' ),
		gifView: $( '#gif-container' ),
		feedbackView: $( '#feedback' )
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
		//if there are no gifs to display, then run the rest
		if( tData.length > 0 )
		{
			//render the new button
			renderButtons();

			//clear out the current gifs
			view.gifView.empty();

			//add each gif
			for( var i = 0; i < tData.length; i++ )
			{
				//define the items
				var tempContainer = $( '<div>' );
				var tempGif = $( '<img>' );
				var tempRating = $( '<p>' );

				tempContainer.addClass( 'gif-item' );
				//add giphy class (for allowing click)
				tempGif.addClass( 'giphy' );

				//add the data urls (toggled by clicking)
				tempGif.attr( 'data-animated', tData[i].animatedUrl );
				tempGif.attr( 'data-still', tData[i].stillUrl );
				tempGif.attr( 'state', 'still' );

				//set the default src
				tempGif.attr( 'src', tData[i].stillUrl );

				//set the rating
				tempRating.text( 'rating: ' +  tData[i].rating );

				//add to the view
				tempContainer.append( tempGif );
				tempContainer.append( tempRating );
				view.gifView.append( tempContainer );
			}

			view.feedbackView.text( 'CLICK GIF TO PLAY' );
		}
		else
		{	
			//give feedback that nothing was found
			view.feedbackView.text( 'No GIFS found, try another search...' );
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
			tempButton.addClass( 'btn btn-primary btn-lg btn-gif' );
			tempButton.text( giphyService.data[i] );
			tempButton.attr( 'data', giphyService.data[i] );
			view.buttonView.append( tempButton );
		}
	}

})();

//=================
// EVENTS
//=================
//uses event delegation for all .btns in the button container
$( '#button-container' ).on( 'click', '.btn', function()
{	
	giphyService.getGiphy(  $( this ).attr( 'data' ), giphyController.addGifToView );
});

//submit button click event
$( '#submit-button' ).on( 'click', function( tEvent )
{
	//prevent the form from submitting
	tEvent.preventDefault();

	var submitButton = $( this );
	var tempValue = $( '#add-button-input' ).val();

	if( !tempValue )
	{
		//return is tempValue is null (user has not entered text)
		giphyController.view.feedbackView.text( 'can not search for NOTHING, put something in the bar above!' );
		return;
	}
	else
	{
		for( var i = 0; i < giphyService.data.length; i++ )
		{	
			//if the topic has already been searched - return
			if( tempValue === giphyService.data[i] )
			{
				return;
			}
		}
	}

	//console.log( tempValue );

	giphyService.data.push( tempValue );
	giphyService.getGiphy( tempValue, giphyController.addGifToView );
});

//giphy item click event
$( '#gif-container' ).on( 'click', '.giphy', function()
{
	//save gif that was clicked
	var giphy = $( this );
		
	if( giphy.attr( 'state' ) === 'still' )
	{
		giphy.attr( 'src', giphy.attr( 'data-animated' ) );
		giphy.attr( 'state', 'animated' );
	}
	else
	{
		giphy.attr( 'src', giphy.attr( 'data-still' ) );
		giphy.attr( 'state', 'still' );
	}
});

//START
giphyController.init();