class Review {
  constructor(title, description, rating) {
    this.title = title;
    this.description = description;
    this.rating = rating;
  }
}

function getReviews() {
  $.get('/reviews', function(response) {
    response.forEach(function(review) {
      appendReview(review)
    });
  })
}

function appendReview(review) {
  let newReview = new Review(review['title'], review['description'], review['rating']);
  $('.content .list-group').append(
    `
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${newReview.title}</h5>
        <small>3 days ago</small>
      </div>
      <p class="mb-1">${newReview.description}</p>
      <small>${newReview.rating}</small>
    </a>
    `
  )
}

