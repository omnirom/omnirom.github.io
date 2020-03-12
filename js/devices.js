async function loadDevice(url) {
  try {
    let response = await axios
      .get(url + "/meta/config.json", {
      });
    let device = await response.data;
    let d = device;
    d['image'] = url + "/" + device['image'];
    addDevice(d);
  } catch (error) {
    console.log("loadDevice error: " + url);
  }
}

async function loadGithubRepos(branch) {
  try {
    let response = await axios
      .get("https://gerrit.omnirom.org/projects/?b=" + branch + "&p=android_device", {
      });

    let magic = ")]}'";
    let repos = response.data.substring(magic.length);
    let s = await JSON.parse(repos);

    for (var repo in s) {
      let url = "https://raw.githubusercontent.com/omnirom/" + repo + "/android-10";
      await loadDevice(url);
    }
  } catch (error) {
    console.log("loadGithubRepos error");
  }
}

function buildDevices() {
  let container = document.getElementById("sub-container");
  const row = `
  <div class="row">
    <div class="col-lg-12 mx-auto">
      <h2>Devices</h2>
      <div class="row" id="device-list">
      </div>
    </div>
  </div> `;
  container.innerHTML = row;

  let d = {};
  d['model'] = "All Devices";
  d['make'] = "All Manufactures";
  d['state'] = "official";
  d['pageUrl'] = "https://dl.omnirom.org/";
  d['image'] = "/images/default_phone_omni.png";
  addDevice(d);

  loadGithubRepos('android-10');
}

async function addDevice(device) {
  let container = document.getElementById("device-list");
  const card = `
        <div class="card device-card" style="width: 18rem;">
            <img src="${device['image']}" class="card-img-top" width="250" alt="${device['model']}" >
            <div class="card-body">
              <h5 class="card-title">${device['model']}</h5>
              <p class="card-text">${device['make']}<br>${device['state']}</p>
              <a href="${device['pageUrl']}" class="btn btn-omni">Download</a>
            </div>
          </div> `;
  container.innerHTML += card;
}