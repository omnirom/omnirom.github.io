import aboutView from '../views/about/about.js'
import contactView from '../views/contact/contact.js'
import devicesView from '../views/devices/devices.js'
import screenshotsView from '../views/screenshots/screenshots.js'
import blogView from '../views/blog/blog.js'

class Router {
  get routes() {
    return {
      '': aboutView,
      '#about': aboutView,
      '#contact': contactView,
      '#devices': devicesView,
      '#screenshots': screenshotsView,
      '#blog' : blogView
    };
  };
}

export default Router = new Router();