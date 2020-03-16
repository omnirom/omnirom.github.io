import { siteURL, container } from '../../js/const.js'

var postsList = []

class BlogView {

  async buildBlogList() {

    let response = await axios.get("https://api.github.com/repos/omnirom/omnirom.github.io/contents/blog")
    let files = response.data.reverse();
    for (var i = 0; i < files.length; i++) {
      await this.loadBlogPost(files[i]['download_url'])
    }
  }

  async loadBlogPost(url) {
    try {
      let response = await axios.get(url);
      await this.addBlogPost(response.data, url);
    } catch (error) {
      console.log("loadBlogPost error: " + url);
    }
  }

  async addBlogPost(post, url) {
    let image = post['image'];
    if (image == null) {
      image = "/images/omnirom_logo.png";
    } else {
      if (!image.startsWith("http")) {
        let urlHead = url.substring(0, url.lastIndexOf('/') + 1);
        image = urlHead + image;
      }
    }
    post['image'] = image
    postsList.push(post)
  }

  async displayView() {
    try {
      let pageContent = await axios
        .get(siteURL + 'views/blog/blog.html');
      let postView = await pageContent.data;
      var tempObject = document.createElement('div');
      tempObject.innerHTML = postView;
      var postsContainer = tempObject.querySelector('#post-list')
      
      if (postsList.length === 0) {
        await this.buildBlogList();
      }

      postsList.forEach(post => {
        const postItem = `
        <div class="post">
          <div class="post-header" >
           <img src="${post['image']}" class="post-image vertical-center" />
            <p class="post-title vertical-center" >
                ${post['title']}
            </p>
          </div>
          <p class="post-text">
            ${post['content']}
          </p>
          <p class="post-meta">Posted by ${post['writer']} on ${post['date']}</p>
        </div> `
          postsContainer.innerHTML += postItem
      })

      container.innerHTML = tempObject.innerHTML
      
    } catch (error) {
      console.log("display blog view error: " + error);
    }
  }
}

export default BlogView = new BlogView();