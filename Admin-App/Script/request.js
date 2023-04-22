const id_button = document.getElementById("request-id-search-button");
const id_input = document.getElementById("request-id-search-input");
var info_card = document.getElementById("info-card");
var on_the_road_button, arrived_button, cancel_button;
var current_id;

id_button.addEventListener("click", () => {
    axios.get(`https://localhost:3001/checkId?id=${id_input.value}`)
	.then(response => {
		// Save the data to a variable
        current_id = id_input.value;
		requestsData = response.data;
        if(!requestsData){
            console.log("merhaba")
            info_card.innerHTML = `
            <div class="w3-panel w3-yellow w3-center">
                <h3>Lütfen, takip kodu alanını boş bırakmayınız!</h3>
            </div> `;
        }else if (requestsData){
            console.log("Could not find")
            info_card.innerHTML = `
            <div class="w3-panel w3-yellow w3-center">
                <h3>Bu takip koduyla alakalı herhangi bir talep bulunamadı!</h3>
            </div> `;
        }else{
            createCard(requestsData[0])
        }
        
	})
	.catch(error => console.error(error));
})



function createCard(data) {

    // Get current date and time
    const currentDate = new Date(data.created_at);

    // Format hour and minute digitally
    const hour = String(currentDate.getHours()).padStart(2, '0');
    const minute = String(currentDate.getMinutes()).padStart(2, '0');

    // Format day, month, and year
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = currentDate.toLocaleDateString('tr-TR', options);

    // Combine hour, minute, and date
    const formattedDate = `${date} - ${hour}:${minute}`;

    // Log the formatted date


    info_card.innerHTML = `
    <div class="w3-padding-16">
        
        <div class="w3-row">
            <div class="w3-col s3 w3-mobile">
            <p><b>ID:</b> ${data.id}</p>
            </div>
            <div class="w3-col s3 w3-mobile">
            <p><b>Tarih:</b> ${formattedDate}</p>
            </div>
            <div class="w3-col s3 w3-mobile">
            <p><b>İl:</b> ${data.il_title}</p>
            </div>
            <div class="w3-col s3 w3-mobile">
            <p><b>İlçe:</b> ${data.ilce_title}</p>
            </div>
        </div>
        <div class="w3-row">
            <div class="w3-col s3 w3-mobile">
            <p><b>Mahalle:</b> ${data.mahalle_title}</p>
            </div>
            <div class="w3-col s3 w3-mobile">
            <p><b>Sokak:</b> ${data.sokak_cadde_title}</p>
            </div>
            <div class="w3-col s3 w3-mobile">
            <p><b>Site:</b> ${data.site_title}</p>
            </div>
            <div class="w3-col s3 w3-mobile">
            <p><b>Apartman:</b> ${data.apartman_title}</p>
            </div>
        </div>
        <div class="w3-row">
            <div class="w3-col s3 w3-mobile">
            <p><b>Telefon:</b> ${data.tel_number}</p>
            </div>
            <div class="w3-col s3 w3-mobile">
            <p><b>İhtiyaç:</b> ${data.ihtiyac_title}</p>
            </div>
            <div class="w3-col s3 w3-mobile">
                <p><b>Talep Durumu:</b> ${data.status}</p>
            </div>
        </div>
        <div class="w3-row">
            <div class="w3-col s12">
            <p><b>Ek Bilgi:</b> ${data.add_info}</p>
            </div>
        </div>
        <div class="w3-row">
            <div class="w3-col s4">
                <button id = "on-the-road-button" class = "w3-button w3-block w3-yellow w3-mobile">YOLDA</button>
            </div>
            <div class="w3-col s4">
                <button id = "arrived-button" class = "w3-button w3-block w3-teal w3-mobile">ULAŞTI</button>
            </div>
            <div class="w3-col s4">
                <button id = "cancel-button" class = "w3-button w3-block w3-red w3-mobile">İPTAL ET</button>
            </div>
        </div>
    </div>
    
    `;
    
    on_the_road_button = document.getElementById("on-the-road-button");
    arrived_button = document.getElementById("arrived-button");
    cancel_button = document.getElementById("cancel-button");
    
    on_the_road_button.addEventListener("click", () => {
        updateStatus(current_id, "YOLDA")
    });
    arrived_button.addEventListener("click", () => {
        updateStatus(current_id, "ULAŞTI")
        console.log("arrived");
    });
    cancel_button.addEventListener("click", () => {
        updateStatus(current_id, "İPTAL EDİLDİ")
        console.log("cancel");
    });

}


function updateStatus(id,status) {
    update = { status: status };
    axios.put(`https://localhost:3001/changeStatus/${id}`, update)
    .then(response => {
        console.log(response.data); // handle the response from the backend
    })
    .catch(error => {
        console.error(error); // handle the error
    });
}