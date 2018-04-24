// Document ready jQuery syntax
$(function() {
  // Attaching event listeners on document ready
  attachListeners()
});

function attachListeners() {
  // Prevent event default and send clicked element to the expandWindow function
  $('#read-reviews').click(function(e) {
    e.preventDefault();
    slideWindow(this, this.parentElement.nextElementSibling);
    getReviews();
  });

  // Prevent event default and send clicked element to the expandWindow function
  $('#write-reviews').click(function(e) {
    e.preventDefault();
    slideWindow(this, this.parentElement.previousElementSibling);
  });
}
// Add classes on click to container div and anchor inside div
function slideWindow(mainObject, siblingObject) {
  $(mainObject).addClass('animate-text');
  $(siblingObject).addClass('animate-text');
  $('.content').animate({
    left: '0%'
  }, 1500)
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

