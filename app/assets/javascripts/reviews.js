// Document ready jQuery syntax
$(function() {
  // Attaching event listeners on document ready
  attachListeners();
  getReviews();
});

function attachListeners() {
  $('form').submit(function(e) {
    e.preventDefault();
    $('.reviews').empty();
    getReviews();
    submitReview($(this).serialize(), $('#author_id').val());
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
  appendReviews() {
    $('.reviews').append(reviewsTemplate(this));
    $(`#review-${this.id}`).on('click', function(e) {
      e.preventDefault();
      let reviewId = $(this).data('review');
      $('.reviews').empty();
      getReview(reviewId);
    });
  }
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

function submitReview(values, author_id) {
  $.post(`/authors/${author_id}/reviews`, values).done(function(review) {
    let reviewObject = createReview(review);
    reviewObject.appendReviews();
    $('form')[0].reset();
    $('form .btn').removeAttr('disabled');
  })
}

function getAuthorReviews(id) {
  $.get('/authors/' + id + '/reviews', function(response) {
    response.forEach(function(review) {
      let reviewObject = createReview(review);
      reviewObject.appendReviews()
    });
  });
}

function getReviews() {
  $.get('/welcome', function(response) {
    response.forEach(function(review) {
      let reviewObject = createReview(review);
      reviewObject.appendReviews();
    });
  })
}

function getReview(id) {
  $.get('/reviews/' + id, function(review) {
    let reviewObject = createReview(review);
    reviewObject.appendReview();
  })
}

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
    <div class="d-flex flex-column w-100">
      <h4 class="mb-1">${object.title} - ${object.rating}</h4>
      <p class="mb-1">${object.description}</p>
      <small>Posted by: <a href="#" class="author-${object.author.id}" data-author="${object.author.id}">${object.author.name}</a></small>
    </div>
  `)
}