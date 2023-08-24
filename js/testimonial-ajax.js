const testimonial = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
  
    xhr.open("GET", "https://api.npoint.io/1f31736edb4dd34b22cd", true)
  
    xhr.onload = function () {
      if(xhr.status == 200) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject("Error Loading Data")
      }
    }
  
    xhr.onerror = function() {
      reject("Network Error")
    }
  
    xhr.send()
  })
  
  
  async function showTestimonial() {
    try {
      const response = await testimonial
      console.log(response)
  
      let testimonialForHtml = ''
  
      response.forEach((item) => {
        testimonialForHtml += `<div class="testimonial">
          <img src=${item.image} class="profile-testimonial" />
          <p class="quote">${item.quote}</p>
          <p class="author">- ${item.author}</p>
          <p class="author">${item.rating}</p>
      </div>`
      })
  
      document.getElementById("testimonials").innerHTML = testimonialForHtml
    } catch (err) {
      console.log(err)
    }   
    
  }
  showTestimonial()
  
  
  async function filterTestimonials(rating) {
    try {
      const response = await testimonial
      let testimonialForHtml = ''
  
      const dataFiltered = response.filter(function (data) {
        return data.rating === rating
      })
  
      if(dataFiltered.length === 0) {
        testimonialForHtml = `<h3>Data not found !</h3>`
      } else {
        dataFiltered.forEach((data) => {
            testimonialForHtml += `<div class="testimonial">
                <img src=${data.image} class="profile-testimonial" />
                <p class="quote">${data.quote}</p>
                <p class="author">- ${data.author}</p>
                <p class="author">${data.rating}</p>
            </div>`
        })
    }
  
    document.getElementById("testimonials").innerHTML = testimonialForHtml
    } catch (err) {
      console.log(err)
    }
    
  }