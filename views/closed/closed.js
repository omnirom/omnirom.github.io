import { siteURL, container } from '../../js/const.js'

class ClosedView {

  constructor() {
  }

  async displayView() {
    try {
      let pageContent = await axios
        .get(siteURL + 'views/closed/closed.html');
      let post = await pageContent.data;
      container.innerHTML = post
    } catch (error) {
      console.log("display closed view error: " + error);
    }
  }
}

export default ClosedView = new ClosedView();