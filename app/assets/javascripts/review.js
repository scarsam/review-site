// Storing all my review objects
let reviewsStore = [];

// Review class constructor with some prototype methods to append content to DOM
class Review {
  constructor(id, title, description, rating) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.rating = rating;
  }
  // Appending reviews and attaching click event to load the show page
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
  // Appending review to show page
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
// Get request to get all reviews from the index action
function getReviews() {
  $.get('/reviews', function(response) {
    response.forEach(function(review) {
      if (isNewReview(review)) {createReviews(review)}
    });
  })
}
// Get request to get a single review from the show action
function getReview(id) {
  $.get('/reviews/' + id, function(response) {
    let findReview = reviewsStore.find(review => review.id === response.id);
    findReview.appendReview()
  })
}
// Check if review is already in the store, if so return false
function isNewReview(review) {
  return !reviewsStore.some(existingReview => existingReview.id === review.id)
}
// Function to instantiate a new review based on request response
// Push that review to the store and append it to the DOM
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

