const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const getData = () => {
    sendHttpRequest('GET', 'https://reqres.in/api/users').then(responseData => {
      console.log(responseData);
    });
  };

const sendData = () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  sendHttpRequest('POST', proxyurl+'https://us-central1-recommendationengine-for-yelp.cloudfunctions.net/function-1', {
    identity: 'SAfuIUZMXrOnb3LWyvYjDA'
  })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err);
    });
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);




// function for select 
let dropdown = document.getElementById('locality-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose Your Favorite';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = proxyurl+'https://us-central1-recommendationengine-for-yelp.cloudfunctions.net/get_sample ';

const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function() {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    let option;
    for (let i = 0; i < data.length; i++) {
      option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].business_id;
      dropdown.add(option);
    }
   } else {
    // Reached the server, but it returned an error
  }   
}

request.onerror = function() {
  console.error('An error occurred fetching the JSON from ' + url);
};

request.send();