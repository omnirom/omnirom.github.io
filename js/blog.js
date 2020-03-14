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

async function buildBlogList() {
  let container = document.getElementById("sub-container");
  const blog = `
  <div class="col-lg-10 mx-auto">
    <h2>Blog</h2>
    <div class="row" id="post-list">
    </div>
  </div> `;
  container.innerHTML = blog;
  loadJSON("https://api.github.com/repos/omnirom/omnirom.github.io/contents/blog", async function (response) {
    let files = await JSON.parse(response);
    files.reverse().forEach(file => {
      let url = file['download_url'];
      let ext = file['path'].split('.').pop();
      if (ext == "json") {
        loadBlogPost(url);
      }
    });
  });
}

async function loadBlogPost(url) {
  try {
    let response = await axios
      .get(url, {
      });
    let post = await response.data;
    addBlogPost(post, url);
  } catch (error) {
    console.log("loadBlogPost error: " + url);
  }
}
function addBlogPost(post, url) {
  let image = post['image'];
  if (image == null) {
    image = "/images/omnirom_logo.png";
  } else {
    if (!image.startsWith("http")) {
      let urlHead = url.substring(0, url.lastIndexOf('/') + 1);
      image = urlHead + image;
    }
  }
  let container = document.getElementById("post-list");
  const postItem = `
        <div class="post">
          <img src="${image}" class="float-left" width="128" alt="" />
          <div class="post-content">
          <h2 class="post-title" >
              ${post['title']}
          </h2>
          <p class="post-text">
            ${post['content']}
          </p>
          <p class="post-meta">Posted by ${post['writer']} on ${post['date']}</p>
          </div>
        </div> `
  container.innerHTML += postItem;
}
