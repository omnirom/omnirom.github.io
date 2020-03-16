import Router from './router.js'

let currentRouter = Router.routes[window.location.hash];
currentRouter.displayView();

let navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
	let destination = link.href
	if (destination) {
		link.onclick = function () {
			let currentRouter = Router.routes[destination];
			window.history.pushState(
				{},
				destination,
				window.location.origin + destination
			)
			currentRouter.displayView()
		}
	}
});

window.onpopstate = () => {
	let currentRouter = Router.routes[window.location.hash];
	currentRouter.displayView();
}
