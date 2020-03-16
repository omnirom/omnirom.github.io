const container = document.getElementById("sub-container");
var spinner = document.getElementById('loading');
const siteURL = window.location.protocol + "//" + window.location.host + "/";

function showSpinner(state) {
    if (state) {
        container.innerHTML = "";
        spinner.style.visibility = "visible"
    } else {
        spinner.style.visibility = "hidden"
    }
}

export { container, siteURL, showSpinner };