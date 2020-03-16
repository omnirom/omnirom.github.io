import { siteURL, container } from '../../js/const.js'

class AboutView {

  constructor() {
  }

  async displayView() {
    try {
      let pageContent = await axios
        .get(siteURL + 'views/about/about.html');
      let post = await pageContent.data;
      container.innerHTML = post
    } catch (error) {
      console.log("display about view error: " + error);
    }
  }
}

export default AboutView = new AboutView();