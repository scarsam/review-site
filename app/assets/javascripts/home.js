// Document ready jQuery syntax
$(function() {
  // Attaching event listeners on document ready
  attachListeners();
  getReviews();
});

function attachListeners() {
  // Prevent event default and send clicked element to the expandWindow function
  $('.close').click(function(e) {
    e.preventDefault();
    closeWindow(this);
  });

  $('form').submit(function(e) {
    e.preventDefault();
    submitReview($(this).serialize());
  })
}

function closeWindow(window) {
  $(window).parents('div.content-container').removeClass('show');
}