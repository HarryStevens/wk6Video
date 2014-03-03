/**
 * @author
 */

//Document ready function calls pageLoaded when everything is loaded
$(document).ready(pageLoaded);

//pageLoaded function loads the Google viz lib and calls googleLoaded when it is loaded
function pageLoaded(){
	google.load("visualization", "1", {packages:["corechart"], callback:googleLoaded});
}

//googleLoaded function will grab the data
function googleLoaded(){
	$.get//put in file here
}
