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
	var bigArray = [];//this is the empty array that I will dump the longer set of arrays into
	var dataRows = UNEMP.rows;
	
	//Extract date string to convert it to actual date
	for(var i=0;i<dataRows.length;i++){
		var currRow = dataRows[i];
		var dateRow = currRow[0];

		//Moment.js working its conversion magic on the date strings
		var momentRow = moment(dateRow);
		var momentRowD = momentRow._d;

		//This is for the value (unemployment percentage)
		var valRow = currRow[1];
		
		//Pushing all those arrays into the big array of arrays
		var dataArray = [momentRowD,valRow];
		bigArray.push(dataArray);
	}//end for
		
	var data = new google.visualization.DataTable();
	
	data.addColumn('date', 'Date');//Now the type can be a date instead of a string
	data.addColumn('number', 'Unemployment');
	data.addRows(bigArray);
	var options = {
		title: 'Civilian Unemployment',
		legend:{position:'none'},		
		curveType: 'function',
		explorer:{actions:['dragToZoom','rightClickToReset'],axis:'horizontal'},
		height:500,
		chartArea:{height:400,width:1000},
		hAxis:{title:'Date'},
		vAxis:{title:'Percent unemployed',ticks:[0,2,4,6,8,10,12],format:'#'}
	};
		
	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);

	}
	
