
var disabled = true;
function getLunchInfoFromDB()
{
  var lunchNameDiv = document.getElementById('lunchName');
  var lunchID  = lunchNameDiv.getAttribute('name');  

  var param = "lunchID=" + lunchID;

   $.ajax({
    type: "GET",
    url: "getLunchInfoRequest",
    data: param,
    cache: false,
    success: function(data){
      $("#inputLunchName").val(data.Name);
      $("#inputDescription").val(data.Description);
      $("#inputDate").val(data.Date);

      if(data.Rating !== undefined)
      {
        $("[name=ratings][value=" + data.Rating + "]").prop("checked", true);
      }     
    }
  });
}

function toggleEdit()
{
  if(disabled)
  {
    document.getElementById("inputLunchName").disabled = false;
    document.getElementById("inputDescription").disabled = false;
    document.getElementById("inputDate").disabled = false;
    document.getElementById("deleteLunchItem").disabled = false;

    disabled = false;
  }
  else
  {
    document.getElementById("inputLunchName").disabled = true;
    document.getElementById("inputDescription").disabled = true;
    document.getElementById("inputDate").disabled = true;
    document.getElementById("deleteLunchItem").disabled = true;
    disabled = true;
  }
}

function submitLunchInfo()
{
  var lunchNameDiv = document.getElementById('lunchName');
  var lunchID  = lunchNameDiv.getAttribute('name');

  var radioValue = $("input[name='ratings']:checked").val();

  var param = "lunchID=" + lunchID;

  param += "&lunchName=" + document.getElementById('inputLunchName').value;
  param += "&lunchDesc=" + document.getElementById('inputDescription').value;
  param += "&lunchDate=" + document.getElementById('inputDate').value;
  param += "&lunchRating=" + radioValue;
 

  $.ajax({
    type: "GET",
    url: "submitLunchInfoRequest",
    data: param,
    cache: false,
    success: function(data){
      alert("Updated Lunch Item");
    }
  });
}

function deleteLunchItem()
{
  var lunchNameDiv = document.getElementById('lunchName');
  var lunchID  = lunchNameDiv.getAttribute('name');


  var param = "lunchID=" + lunchID;


 

  $.ajax({
    type: "GET",
    url: "deleteLunchItemRequest",
    data: param,
    cache: false,
    success: function(data){  
      console.log(data);
      window.location.href = '/displayLunchesPage';
    }
  });

}