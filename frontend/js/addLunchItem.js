

// var addButton = document.getElementById('addButton');
// addButton.addEventListener('click', function(e) {
//   console.log('addButton was clicked');
// });



function addLunchItem()
{
	console.log('addButton was clicked');

	var name = document.getElementById('lunchName');
  var description = document.getElementById('inputDescription');
  var date = document.getElementById('inputDate');

	var params = "name=" + name.value + "&description=" + description.value + "&date=" + date.value ;
   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("POST","http://localhost:8080/addLunchItem", true);
   xmlhttp.onreadystatechange=function(){
         if (xmlhttp.readyState==4 && xmlhttp.status==200){
           string=xmlhttp.responseText;
           
           alert("Added Lunch Item");
         }
   }
   xmlhttp.send(params);
}