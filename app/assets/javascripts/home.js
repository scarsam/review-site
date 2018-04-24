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

  $('.close').click(function(e) {
    e.preventDefault();
    closeWindow();
  })
}
// Add classes on click to container div and anchor inside div
function slideWindow(mainObject, siblingObject) {
  $(mainObject).addClass('animate-text');
  $(siblingObject).find('a').addClass('animate-text');
  $('.content').animate({
    left: '0%'
  }, 1500)
}
// Animates content div and slides it away off the screen
function closeWindow() {
  $('.content').animate({
    left: '-100%'
  }, 1500);
  $('#write-reviews').removeClass('animate-text');
  $('#read-reviews').removeClass('animate-text');
}