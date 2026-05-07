import aboutView from '../views/about/about.js'
import contactView from '../views/contact/contact.js'
import devicesView from '../views/devices/devices.js'
import screenshotsView from '../views/screenshots/screenshots.js'
import blogView from '../views/blog/blog.js'
import donationView from '../views/donation/donation.js'
import supportersView from '../views/supporters/supporters.js'
import closedView from '../views/closed/closed.js'

class Router {
  get routes() {
    return {
      '': closedView,
      '#about': aboutView,
      '#contact': contactView,
      '#devices': devicesView,
      '#screenshots': screenshotsView,
      '#blog' : blogView,
      '#donation': donationView,
      '#supporters' : supportersView,
      '#closed': closedView,
    };
  };
}

export default Router = new Router();