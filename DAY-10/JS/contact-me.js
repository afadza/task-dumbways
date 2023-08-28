function submitData() {
    let name = document.getElementById("input-name").value;
    let email = document.getElementById("input-email").value;
    let phone = document.getElementById("input-phone").value;
    let subject = document.getElementById("input-subject").value;
    let reason = document.getElementById("input-text-area").value;
  
    if (name === "") {
      return alert("Harap masukan nama");
    } else if (email === "") {
      return alert("Harap masukan email");
    } else if (phone === "") {
      return alert("Harap masukan no HP");
    } else if (subject === "") {
      return alert("Harap pilih subject");
    } else if (reason === "") {
      return alert("Harap masukan alasanmu");
    }
  
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(subject);
    console.log(reason);
  
    let emailReceiver = "arya.skoba@gmail.com";
    let a = document.createElement("a");
    a.href = `mailto:${emailReceiver}?stack=${stack}&body=Halo, nama saya ${name}, ${reason}, silakan kontak saya pada nomor ${phone}`;
    a.click();
  }
  