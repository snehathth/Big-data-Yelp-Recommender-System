
//


// code for the buttons 
/* getbtn is used to refresh the data in the list and 
postbtn is used to send the selected restaurant to the recommendation engine. 
Both the buttons use a XML Http Request to get the data from the cloud functions. 
Get btn gets the data of 10 random restaurants and repopulates the dropdown
Post Button gets the top 3 recommendations and posts in the cards */

const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');
var data
//The function sends the http requests depending on the type of request - GET or POST
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

//Invoking the http request and translating the data into the select options
const getData = () => {
  var progress = 0;

function startProgress()
{


} 
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
  };

  request.onerror = function() {
    console.error('An error occurred fetching the JSON from ' + url);
  };

  request.send();
  };

const sendData = () => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  var select = document.getElementById('locality-dropdown');
  sendHttpRequest('POST', proxyurl+'https://us-central1-recommendationengine-for-yelp.cloudfunctions.net/function-1', {
    identity: select.options[select.selectedIndex].value
  })
    .then(responseData => {
      console.log(responseData);
      data = responseData;
      document.getElementById('option1').innerHTML = responseData[0].name;
      document.getElementById('option2').innerHTML = responseData[1].name;
      document.getElementById('option3').innerHTML = responseData[2].name;
      document.getElementById('option1').value = responseData[0].address;
      document.getElementById('option2').value = responseData[1].address;
      document.getElementById('option3').value = responseData[2].address;
      document.getElementById('para1').innerHTML = 'It is located within 10 miles with'+ " <br /> "+
                                                   'Alcohol :'.bold()+responseData[0].Alcohol+ " <br /> "+
                                                   'Dressing :'.bold()+responseData[0].RestaurantsAttire+ " <br /> "+
                                                   'Reservations :'.bold()+responseData[0].Reservations;
      document.getElementById('para2').innerHTML = 'It is located within 10 miles with'+ " <br /> "+
                                                   'Alcohol :'.bold()+responseData[1].Alcohol+ " <br /> "+
                                                   'Dressing :'.bold()+responseData[1].RestaurantsAttire+ " <br /> "+
                                                   'Reservations :'.bold()+responseData[1].Reservations;
      document.getElementById('para3').innerHTML = 'It is located within 10 miles with'+ " <br /> "+
                                                   'Alcohol :'.bold()+responseData[2].Alcohol+ " <br /> "+
                                                   'Dressing :'.bold()+responseData[2].RestaurantsAttire+ " <br /> "+
                                                   'Reservations :'.bold()+responseData[2].Reservations;

    })
    .catch(err => {
      console.log(err);
    })};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);

//Function on changing iframe URL

const choice1 = document.getElementById('restro1');
choice1.style.cursor = 'pointer';
choice1.onclick = function(){
  var url = "https://www.google.com/maps/embed/v1/directions?key=my-key&origin=Downtown Grand Hotel Casino,206 N 3rd St, Las Vegas, NV 89101&destination="+data[0].name+','+data[0].address+",Las Vegas&avoid=tolls|highways"
  var el = document.getElementById('map');
  el.src = url; // assign url to src property
}

const choice2 = document.getElementById('restro2');
choice2.style.cursor = 'pointer';
choice2.onclick = function(){
  var url = "https://www.google.com/maps/embed/v1/directions?key=my-key&origin=Downtown Grand Hotel Casino,206 N 3rd St, Las Vegas, NV 89101&destination="+data[1].name+','+data[1].address+",Las Vegas&avoid=tolls|highways"
  var el = document.getElementById('map');
  el.src = url; // assign url to src property
}
const choice3 = document.getElementById('restro3');
choice3.style.cursor = 'pointer';
choice3.onclick = function(){
  var url = "https://www.google.com/maps/embed/v1/directions?key=my-key&origin=Downtown Grand Hotel Casino,206 N 3rd St, Las Vegas, NV 89101&destination="+data[2].name+','+data[2].address+",Las Vegas&avoid=tolls|highways"
  var el = document.getElementById('map');
  el.src = url; // assign url to src property
}


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

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 300);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}