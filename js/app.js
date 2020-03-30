import Router from './router.js'

var navLinks = document.querySelectorAll(".nav-link");
let currentRouter = Router.routes[window.location.hash];
currentRouter.displayView();

if (window.location.hash) {
	console.log(window.location.hash)
	manageActiveLink(window.location.hash)
}

navLinks.forEach(link => {
	let destination = link.href
	if (destination) {
		link.onclick = function () {
			manageActiveLink(destination)
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

function manageActiveLink(hash) {
	navLinks.forEach(lnk => {
		lnk.classList.remove("active")
		if (lnk.href.includes(hash)) {
			lnk.classList.add("active")
		}
	})
}