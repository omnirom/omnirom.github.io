import { siteURL, container } from '../../js/const.js'

const rawURL = 'https://raw.githubusercontent.com/omnirom/omnirom.github.io/master/config/supporters.txt'
var supportersList = []

class SupportersView {

  constructor() {
  }

  async loadFromFile() {
    try {
      await axios.get(rawURL).then(function (response) {
        supportersList = response.data.split(/\r?\n/)
      });
    } catch (error) {
      console.error(error);
    }
  }

  async displayView() {
    try {
      await this.loadFromFile()
      let pageContent = await axios
        .get(siteURL + 'views/supporters/supporters.html');
      let supportersView = pageContent.data;
      var tempObject = document.createElement('div');
      tempObject.innerHTML = supportersView;
      var devicesContainer = tempObject.querySelector('#supporters-list')

      supportersList.forEach(supporter => {
        if (supporter.length != 0) {
          const row = `
        <li>
          ${supporter}
        </li> `;
          devicesContainer.innerHTML += row

        }
      })
      container.innerHTML = tempObject.innerHTML
    } catch (error) {
      console.log("display supporters view error: " + error);
    }
  }
}

export default SupportersView = new SupportersView();