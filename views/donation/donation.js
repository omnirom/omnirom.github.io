import { siteURL, container } from '../../js/const.js'

class DonationView {

  constructor() {
  }

  async displayView() {
    try {
      let pageContent = await axios
        .get(siteURL + 'views/donation/donation.html');
      let post = await pageContent.data;
      container.innerHTML = post
    } catch (error) {
      console.log("display donation view error: " + error);
    }
  }
}

export default DonationView = new DonationView();