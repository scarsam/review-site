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
  $('#write-reviews').click(function(e) {
    e.preventDefault();
  });

  $('.close').click(function(e) {
    e.preventDefault();
    closeWindow(this);
  })
}

function closeWindow(window) {
  $(window).parents('div.content-container').removeClass('show');
}