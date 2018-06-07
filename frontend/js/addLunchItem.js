

// var addButton = document.getElementById('addButton');
// addButton.addEventListener('click', function(e) {
//   console.log('addButton was clicked');
// });



function addLunchItem()
{
	console.log('addButton was clicked');

	var input = document.getElementById('lunchName');

	console.log('LunchName is:' + input.value);

	var params = "Name=" + input.value + "&rime=time";
   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("POST","http://localhost:8080/addLunchItem", true);
   xmlhttp.onreadystatechange=function(){
         if (xmlhttp.readyState==4 && xmlhttp.status==200){
           string=xmlhttp.responseText;
         }
   }
   xmlhttp.send(params);
}