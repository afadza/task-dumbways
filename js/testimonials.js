class Testimonial {
    #quote = "";
    #image = "";
  
    constructor(quote, image) {
      this.#quote = quote;
      this.#image = image;
    }
  
    get quote() {
      return this.#quote;
    }
  
    get image() {
      return this.#image;
    }
  
    get author() {
      throw new Error("getAuthor() method must be implemented.");
    }

  
    get testimonialHTML() {
      return `
          <div class="testimonial">
              <img src="${this.image}" class="profile-testimonial" />
              <p class="quote">
                  ${this.quote}
              </p>
              <p class="author">- ${this.author}</p>
          </div>
      `;
    }
  }
  
  class AuthorTestimonial extends Testimonial {
    #author = "";
  
    constructor(author, quote, image) {
      super(quote, image);
      this.#author = author;
    }
  
    get author() {
      return this.#author;
    }
  }
  
  class CompanyTestimonial extends Testimonial {
    #company = "";
  
    constructor(author, quote, image) {
      super(quote, image);
      this.#company = author;
    }
  
    get author() {
      return this.#company + " Company";
    }
  }
  
  const testimonial1 = new AuthorTestimonial(
    "Abel Dustin",
    "Mantap sekali jasanya!",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  );
  
  const testimonial2 = new AuthorTestimonial(
    "Cintara Surya",
    "Keren lah pokoknya",
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  );
  
  const testimonial3 = new AuthorTestimonial(
    "Maul",
    "Wuhu keren cuy!",
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  );
  
  const testimonial4 = new AuthorTestimonial(
    "Rangga",
    "Wuhu keren banget!",
    "image/my-img.jpg"
  );
  
  let testimonialData = [testimonial1, testimonial2, testimonial3, testimonial4];
  let testimonialHTML = "";
  
  for (let i = 0; i < testimonialData.length; i++) {
    testimonialHTML += testimonialData[i].testimonialHTML;
  }
  
  document.getElementById("testimonials").innerHTML = testimonialHTML;