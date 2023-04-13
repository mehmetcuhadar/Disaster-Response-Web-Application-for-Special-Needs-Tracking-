
  // get references to the container elements
const form = document.getElementById('form');
const success_message = document.getElementById('success-message'); //Form submitted successfully
const warning_message = document.getElementById('warning-message'); //Form is not submitted successfully
const responseId = document.getElementById('response-id');
const sehirContainer = document.getElementById('sehir');
const ilceContainer = document.getElementById('ilce');
const mahalleContainer = document.getElementById('mahalle');
const sokakContainer = document.getElementById('sokak');
const siteContainer = document.getElementById('site');
const apartmanContainer = document.getElementById('apartman');
const phoneContainer = document.getElementById('phone');
const needContainer = document.getElementById('special-needs');
const infoContainer = document.getElementById('additional-info');
const saveButton = document.getElementById('save');
// make a GET request to the server endpoint to retrieve Sehir data
// get reference to the container element

// make a GET request to the server endpoint to retrieve Sehir data
axios.get("https://localhost:3000/getIhtiyac")
  .then(response => {
    const options = response.data.map(option => `
      <option value="${option._id}">${option.ihtiyac_title}</option>
    `).join('');
    needContainer.innerHTML += options;
  })
  .catch(error => {
    console.error(error);
  });


axios.get('https://localhost:3000/getSehir')
  .then(response => {
    // create an option element for each Sehir document and append it to the dropdown
    response.data.forEach(sehir => {
      const sehirOption = document.createElement('option');
      sehirOption.textContent = sehir.sehir_title;
      sehirOption.value = sehir.sehir_key;
      sehirContainer.appendChild(sehirOption);
    });
  })
  .catch(error => {
    console.error(error);
  });


  sehirContainer.addEventListener('change', event => {
    const sehirKey = event.target.value;

    // clear the Ilce dropdown
    ilceContainer.innerHTML = '<option value="">-- İlçe Seçiniz --</option>';

    // make a GET request to the server endpoint to retrieve Ilce data for the selected Sehir
    axios.get('https://localhost:3000/getIlce', {
      params: {
        il_key: sehirKey
      }
    })
      .then(response => {
        // create an HTML option element for each Ilce document and append it to the Ilce dropdown
        response.data.forEach(ilce => {
          const ilceOption = document.createElement('option');
          ilceOption.value = ilce.ilce_key;
          ilceOption.textContent = ilce.ilce_title;
          ilceContainer.appendChild(ilceOption);
        });
      })
      .catch(error => {
        console.error(error);
      });
  });


  ilceContainer.addEventListener('change', event => {
    const ilceKey = event.target.value;

    // clear the Ilce dropdown
    mahalleContainer.innerHTML = '<option value="">-- Mahalle Seçiniz --</option>';

    // make a GET request to the server endpoint to retrieve Ilce data for the selected Sehir
    axios.get('https://localhost:3000/getMahalle', {
      params: {
        ilce_key: ilceKey
      }
    })
      .then(response => {
        // create an HTML option element for each Ilce document and append it to the Ilce dropdown
        response.data.forEach(mahalle => {
          const mahalleOption = document.createElement('option');
          mahalleOption.value = mahalle.mahalle_key;
          mahalleOption.textContent = mahalle.mahalle_title;
          mahalleContainer.appendChild(mahalleOption);
        });
      })
      .catch(error => {
        console.error(error);
      });
  });


  mahalleContainer.addEventListener('change', event => {
    const mahalleKey = event.target.value;
    console.log("mahalle: ", mahalleKey);

    // clear the Ilce dropdown
    sokakContainer.innerHTML = '<option value="">-- Sokak Seçiniz --</option>';

    // make a GET request to the server endpoint to retrieve Ilce data for the selected Sehir
    axios.get('https://localhost:3000/getSokak', {
      params: {
        mahalle_key: mahalleKey
      }
    })
      .then(response => {
        // create an HTML option element for each Ilce document and append it to the Ilce dropdown
        response.data.forEach(sokak => {
          const sokakOption = document.createElement('option');
          sokakOption.value = sokak.sokak_cadde_mahallekey;
          sokakOption.textContent = sokak.sokak_cadde_title;
          sokakContainer.appendChild(sokakOption);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }); 



// Add a click event listener to the button
saveButton.addEventListener('click', () => {
  // Get the input values from the form
  const il_title = sehirContainer.options[sehirContainer.selectedIndex].textContent;
  const ilce_title = ilceContainer.options[ilceContainer.selectedIndex].textContent;
  const mahalle_title = mahalleContainer.options[mahalleContainer.selectedIndex].textContent;
  const sokak_cadde_title = sokakContainer.options[sokakContainer.selectedIndex].textContent;
  const site_title = siteContainer.value;
  const apartman_title = apartmanContainer.value;
  const tel_number = phoneContainer.value;
  const ihtiyac_title = needContainer.options[needContainer.selectedIndex].textContent;
  const add_info = infoContainer.value;
  console.log(il_title, ilce_title, mahalle_title, sokak_cadde_title, site_title, apartman_title, tel_number, ihtiyac_title, add_info);
  // Send the GET request to the server using Axios
  if (sehirContainer.selectedIndex != 0 && ilceContainer.selectedIndex != 0 && mahalleContainer.selectedIndex != 0 && needContainer.selectedIndex != 0){
    axios.get('https://localhost:3001/addInput', {
      params: {
        il_title,
        ilce_title,
        mahalle_title,
        sokak_cadde_title,
        site_title,
        apartman_title,
        tel_number,
        ihtiyac_title,
        add_info
      }
    })
    .then((response) => {
      form.reset()
      warning_message.style.display = "none"
      success_message.style.display = "block"
      responseId.textContent = response.data.id;
    })
    .catch((error) => {
      console.log(error); // Display the error in the console
    });
  }else{
    success_message.style.display = "none"
    warning_message.style.display = "block"
  }
    
});
