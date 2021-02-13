import Router from './router.js'

var navLinks = document.querySelectorAll(".nav-link");
handleRoute(window.location.hash)

window.onpopstate = () => {
	handleRoute(window.location.hash)
	window.history.pushState(
		{},
		destination,
		window.location.origin + window.location.hash
	)
}

function handleRoute(destination) {
	manageActiveLink(destination)
	let currentRouter = Object.keys(Router.routes)
		.filter(route =>
			route !== "" && destination.includes(route))

	if (destination.includes('/')) {
		Router.routes[currentRouter].displayView(destination)
	} else {
		Router.routes[currentRouter].displayView()
	}
}

function manageActiveLink(hash) {
	navLinks.forEach(lnk => {
		lnk.classList.remove("active")
		if (lnk.href.includes(hash)) {
			lnk.classList.add("active")
		}
	})
}