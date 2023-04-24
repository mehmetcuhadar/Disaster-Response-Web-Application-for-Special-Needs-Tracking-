
// Define variables
var currentPage = 1;
var requestsPerPage = 10;
var requestsData = [];

const pending_button = document.getElementById("pending-button");

pending_button.addEventListener("click",() => {
	axios.get('https://localhost:3001/getInputs?status=0')
	.then(response => {
		// Save the data to a variable
		requestsData = response.data;

		// Populate the accordion and pagination
		populateRequests(currentPage);
		populatePagination();
	})
	.catch(error => console.error(error));
})
// Fetch the data
axios.get('https://localhost:3001/getInputs?status=0')
	.then(response => {
		// Save the data to a variable
		requestsData = response.data;

		// Populate the accordion and pagination
		populateRequests(currentPage);
		populatePagination();
	})
	.catch(error => console.error(error));



// Function to populate the accordion with requests data
function populateRequests(page) {
	// Calculate the index of the first and last requests to show
	var startIndex = (page - 1) * requestsPerPage;
	var endIndex = startIndex + requestsPerPage;

	// Get the div element to show the requests data
	var requestsDiv = document.getElementById('request-data');

	// Clear the div before populating it again
	requestsDiv.innerHTML = '';

	// Loop through the requests to show on this page
	for (var i = startIndex; i < endIndex && i < requestsData.length; i++) {
		// Create the accordion button with the request ID, city title, and district title
		var accordionButton = document.createElement('div');
		const id = i;
		accordionButton.onclick = function(){
			accFunction(""+id);
		};
		accordionButton.classList.add('accordion');
		accordionButton.classList.add('w3-card');
		
		// Get current date and time
		const currentDate = new Date(requestsData[i].created_at);

		// Format hour and minute digitally
		const hour = String(currentDate.getHours()).padStart(2, '0');
		const minute = String(currentDate.getMinutes()).padStart(2, '0');

		// Format day, month, and year
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		const date = currentDate.toLocaleDateString('tr-TR', options);

		// Combine hour, minute, and date
		const formattedDate = `${hour}:${minute} - ${date}`;

		// Log the formatted date

		accordionButton.innerHTML = `
		<div class="w3-row">
			<div class="w3-half w3-mobile" style = "display:flex;align-items:center;">
				<i class="fa fa-info-circle fa-2x"></i> &nbsp &nbsp &nbsp <b> ID :  ${requestsData[i].id} </b>
			</div>
			<div class="w3-half w3-mobile" style = "display:flex;align-items:center;">
				<div class= "w3-right"> <i class="fa fa-calendar fa-2x"></i> &nbsp; ${formattedDate}  </div>
			</div>
        </div>`;
		requestsDiv.appendChild(accordionButton);

		// Create the panel to show the details of the request
		var accordionPanel = document.createElement('div');
		accordionPanel.id = "" + i
		accordionPanel.classList.add('w3-hide');

		// Create the table to show the details of the request
		var accordionChild = document.createElement('div');

		accordionChild.innerHTML = `
		<div class="w3-card w3-padding w3-round-large">
		<div class="w3-row">
			<div class="w3-col s4 w3-mobile">
			<p><b>İl:</b> ${requestsData[i].il_title}</p>
			</div>
			<div class="w3-col s4 w3-mobile">
			<p><b>İlçe:</b> ${requestsData[i].ilce_title}</p>
			</div>
			<div class="w3-col s4 w3-mobile">
			<p><b>Mahalle:</b> ${requestsData[i].mahalle_title}</p>
			</div>
		</div>
		<div class="w3-row">
			<div class="w3-col s4 w3-mobile">
			<p><b>Sokak:</b> ${requestsData[i].sokak_cadde_title}</p>
			</div>
			<div class="w3-col s4 w3-mobile">
			<p><b>Site:</b> ${requestsData[i].site_title}</p>
			</div>
			<div class="w3-col s4 w3-mobile">
			<p><b>Apartman:</b> ${requestsData[i].apartman_title}</p>
			</div>
		</div>
		<div class="w3-row">
			<div class="w3-col s4 w3-mobile">
			<p><b>Telefon:</b> ${requestsData[i].tel_number}</p>
			</div>
			<div class="w3-col s4 w3-mobile">
			<p><b>İhtiyaç:</b> ${requestsData[i].ihtiyac_title}</p>
			</div>
			<div class="w3-col s4 w3-mobile">
				<p><b>Talep Durumu:</b> Onay bekliyor</p>
			</div>
		</div>
		<div class="w3-row">
			<div class="w3-col s12">
			<p><b>Ek Bilgi:</b> ${requestsData[i].add_info}</p>
			</div>
		</div>
			<button id= ${requestsData[i].id} class="w3-button w3-block w3-round-xxlarge w3-ripple w3-teal w3-large" onclick = "acceptRequest(event)"><b>Talebi Onayla</b></button>
		</div>
		`;


        // Append the table to the accordion panel
		accordionPanel.appendChild(accordionChild);

	// Append the accordionstatus panel to the requests div
	requestsDiv.appendChild(accordionPanel);
    }

// If there are no requests to show, display a message
if (requestsData.length === 0) {
	requestsDiv.innerHTML = 'No requests to display.';
}
}

