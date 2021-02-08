import { siteURL, container, showSpinner } from '../../js/const.js'

var devicesList = []
const gerritURL = 'https://gerrit.omnirom.org'
const rawURL = 'https://raw.githubusercontent.com/omnirom/'

class DevicesView {

  async loadGithubRepos(branch) {
    try {
      let response = await axios
        .get(gerritURL + "/projects/?b=" + branch + "&p=android_device", {
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
    var requests = Object.keys(devices).map(repo => axios.get(rawURL + repo + "/android-10/meta/config.json"));
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
      <div class="card device-card" style="width: 18rem;">
          <img src="${device['image']}" class="card-img-top" width="250" alt="${device['model']}" >
          <div class="card-body">
            <h5 class="card-title">${device['model']}</h5>
            <p class="card-text">${device['make']}<br>${device['state']}</p>
            <a href="${device['pageUrl']}" target="_blank" class="btn btn-omni">Download</a>
            <a href="${device['changelog']}" target="_blank" class="btn btn-omni">Changelog</a>
          </div>
        </div> `;
      devicesContainer.innerHTML += card
    })

    container.innerHTML = tempObject.innerHTML
  }

  async displayView() {
    try {
      if (devicesList.length === 0) {
        showSpinner(true);
        let d = {};
        d['model'] = "All Devices";
        d['make'] = "All Manufactures";
        d['state'] = "official";
        d['pageUrl'] = "https://dl.omnirom.org/";
        d['image'] = "/images/default_phone_omni.png";
        d['changelog'] = gerritURL + "/q/status:merged+android_device"
        devicesList.push(d)
        await this.loadGithubRepos('android-10');
      } else {
        this.showDevices()
      }

    } catch (error) {
      console.log("display device view error: " + error);
    }
  }
}

export default DevicesView = new DevicesView();
