/**
 * Created by Kewen on 12/16/15.
 */

function handleEmail(){
	var year = document.getElementById('edityear');
	var month = document.getElementById('editmonth');
	var day = document.getElementById('editday');
	var hour = document.getElementById('edithour');
	var minute = document.getElementById('editmin');

	var reqp = new XMLHttpRequest();
	reqp.open('POST', '/email', true);
	reqp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	var query = "";
	query+= 'year=' + year.value + '&';
	query+= 'month=' + month.value + '&';
	query+= "day=" + day.value + '&';
	query+= "hour=" + hour.value + "&";
	query+= 'minute=' + minute.value + "&";
	query += 'username=' + document.getElementById('username').innerText + '&';
	query += 'id=' + document.getElementById('edit-id').innerText;
	console.log(query);
	reqp.send(query);

	reqp.onreadystatechange = function () {
		if(reqp.readyState == 4 && reqp.status == 200){
			alert("Email has been scheduled")
		}
	}
}