// Document ready jQuery syntax
$(function() {
  // Attaching event listeners on document ready
  attachListeners()
});

function attachListeners() {
  // Prevent event default and send clicked element to the expandWindow function
  $('#read-reviews').click(function(e) {
    e.preventDefault();
    expandWindow(this.parentElement.nextElementSibling);
    getReviews();
  });

  // Prevent event default and send clicked element to the expandWindow function
  $('#write-reviews').click(function(e) {
    e.preventDefault();
    expandWindow(this.parentElement.previousElementSibling);
  });
}
// Add classes on click to container div and anchor inside div
function expandWindow(object) {
  $(object).find('a').addClass('animate-text');
  $(object).addClass('animate-div');
}

function getReviews() {
  $.get('/reviews', function(response) {
    response.forEach(function(review) {
      let newReview = new Review(review['title'], review['description'], review['rating'])
      debugger;
    });
  })
}

class Review {
  constructor(title, description, rating) {
    this.title = title;
    this.description = description;
    this.rating = rating;
  }
}