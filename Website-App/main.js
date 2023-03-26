// get references to the container elements
const sehirContainer = document.getElementById('sehir-container');
const ilceContainer = document.getElementById('ilce-container');
const mahalleContainer = document.getElementById('mahalle-container');
const sokakContainer = document.getElementById('sokak-container');

// make a GET request to the server endpoint to retrieve Sehir data
axios.get('http://localhost:3000/getSehir')
  .then(response => {
    // create an HTML element for each Sehir document and append it to the container element
    response.data.forEach(sehir => {
      const sehirElem = document.createElement('div');
      sehirElem.textContent = sehir.sehir_title;
      sehirContainer.appendChild(sehirElem);
    });
  })
  .catch(error => {
    console.error(error);
  });

// make a GET request to the server endpoint to retrieve Ilce data for a specific Sehir
axios.get('http://localhost:3000/getIlce', {
  params: {
    il_key: '33'
  }
})
  .then(response => {
    // create an HTML element for each Ilce document and append it to the container element
    response.data.forEach(ilce => {
      console.log("connection done");
      const ilceElem = document.createElement('div');
      ilceElem.textContent = ilce.ilce_title;
      ilceContainer.appendChild(ilceElem);
    });
  })
  .catch(error => {
    console.error(error);
  });

// make a GET request to the server endpoint to retrieve Mahalle data for a specific Ilce
axios.get('http://localhost:3000/getMahalle', {
  params: {
    ilce_key: '330'
  }
})
  .then(response => {
    // create an HTML element for each Mahalle document and append it to the container element
    response.data.forEach(mahalle => {
      const mahalleElem = document.createElement('div');
      mahalleElem.textContent = mahalle.mahalle_title;
      mahalleContainer.appendChild(mahalleElem);
    });
  })
  .catch(error => {
    console.error(error);
  });

// make a GET request to the server endpoint to retrieve Sokak data for a specific Mahalle
axios.get('http://localhost:3000/getSokak', {
  params: {
    mahalle_key: '1000'
  }
})
  .then(response => {
    // create an HTML element for each Sokak document and append it to the container element
    response.data.forEach(sokak => {
      const sokakElem = document.createElement('div');
      sokakElem.textContent = sokak.sokak_title;
      sokakContainer.appendChild(sokakElem);
    });
  })
  .catch(error => {
    console.error(error);
  });
