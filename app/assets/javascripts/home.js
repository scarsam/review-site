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
      appendContent(review)
    });
  })
}

function appendContent(content) {
  let newReview = new Review(content['title'], content['description'], content['rating']);
  $('.row').append(
    `<div>
      <h1>${newReview.title}</h1>
      <h2>${newReview.description}</h2>
      <h3>${newReview.rating}</h3>
    </div>`
  )
}

