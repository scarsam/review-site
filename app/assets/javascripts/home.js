// Document ready jQuery syntax
$(function() {
  // Attaching event listeners on document ready
  attachListeners()
});

function attachListeners() {
  // Prevent event default and send clicked element to the expandWindow function
  $('#read-reviews').click(function(e) {
    e.preventDefault();
    getReviews();
  });

  // Prevent event default and send clicked element to the expandWindow function
  $('#write-review').click(function(e) {
    e.preventDefault();
    $('.write-review-container').addClass('show');
  });

  $('.close').click(function(e) {
    e.preventDefault();
    closeWindow(this);
  })
}

function closeWindow(window) {
  $(window).parents('div.content-container').removeClass('show');
}