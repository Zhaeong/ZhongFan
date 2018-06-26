

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
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      console.log(data);

      for(var i = 0; i < data.length; i++) 
      {
        var obj = data[i];

        outputTable += "<tr id = '" + obj._id + "'>";
          outputTable += "<td>" + obj.Name + "</td>";
          outputTable += "<td>" + obj.Date + "</td>";
        outputTable += "</tr>";
      }

      outputTable += "</tbody></table>";

      $("#lunchesDisplay").html(outputTable);

    }
  });
}