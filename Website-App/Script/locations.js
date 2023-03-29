// get references to the container elements
const sehirContainer = document.getElementById('sehir');
const ilceContainer = document.getElementById('ilce');
const mahalleContainer = document.getElementById('mahalle');
const sokakContainer = document.getElementById('sokak');
const saveButton = document.getElementById('save');
// make a GET request to the server endpoint to retrieve Sehir data
// get reference to the container element

// make a GET request to the server endpoint to retrieve Sehir data
axios.get('http://localhost:3000/getSehir')
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
    ilceContainer.innerHTML = '<option value="">-- Select an Ilce --</option>';

    // make a GET request to the server endpoint to retrieve Ilce data for the selected Sehir
    axios.get('http://localhost:3000/getIlce', {
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
    mahalleContainer.innerHTML = '<option value="">-- Select an Mahalle --</option>';

    // make a GET request to the server endpoint to retrieve Ilce data for the selected Sehir
    axios.get('http://localhost:3000/getMahalle', {
      params: {
        ilce_key: ilceKey
      }
    })
      .then(response => {
        // create an HTML option element for each Ilce document and append it to the Ilce dropdown
        response.data.forEach(mahalle => {
          const mahalleOption = document.createElement('option');
          mahalleOption.value = mahalle.mahalle_ilcekey;
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

    // clear the Ilce dropdown
    sokakContainer.innerHTML = '<option value="">-- Select an Mahalle --</option>';

    // make a GET request to the server endpoint to retrieve Ilce data for the selected Sehir
    axios.get('http://localhost:3000/getSokak', {
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
  console.log(il_title, ilce_title, mahalle_title, sokak_cadde_title);
  // Send the GET request to the server using Axios
  axios.get('http://localhost:3001/addInput', {
    params: {
      il_title,
      ilce_title,
      mahalle_title,
      sokak_cadde_title
    }
  })
  .then((response) => {
    console.log(response.data); // Display the response data in the console
  })
  .catch((error) => {
    console.log(error); // Display the error in the console
  });
});