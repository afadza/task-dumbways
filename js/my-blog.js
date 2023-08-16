let dataBlog = [];

function addBlog(event) {
  event.preventDefault();
  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let image = document.getElementById("input-blog-image").files;
  let dateStart = document.getElementById("date-input-start").value;
  let dateEnd = document.getElementById("date-input-end").value;
  let durationStart = new Date(
    document.getElementById("date-input-start").value
  );
  let durationEnd = new Date(document.getElementById("date-input-end").value);
  let technologies = [];
  let checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      technologies.push(checkbox.nextElementSibling.textContent);
    }
  });
  let techIconsHTML = technologies.map(tech => `<span>${tech}</span>`).join('');

  let timeDiff = Math.abs(durationStart - durationEnd);
  let selisihHari = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  let hasil;

  if (selisihHari >= 30 && selisihHari < 365) {
    hasil = Math.floor(selisihHari / 30) + " bulan";
  } else if (selisihHari >= 365) {
    hasil = Math.floor(selisihHari / 365) + " tahun";
  } else {
    hasil = selisihHari + " hari";
  }

  image = URL.createObjectURL(image[0]);
  console.log(image);

  let blog = {
    title,
    dateStart,
    dateEnd,
    hasil,
    postAt: new Date(),
    content,
    image,
    technologies,
  };

  dataBlog.push(blog);
  console.log(dataBlog);

  renderBlog();
  renderTechIcons(techIconsHTML);
}

function renderTechIcons(techIconsHTML) {
  let techIconContainer = document.querySelector('.tec-icon');
  techIconContainer.innerHTML = techIconsHTML;
}

function renderBlog() {
  document.getElementById("contents").innerHTML = "";

  for (let index = 0; index < dataBlog.length; index++) {
    console.log(dataBlog[index]);

    document.getElementById("contents").innerHTML += `
    <div class="blog-list-item">
    <div class="blog-image">
      <img src="${dataBlog[index].image}" alt="" />
      <p style="font-size: 10px; color: grey">Diposting pada ${getFullTime(
        dataBlog[index].postAt
      )}</p>
    </div>
    <h1>
      <a href="blog-detail.html" target="_blank">${dataBlog[index].title}</a>
    </h1>
    <div class="detail-blog-content">${dataBlog[index].dateStart} sampai ${
      dataBlog[index].dateEnd
    }</div>
    <p style="margin-bottom: 20px;">Durasi : ${dataBlog[index].hasil}</p>
    <p>
    ${dataBlog[index].content}
    </p>
    <div class="tec-icon" style="margin-top: 10px; font-size: 10px;">${dataBlog[index].technologies}</div>
    <div class="btn-group">
      <button class="btn-edit">Edit Post</button>
      <button class="btn-post">Delete Post</button>
    </div>
  </div>
    `;
  }
}

function getFullTime(time) {
  let monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let date = time.getDate();

  let monthIndex = time.getMonth();

  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours <= 9) {
    hours = "0" + hours;
  } else if (minutes <= 9) {
    minutes = "0" + minutes;
  }
  return `${date} ${monthName[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}
