function addDevice(device) {
  var ul = document.getElementById("device-list");
  var li = document.createElement("li");
  li.setAttribute('id', candidate.value);
  li.appendChild(device);
  ul.appendChild(li);
}

function loadJSON(url, callback) {

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function buildDevices() {
  console.log("buildDevices");
  loadJSON("config.json", function (response) {
    let config = JSON.parse(response);
    console.log(config["devices"]);
    for (let repo of config["devices"]) {
      console.log(repo);
      loadJSON(repo + "/meta/config.json", function (response) {
        let device = JSON.parse(response);



        let name = device["name"];
        console.log(name)

        addDevice(repo + "/meta/device_image.jpg", name);
        
      });
    }
  });
}

function addDevice(image, name) {
  let container = document.getElementById("device-list");
  const card = `
        <div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div> 
      `;
  container.innerHTML += card;
}