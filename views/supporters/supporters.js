import { siteURL, container } from '../../js/const.js'

class SupportersView {

  constructor() {
  }

  async displayView() {
    try {
      let pageContent = await axios
        .get(siteURL + 'views/supporters/supporters.html');
      let post = await pageContent.data;
      container.innerHTML = post
    } catch (error) {
      console.log("display supporters view error: " + error);
    }
  }
}

export default SupportersView = new SupportersView();