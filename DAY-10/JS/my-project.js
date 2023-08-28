let dataBlog = [];

function addBlog(event) {
  event.preventDefault();

  // Variable untuk mengambil value dari input.
  let projectName = document.getElementById("input-name-project").value;
  let startDate = new Date (document.getElementById("date-start").value);
  let endDate = new Date (document.getElementById("date-end").value);
  let description = document.getElementById("input-text-area").value;
  
  // Fitur checkbox
  let checkBox = document.forms["frm"].elements["checkStack"];
  let checkValue = "";

  for(i = 0; i < checkBox.length; i++) {
      if (checkBox[i].checked==true) {
          checkValue += checkBox[i].value;
      }
  }

  // Ambil image
  let image = document.getElementById("input-image").files;
  image = URL.createObjectURL(image[0]);

  // Perhitungan duration dari start date dan end date.
  let subtraction = Math.abs(startDate - endDate);
  let rounding = Math.ceil(subtraction / (1000 * 60 * 60 * 24));
  let duration;
  if (rounding >= 30 && rounding < 365) {
    duration = Math.floor(rounding / 30) + " bulan";
  } else if (rounding >= 365) {
    duration = Math.floor(rounding / 365) + " tahun";
  } else {
    duration = rounding + " hari";
  };

  // Variable object untuk di push kedalam array dataBlog
  let blog = {
    projectName,
    description,
    image,
    duration,
    checkValue,
  };

  dataBlog.push(blog);
  renderBlog();
}

function renderBlog() {
  document.getElementById("project").innerHTML = "";

  for (let index = 0; index < dataBlog.length; index++) {
    document.getElementById("project").innerHTML += `
    <div class="card" style="width: 18rem">
          <img src="${dataBlog[index].image}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title fw-bold">${dataBlog[index].projectName}</h5>
            <p style="font-size: 10px;">Durasi : ${dataBlog[index].duration}</p>
            <p class="card-text mb-4" style="font-size: 10px;">
            &emsp;${dataBlog[index].description}
            </p>
            <div class="icon mb-4 d-flex justify-content-between" style="font-size: 10px">
              ${dataBlog[index].checkValue}
            </div>
            <div class="d-flex justify-content-end">
              <a
                href="#"
                class="btn me-2 px-4"
                style="background-color: orangered; color: white"
                >edit</a
              >
              <a
                href="#"
                class="btn px-3"
                style="background-color: orangered; color: white"
                >delete</a
              >
            </div>
          </div>
        </div>
    `
  }
}
