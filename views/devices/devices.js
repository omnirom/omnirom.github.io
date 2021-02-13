import { siteURL, container, showSpinner } from '../../js/const.js'

var devicesList = []
const gerritURL = 'https://gerrit.omnirom.org'
const rawURL = 'https://raw.githubusercontent.com/omnirom/'
var currentVersion = 'android-11'

class DevicesView {

  async loadGithubRepos() {
    try {
      let response = await axios
        .get(gerritURL + "/projects/?b=" + currentVersion + "&p=android_device", {
        });

      let magic = ")]}'";
      let repos = response.data.substring(magic.length);
      let s = await JSON.parse(repos);

      this.loadDevice(s);

    } catch (error) {
      console.log("loadGithubRepos error");
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
    })

    let activeButton = tempObject.querySelector('#' + currentVersion)
    activeButton.classList.add("btn-dark");

    container.innerHTML = tempObject.innerHTML
  }

  async displayView(hash) {
    try {
      if (hash) {
        let androidVersion = hash.split("/")[1]
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
      await this.loadGithubRepos();
    } catch (error) {
      console.log("display device view error: " + error);
    }
  }
}

export default DevicesView = new DevicesView();
