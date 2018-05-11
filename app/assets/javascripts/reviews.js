// Document ready jQuery syntax
$(function() {
  // Attaching event listeners on document ready
  // Load the welcome (Review.all) action on document ready
  attachListeners();
  getReviews();
});

// Event listeners for the nav and the form
function attachListeners() {
  // Clears the reviews before submitting a new review and calling welcome (Review.all) action
  $('form').submit(function(e) {
    e.preventDefault();
    $('.reviews').empty();
    submitReview($(this).serialize(), $('#author_id').val());
    getReviews();
  });
  $('#nav-reviews').click(function(e) {
    e.preventDefault();
    $('.reviews').empty();
    getReviews();
  });
  $('#nav-my-reviews').click(function(e) {
    let id = $(this).data('author-id');
    $('.reviews').empty();
    getAuthorReviews(id);
    e.preventDefault();
  })
}

// Reviews class constructor with some prototype methods to append content to DOM
class Reviews {
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
  // Assigns the rating property on the object (1-5) to a variable
  // Assigns the id of the object to a variable
  // Loops through the numbers of ratings it was given and appends a star for each rating
  ratingStars() {
    let num = this.rating;
    let id = this.id;
    for (let i = 0; i < num; i++) {
      $(`#review-${id} .stars`).append(starsTemplate());
    }
  }
  // Takes the created review object and appends it to the DOM
  // Calls ratingStars() method on it to attach stars
  // Attach an click even on the div to make it a link
  // The click event will take the data attribute which should be the review
  // It calls the getReview function which calls the show action
  appendReviews() {
    $('.reviews').append(reviewsTemplate(this));
    this.ratingStars();
    $(`#review-${this.id}`).on('click', function(e) {
      e.preventDefault();
      let reviewId = $(this).data('review');
      $('.reviews').empty();
      getReview(reviewId);
    });
  }
  // Takes the created review object and appends it to the DOM
  // Attach an click event to the div to make it a link
  // The click event takes the data attribute for the div which should point to the author id
  // And it calls the function index action
  appendReview() {
    $('.reviews').append(reviewTemplate(this));
    $(`.author-${this.author.id}`).on('click', function(e) {
      e.preventDefault();
      let authorId = $(this).data('author');
      $('.reviews').empty();
      getAuthorReviews(authorId);
    });
  }
}
// Takes the form string value and the author id and posts it to the create action
// Once it's been created we create an object in the front-end and appends it to the DOM
// We reset the form and remove the disable button bootstrap adds
function submitReview(values, author_id) {
  $.post(`/authors/${author_id}/reviews`, values).done(function(review) {
    let reviewObject = createReview(review);
    reviewObject.appendReviews();
    $('form')[0].reset();
    $('form .btn').removeAttr('disabled');
  });
}
// Makes an Ajax call to the index action
// Creates an object and appends it to the DOM for each object
function getAuthorReviews(id) {
  $.get('/authors/' + id + '/reviews', function(response) {
    response.forEach(function(review) {
      let reviewObject = createReview(review);
      reviewObject.appendReviews()
    });
  });
}

// Makes an Ajax call to the welcome action
// Creates an object an appends it to the DOM for each object
function getReviews() {
  $.get('/welcome', function(response) {
    response.forEach(function(review) {
      let reviewObject = createReview(review);
      reviewObject.appendReviews();
    });
  })
}

// Makes an Ajax call to the show action
// Creates an object and appends it to the DOM for each object
function getReview(id) {
  $.get('/reviews/' + id, function(review) {
    let reviewObject = createReview(review);
    reviewObject.appendReview();
  })
}

// Create review function that takes an review json and creates an new Review Object
function createReview(review) {
  return new Reviews(
    review['id'],
    review['title'],
    review['description'],
    review['rating'],
    review['created_at'],
    review['author']
  );
}

// HTML template for reviews
function reviewsTemplate(object) {
  return $.parseHTML(`
    <a href="#" data-review="${object.id}" id="review-${object.id}" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${object.title}</h5>
      <span class="stars"></span>
    </div>
      <p class="mb-1">${object.description}</p>
    <div class="d-flex w-100 justify-content-between">
      <small>Posted by: ${object.author.name}</small>
      <small>Posted ${object.daysSinceCreated()} day(s) ago</small>
    </div>
    </a>
  `)
}

// HTML template for review
function reviewTemplate(object) {
  return $.parseHTML(`
    <div class="d-flex flex-column w-100">
      <h4 class="mb-1">${object.title}</h4>
      <p class="mb-1">${object.description}</p>
      <small>Posted by: <a href="#" class="author-${object.author.id}" data-author="${object.author.id}">${object.author.name}</a></small>
    </div>
  `)
}

// HTML template for review
function starsTemplate() {
  return $.parseHTML(`
    <svg height="25" width="23" class="star rating">
      <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
    </svg>
  `)[1]
}