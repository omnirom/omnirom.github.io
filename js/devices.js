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

function loadDevice(url) {
  axios
    .get(url + "/meta/config.json", {
    })
    .then(response => {
      let device = response.data;
      let d = device;
      console.log(d);
      d['image'] = url + "/" + device['image']
      addDevice(d);
    })
    .catch(error => {
      console.log("loadDevice " + url, error);
    });
}

function loadGithubRepos(branch) {
  axios
    .get("https://gerrit.omnirom.org/projects/?b=" + branch + "&p=android_device", {
      })
    .then(response => {
      let magic = ")]}'";
      let repos = response.data.substring(magic.length);
      let s = JSON.parse(repos)
      for (var repo in s) {
        let url = "https://raw.githubusercontent.com/omnirom/" + repo + "/android-10"
        loadDevice(url);
      }
    })
    .catch(error => {
      console.log("loadGithubRepos", error);
    });
}

function buildDevices() {
  let d = {};
  d['model'] = "All Devices";
  d['make'] = "All Manufactures";
  d['state'] = "official";
  d['pageUrl'] = "https://dl.omnirom.org/";
  d['image'] = "images/default_phone_omni.png";
  addDevice(d);

  loadGithubRepos('android-10');
}

function addDevice(device) {
  let container = document.getElementById("device-list");
  const card = `
        <div class="card" style="width: 18rem;">
            <img src="${device['image']}" class="card-img-top" width="250" alt="${device['model']}" >
            <div class="card-body">
              <h5 class="card-title">${device['model']}</h5>
              <p class="card-text">${device['make']}<br>${device['state']}</p>
              <a href="${device['pageUrl']}" class="btn btn-primary">Download</a>
            </div>
          </div> 
      `;
  container.innerHTML += card;
}