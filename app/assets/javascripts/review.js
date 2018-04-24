let reviewIds = [];

class Review {
  constructor(id, title, description, rating) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.rating = rating;
  }

  appendReview() {
    $('.content .list-group').append(
      `
      <a href="#" data-review="${this.id}" class="review-link list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${this.title}</h5>
          <small>Updated 3 days ago</small>
        </div>
        <p class="mb-1">${this.description}</p>
        <small>${this.rating}</small>
      </a>
      `
    ).on('click', 'a', function(e) {
      e.preventDefault();
      let id = $(this).data('review');
      getReview(id)
    })
  }
}

function getReviews() {
  $.get('/reviews', function(response) {
    response.forEach(function(review) {
      if (isNewReview(review)) {createReviews(review)}
    });
  })
}

function getReview(id) {
  $.get('/reviews/' + id, function(response) {
    debugger;
  })
}

function isNewReview(review) {
  return !reviewIds.some(existingId => existingId === review.id)
}

function createReviews(review) {
  let newReview = new Review(
    review['id'],
    review['title'],
    review['description'],
    review['rating']
  );
  reviewIds.push(newReview.id);
  newReview.appendReview();
}

