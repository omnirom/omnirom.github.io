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
      d['image'] = url + "/" + device['image']
      addDevice(d["image"], d["model"], d["make"], d["pageUrl"]);
    })
    .catch(error => {
      console.log("loadDevice " + url, error);
    });
}

function loadGithubRepos() {
  axios
    .get("https://gerrit.omnirom.org/projects/?b=android-10&p=android_device", {
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
  loadGithubRepos();
}

function addDevice(image, model, make, pageUrl) {
  let container = document.getElementById("device-list");
  const card = `
        <div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top" width="250" >
            <div class="card-body">
              <h5 class="card-title">${model}</h5>
              <p class="card-text">${make}</p>
              <a href="${pageUrl}" class="btn btn-primary">Download</a>
            </div>
          </div> 
      `;
  container.innerHTML += card;
}