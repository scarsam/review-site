let reviewsStore = [];

class Review {
  constructor(id, title, description, rating) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.rating = rating;
  }

  appendReviews() {
    $('.content .list-group').append(
      `
      <a data-review="${this.id}" id="review-${this.id}" class="review-link list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${this.title}</h5>
          <small>Posted 3 days ago</small>
        </div>
        <p class="mb-1">${this.description}</p>
        <small>${this.rating}</small>
      </a>
      `
    ).on('click', `#review-${this.id}`, function(e) {
      e.preventDefault();
      let id = $(this).data('review');
      getReview(id)
    })
  }

  appendReview() {
    $('.content').empty().append(
      `
        <div class="d-flex w-100">
          <h5 class="mb-1">${this.title}</h5>
          <small>Updated 3 days ago</small>
          <p class="mb-1">${this.description}</p>
          <small>${this.rating}</small>
        </div>
      `
    )
  }
}

function getReviews() {
  $.get('/reviews', function(response) {
    response.forEach(function(review) {
      if (isNewReview(review)) {createReviews(review)}
    });
  })
}
// this request runs wtice
function getReview(id) {
  $.get('/reviews/' + id, function(response) {
    debugger;
    let findReview = reviewsStore.find(review => review.id === response.id);
    findReview.appendReview()
  })
}

function isNewReview(review) {
  return !reviewsStore.some(existingReview => existingReview.id === review.id)
}

function createReviews(review) {
  let newReview = new Review(
    review['id'],
    review['title'],
    review['description'],
    review['rating']
  );
  reviewsStore.push(newReview);
  newReview.appendReviews();
}

