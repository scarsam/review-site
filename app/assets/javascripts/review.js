// Storing all my review objects
let reviewsStore = [];

// Review class constructor with some prototype methods to append content to DOM
class Review {
  constructor(id, title, description, rating, created, author) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.created = created;
    this.author = author;
  }
  // Takes todays date and convert it to MS
  // Takes reviews created date and converts it to MS
  // Calculates one day in MS
  // Calculates the difference and divide it in days
  // to see how many days since last posted
  daysSinceCreated() {
    let todayMs = Date.now();
    let reviewDateMs = new Date(this.created).getTime();
    let oneDay = 24 * 60 * 60 * 1000;
    let diffDays = Math.abs(todayMs - reviewDateMs);
    return Math.round(diffDays / oneDay);
  }
  // Appending reviews and attaching click event to load the show page
  appendReviews() {
    $('.reviews')
      // Calls reviewTemplate function and pass in the object
      // which returns html with object properties
      // Bind an click event on each anchor tag that invoked getReview function and passes in the id
      .append(reviewsTemplate(this))
        .on('click', `#review-${this.id}`, function(e) {
          e.preventDefault();
          let id = $(this).data('review');
          getReview(id);
        })
  }
  // Appending review to show page by calling reviewTemplate and passing in the object
  appendReview() {
    $('.review-container .review').empty().append(reviewTemplate(this))
      .on('click', `#author-${this.id}`, function(e) {
        e.preventDefault();
        let id = $(this).data('author');
        getAuthorReviews(id);
      });
    $('.author-reviews-container').removeClass('show');
    $('.review-container').addClass('show');
  }
  appendAuthorReviews() {
    $('.author-reviews').append(reviewsTemplate(this));
    $('.review-container').removeClass('show');
    $('.author-reviews-container').addClass('show');
  }
}

function submitReview(values) {
  $.post('/reviews', values).done(function(response) {
    createReview(response);
    $('form')[0].reset();
    $('form .btn').removeAttr('disabled');
  })
}

function getAuthorReviews(id) {
  let reviews = reviewsStore.filter(review => review.author.id === id);
  $('.author-reviews').empty();
  reviews.forEach(function(review) {
    review.appendAuthorReviews();
  })
}

// Get request to get all reviews from the index action
function getReviews() {
  $.get('/reviews', function(response) {
    response.forEach(function(review) {
      if (isNewReview(review)) {createReview(review)}
    });
  })
}

// Get request to get a single review from the show action
function getReview(id) {
  $.get('/reviews/' + id, function(response) {
    let reviewFromStore = reviewsStore.find(review => review.id === response.id);
    reviewFromStore.appendReview();
  })
}

// Check if review is already in the store, if so return false
function isNewReview(review) {
  return !reviewsStore.some(existingReview => existingReview.id === review.id)
}

// Function to instantiate a new review based on request response
// Push that review to the store and append it to the DOM
function createReview(review) {
  let reviewObject = new Review(
    review['id'],
    review['title'],
    review['description'],
    review['rating'],
    review['created_at'],
    review['author']
  );
  reviewsStore.push(reviewObject);
  reviewObject.appendReviews();
}

// HTML template for reviews
function reviewsTemplate(object) {
  return $.parseHTML(`
    <a href="#" data-review="${object.id}" id="review-${object.id}" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${object.title} - ${object.rating}</h5>
      <small>Posted ${object.daysSinceCreated()} day(s) ago</small>
    </div>
      <p class="mb-1">${object.description}</p>
      <small>Posted by: ${object.author.name}</small>
    </a>
  `)
}

// HTML template for review
function reviewTemplate(object) {
  return $.parseHTML(`
    <div class="d-flex w-100">
      <h5 class="mb-1">${object.title} - ${object.rating}</h5>
      <small>Posted ${object.daysSinceCreated()} day(s) ago</small>
      <p class="mb-1">${object.description}</p>
      <small>Posted by: <a href="#" id="author-${object.author.id}" data-author="${object.author.id}">${object.author.name}</a></small>
    </div>
  `)
}
