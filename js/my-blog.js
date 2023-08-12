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

  let timeDiff = Math.abs(durationStart - durationEnd); // Match.abs() berfungsi untuk merubah format yang tadi minus atau negatif menjadi positif, jadi pada kasus ini isi dari Match.abs() adalah pengurangan antara dateEnd - dateStart.
  let selisihHari = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Match.ceil berfungsi untuk membulatkan bilangan keatas, jadi pada kasus ini Match.ceil() berfungsi untuk membagi hasil pengurangan dari timeDiff dibagi 1 hari.

  let hasil; // Ini adalah variable kosong yang akan diisi sesuai kondisi if else dibawah

  if (selisihHari >= 30 && selisihHari < 365) {
    // jika selisihHari lebih atau sama dengan dari 30
    hasil = Math.floor(selisihHari / 30) + " bulan"; // maka variable hasil berisi 30 dibagi 30 dan hasilnya adalah 1
  } else if (selisihHari >= 365) {
    hasil = Math.floor(selisihHari / 365) + " tahun";
  } else {
    hasil = selisihHari + " hari"; // tapi jika selisihHari kurang dari 30 maka variable hasil isinya adalah ini
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

function getFullTime(time) {
  // new Date() mendapatkan terkait tanggal dan waktu kapan fungsinya dijalankan
  // let time = new Date();
  // console.log(time);

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
  // console.log(monthName[0]);

  let date = time.getDate();
  // console.log(date);

  let monthIndex = time.getMonth();
  // console.log(monthIndex);
  // console.log(monthName[monthIndex]);

  let year = time.getFullYear();
  // console.log(year);

  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours <= 9) {
    // 09
    hours = "0" + hours;
  } else if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  // console.log(`${hours}:${minutes}`);

  // 11 Aug 2023 09:18 WIB
  return `${date} ${monthName[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}
