import { siteURL, container, showSpinner } from '../../js/const.js'

var devicesList = []

class DevicesView {

  async loadGithubRepos(branch) {
    try {
      let response = await axios
        .get("https://gerrit.omnirom.org/projects/?b=" + branch + "&p=android_device", {
        });

      let magic = ")]}'";
      let repos = response.data.substring(magic.length);
      let s = await JSON.parse(repos);

      for (var repo in s) {
        let url = "https://raw.githubusercontent.com/omnirom/" + repo + "/android-10";
        await this.loadDevice(url);
      }
    } catch (error) {
      console.log("loadGithubRepos error");
    }
  }

  async loadDevice(url) {
    try {
      let response = await axios
        .get(url + "/meta/config.json", {
        });
      let device = await response.data;
      let d = device;
      d['image'] = url + "/" + device['image'];
      devicesList.push(d)
    } catch (error) {
      console.log("loadDevice error: " + url);
    }
  }

  async displayView() {
    try {

      let pageContent = await axios
        .get(siteURL + 'views/devices/devices.html');
      let devicesView = await pageContent.data;
      var tempObject = document.createElement('div');
      tempObject.innerHTML = devicesView;
      var devicesContainer = tempObject.querySelector('#device-list')

      if (devicesList.length === 0) {
        showSpinner(true);
        let d = {};
        d['model'] = "All Devices";
        d['make'] = "All Manufactures";
        d['state'] = "official";
        d['pageUrl'] = "https://dl.omnirom.org/";
        d['image'] = "/images/default_phone_omni.png";
        devicesList.push(d)
        await this.loadGithubRepos('android-10');
        showSpinner(false);
      }

      devicesList.forEach(device => {
        const card = `
        <div class="card device-card" style="width: 18rem;">
            <img src="${device['image']}" class="card-img-top" width="250" alt="${device['model']}" >
            <div class="card-body">
              <h5 class="card-title">${device['model']}</h5>
              <p class="card-text">${device['make']}<br>${device['state']}</p>
              <a href="${device['pageUrl']}" target="_blank" class="btn btn-omni">Download</a>
            </div>
          </div> `;
        devicesContainer.innerHTML += card
      })

      container.innerHTML = tempObject.innerHTML
    } catch (error) {
      console.log("display device view error: " + error);
    }
  }
}

export default DevicesView = new DevicesView();