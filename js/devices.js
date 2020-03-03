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
  loadJSON("config.json", function (response) {
    let config = JSON.parse(response);
    for (let repo of config["devices"]) {
      loadJSON(repo + "/meta/config.json", function (response) {
        let device = JSON.parse(response);
        let d = device;
        d['image'] = repo + "/" + device['image']
        addDevice(d["image"], d["model"], d["make"], d["pageUrl"]);
      });
    }
  });
}

function addDevice(image, model, make, pageUrl) {
  let container = document.getElementById("device-list");
  const card = `
        <div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top" width="250" height="250" >
            <div class="card-body">
              <h5 class="card-title">${model}</h5>
              <p class="card-text">${make}</p>
              <a href="${pageUrl}" class="btn btn-primary">Download</a>
            </div>
          </div> 
      `;
  container.innerHTML += card;
}