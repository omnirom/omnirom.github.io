import { siteURL, container, showSpinner } from '../../js/const.js'

var devicesList = []
const gerritURL = 'https://gerrit.omnirom.org'
const githubAPIURL = 'https://api.github.com'
const rawURL = 'https://raw.githubusercontent.com/omnirom/'
var currentVersion = 'android-15'
var branchMapping = {
  'android-13_0': 'android-13.0',
  'android-14_0': 'android-14.0',
  'android-15_0': 'android-15'
}

class DevicesView {

  async loadGithubReposFromGerrit() {
    try {
      let url = gerritURL + "/projects/?b=" + currentVersion + "&p=android_device";
      let response = await axios.get(url, {});
      let magic = ")]}'";
      let repos = response.data.substring(magic.length);
      let s = await JSON.parse(repos);

      this.loadDevice(s);

    } catch (error) {
      console.log("loadGithubRepos error " + error);
    }
  }

  async loadGithubReposFromGithub() {
    try {
      // TODO filter for branch
      let url = githubAPIURL + "/search/repositories?q=android_device+owner:omnirom";
      console.log(url);
      let response = await axios.get(url, {});
      let s = response.data;
      console.log(s["items"])
      var repo_dict = {};
      for (var r in s["items"]) {
        repo_dict.set(r["name"], 1)
      }
      console.log("loadGithubReposFromGithub repo_dict " + repo_dict);
      this.loadDevice(repo_dict);

    } catch (error) {
      console.log("loadGithubRepos error " + error);
    }
  }
  async loadDevice(devices) {
    var requests = Object.keys(devices).map(repo => axios.get(rawURL + repo + "/" + currentVersion + "/meta/config.json"));
    await Promise.allSettled(requests).then(results => {
      results.forEach(result => {
        if (result.value) {
          if (Array.isArray(result.value.data)) {
            result.value.data.forEach(device => {
              let d = device;
              let url = result.value.config.url
              d['image'] = url.split("meta/")[0] + "/" + d['image'];
              d['changelog'] = gerritURL + "/q/project:" + url.split("/")[4] + "+status:merged"
              devicesList.push(d)
            })

          } else {
            let d = result.value.data;
            let url = result.value.config.url
            d['image'] = url.split("meta/")[0] + "/" + d['image'];
            d['changelog'] = gerritURL + "/q/project:" + url.split("/")[4] + "+status:merged"
            devicesList.push(d)
          }
        }
      })
      showSpinner(false);
      this.showDevices();
    });
  }

  async showDevices() {
    let pageContent = await axios
      .get(siteURL + 'views/devices/devices.html');
    let devicesView = pageContent.data;
    var tempObject = document.createElement('div');
    tempObject.innerHTML = devicesView;
    var devicesContainer = tempObject.querySelector('#device-list')

    devicesList.forEach(device => {
      if (device['readme']) {
        const card = `
        <div class="card device-card col-lg-3 col-md-4 col-sm-5">
          <img src="${device['image']}" class="card-img-top" alt="${device['model']}" >
          <div class="card-body">
            <h5 class="card-title">${device['model']}</h5>
            <p class="card-text">
              ${device['make']}<br>
              ${device['state']}
              <a href="${device['readme']}" target="_blank" class="btn btn-omni">Readme</a>
            </p>
            <a href="${device['pageUrl']}" target="_blank" class="btn btn-omni">Download</a>
            <a href="${device['changelog']}" target="_blank" class="btn btn-omni">Changelog</a>
          </div>
        </div> `;
        devicesContainer.innerHTML += card
      } else {
        const card = `
        <div class="card device-card col-lg-3 col-md-4 col-sm-5">
          <img src="${device['image']}" class="card-img-top" alt="${device['model']}" >
          <div class="card-body">
            <h5 class="card-title">${device['model']}</h5>
            <p class="card-text">${device['make']}<br>${device['state']}</p>
            <a href="${device['pageUrl']}" target="_blank" class="btn btn-omni">Download</a>
            <a href="${device['changelog']}" target="_blank" class="btn btn-omni">Changelog</a>
          </div>
        </div> `;
        devicesContainer.innerHTML += card
      }
    })

    for(var version in branchMapping) {
      var branch = branchMapping[version];
      if (branch === currentVersion) {
        let activeButton = tempObject.querySelector('#' + version)
        activeButton.classList.add("btn-dark");
        break
      }
    }

    container.innerHTML = tempObject.innerHTML
  }

  async displayView(hash) {
    try {
      if (hash) {
        let androidVersionId = hash.split("/")[1]
        let androidVersion = branchMapping[androidVersionId]
        if (androidVersion !== currentVersion) {
          currentVersion = androidVersion
        }
      }

      devicesList = []
      showSpinner(true);
      let d = {};
      d['model'] = "All Devices";
      d['make'] = "All Manufactures";
      d['state'] = "official";
      d['pageUrl'] = "https://dl.omnirom.org/";
      d['image'] = "/images/default_phone_omni.png";
      d['changelog'] = gerritURL + "/q/status:merged+android_device"
      devicesList.push(d)
      await this.loadGithubReposFromGithub();
    } catch (error) {
      console.log("display device view error: " + error);
    }
  }
}

export default DevicesView = new DevicesView();
