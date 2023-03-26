
// Make an AJAX request to your backend API endpoint
$.ajax({
    url: "http://localhost:3000/getSehir",
    type: "GET",
    dataType: "json",
    success: function (data) {
      // 'data' variable contains the JSON response from your backend
      // You can now use this data to populate the dropdown menus on your HTML page
      populateDropdowns(data);
    },
    error: function (xhr, status, error) {
      // Handle error if the AJAX request fails
      console.error("Error retrieving cities data: ", error);
    }
  });
  
  // Function to populate dropdown menus with data
  function populateDropdowns(data) {
    // Get references to the dropdown menus on your HTML page
    var ilDropdown = $("#ilDropdown");

  
    // Populate the 'il' dropdown menu with city names
    $.each(data, function (index, city) {
      ilDropdown.append("<option value='" + city.sehir_title + "'>" + city.sehir_title + "</option>");
    });
  
    // Handle 'il' dropdown menu change event
    ilDropdown.on("change", function () {
      var selectedIl = $(this).val();
  
    
  
      // Populate the 'ilce' dropdown menu with district names
    });
  
    // Handle 'ilce' dropdown menu change event
    
  }
  