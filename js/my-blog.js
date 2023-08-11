let dataBlog = [];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let image = document.getElementById("input-blog-image").files;
  let dateStart = document.getElementById("date-input-start").value;
  let dateEnd = document.getElementById("date-input-end").value;

  image = URL.createObjectURL(image[0]);
  console.log(image);

  let blog = {
    title,
    dateStart,
    dateEnd,
    content,
    image,
  };

  dataBlog.push(blog);
  console.log(dataBlog);

  renderBlog();
}

function renderBlog() {
  document.getElementById("contents").innerHTML = "";

  for (let index = 0; index < dataBlog.length; index++) {
    console.log(dataBlog[index]);

    document.getElementById("contents").innerHTML += `
    <div class="blog-list-item">
    <div class="blog-image">
      <img src="${dataBlog[index].image}" alt="" />
    </div>
    <h1>
      <a href="blog-detail.html" target="_blank">${dataBlog[index].title}</a>
    </h1>
    <div class="detail-blog-content">${dataBlog[index].dateStart} | ${dataBlog[index].dateEnd}</div>
    <p>
    ${dataBlog[index].content}
    </p>
    <div class="tec-icon">
            <h6><i class="fa-brands fa-android"></i></h6>
            <h6><i class="fa-solid fa-mug-saucer"></i></h6>
            <h6><i class="fa-solid fa-camera-retro"></i></h6>
          </div>
    <div class="btn-group">
      <button class="btn-edit">Edit Post</button>
      <button class="btn-post">Delete Post</button>
    </div>
  </div>
    `;
  }
}
