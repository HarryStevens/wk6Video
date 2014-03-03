/**
 * @author
 */

//Document ready function calls pageLoaded when everything is loaded
$(document).ready(pageLoaded);

//pageLoaded function loads the Google viz lib and calls googleLoaded when it is loaded
function pageLoaded() {
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : googleLoaded
	});
}

//googleLoaded function will grab the data from the fusion tables and call the function dataLoaded
function googleLoaded() {
	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1NS8sD1CJyw9zjppjdvtHeqO3fJcD-mrFffmK0ukC&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8", dataLoaded, "json");
}

//this function will do any necessary data conversions and display the data
function dataLoaded(UNEMP) {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Date');
	data.addColumn('number', 'Unemployment');
	data.addRows(UNEMP.rows);
	var options = {
		title: 'Civilian Unemployment',
		height:500
	};
	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}

