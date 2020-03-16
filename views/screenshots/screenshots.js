import { siteURL, container } from '../../js/const.js'

var screenshotsList = []

class ScreenshotsView {

  async buildScreenshotList() {
    let response = await axios.get("https://api.github.com/repos/omnirom/omnirom.github.io/contents/screenshots")
    let files = response.data;
    await files.forEach(async file => {
      let url = file['download_url'];
      let ext = file['path'].split('.').pop();
      if (ext == "png" || ext == "jpg") {
        screenshotsList.push(url)
      }
    });
  }

  async displayView() {
    try {
      let pageContent = await axios
        .get(siteURL + 'views/screenshots/screenshots.html');
      let screenshotsView = await pageContent.data;
      var tempObject = document.createElement('div');
      tempObject.innerHTML = screenshotsView;
      var screenContainer = tempObject.querySelector('#screenshot-list')

      if (screenshotsList.length === 0) {
        await this.buildScreenshotList();
      }

      screenshotsList.forEach(screenshot => {
        const card = `
        <div class="card" style="width: 18rem;">
            <img src="${screenshot}" class="card-img-top" width="200" alt="Screenshot" >
          </div>  `;
        screenContainer.innerHTML += card
      })
      container.innerHTML = tempObject.innerHTML
    } catch (error) {
      console.log("display screenshots view error: " + error);
    }
  }
}

export default ScreenshotsView = new ScreenshotsView();