function acceptRequest(event) {
	id = event.currentTarget.id;
	update = { status: "Onaylandı" };
    axios.put(`https://localhost:3001/changeStatus/${id}`, update)
    .then(response => {
        console.log(response.data); // handle the response from the backend
		axios.get('https://localhost:3001/getInputs?status=0')
		.then(response => {
			// Save the data to a variable
			requestsData = response.data;
	
			// Populate the accordion and pagination
			populateRequests(currentPage);
			populatePagination();
		})
		.catch(error => console.error(error));
    })
    .catch(error => {
        console.error(error); // handle the error
    });
}


// Function to populate the pagination
function populatePagination() {
// Get the div element to show the pagination
var paginationDiv = document.getElementById('pagination');
// Clear the div before populating it again
paginationDiv.classList.add("w3-center")
paginationDiv.innerHTML = '';


// Calculate the number of pages needed to show all the requests
var numPages = Math.ceil(requestsData.length / requestsPerPage);

// Create the previous button if needed
if (currentPage > 1) {
	var previousButton = document.createElement('button');
	previousButton.classList.add("w3-button")
	previousButton.classList.add("w3-hover-light-green")
	previousButton.innerHTML = 'Previous';
	previousButton.addEventListener('click', function() {
		currentPage--;
		populateRequests(currentPage);
		populatePagination();
	});
	paginationDiv.appendChild(previousButton);
}

// Create a button for each page
for (var i = 1; i <= numPages; i++) {
	var pageButton = document.createElement('button');
	pageButton.classList.add("w3-button")
	pageButton.classList.add("w3-hover-light-green")
	pageButton.innerHTML = i;
	if (i === currentPage) {
		pageButton.disabled = true;
	}
	pageButton.addEventListener('click', function() {
		currentPage = parseInt(this.innerHTML);
		populateRequests(currentPage);
		populatePagination();
	});
	paginationDiv.appendChild(pageButton);
}

// Create the next button if needed
if (currentPage < numPages) {
	var nextButton = document.createElement('button');
	nextButton.classList.add("w3-button")
	nextButton.classList.add("w3-hover-light-green")
	nextButton.innerHTML = 'Next';
	nextButton.addEventListener('click', function() {
		currentPage++;
		populateRequests(currentPage);
		populatePagination();
	});
	paginationDiv.appendChild(nextButton);
}
}


function accFunction(id) {
	var x = document.getElementById(id);
	if (x.className.indexOf("w3-show") == -1) {
	  x.className += " w3-show";
	  x.previousElementSibling.className = 
	  x.previousElementSibling.className.replace("w3-black", "w3-red");
	} else { 
	  x.className = x.className.replace(" w3-show", "");
	  x.previousElementSibling.className = 
	  x.previousElementSibling.className.replace("w3-red", "w3-black");
	}
}