

function getLunchItems()
{
	var myusername = "heyyyyparam=bebe";
  $.ajax({
    type: "GET",
    url: "getLunchItemRequest",
    data: myusername,
    cache: false,
    success: function(data){

      var outputTable = `
      <table class='table table-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
      `;

      for(var i = 0; i < data.length; i++) 
      {
        var obj = data[i];

        outputTable += "<tr id = '" + obj._id + "' onClick='getLunchInfo(this.id)'>";
          outputTable += "<td>" + obj.Name + "</td>";
          

          if(obj.Rating !== undefined)
          {
            outputTable += "<td>" + obj.Rating + "</td>";
          }
          else
          {
            outputTable += "<td>Unrated</td>";
          }

          outputTable += "<td>" + obj.Date + "</td>";
        outputTable += "</tr>";
      }

      outputTable += "</tbody></table>";

      $("#lunchesDisplay").html(outputTable);

    }
  });
}


function getLunchInfo(lunchID)
{

  var param = "id=" + lunchID;
  window.location.href = '/displayLunchInfoPage?' + param;

}