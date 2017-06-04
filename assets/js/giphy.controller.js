// GIPHY CONTROLLER - HANDLES INPUTS AND UPDATING THE VIEW
var giphyController = ( function ()
{

})();

$( '#testButton' ).on( 'click', function()
{	
	var tempData = giphyService.getGiphy( 'cat', function( tData )
	{
		console.log( tData );
	});
	//console.log( tempData );
});