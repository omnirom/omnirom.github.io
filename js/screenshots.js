function loadJSON(url, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, false);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function buildScreenshotList() {
  let container = document.getElementById("sub-container");
  const row = `
  <div class="col-lg-12 mx-auto">
    <h2>Screenshots</h2>
    <div class="row" id="screenshot-list">
    </div>
  </div> `;
  container.innerHTML = row;
  loadJSON("https://api.github.com/repos/omnirom/omnirom.github.io/contents/screenshots", function(response){
    let files = JSON.parse(response);
    files.forEach(file => {
      let url = file['download_url'];
      let ext = file['path'].split('.').pop();
      if (ext == "png" || ext == "jpg"){
        addScreenshot(url);
      }
    });
  });
}

function addScreenshot(image) {
  let container = document.getElementById("screenshot-list");
  const card = `
        <div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top" width="200" alt="Screenshot" >
          </div>  `;
  container.innerHTML += card;
}
