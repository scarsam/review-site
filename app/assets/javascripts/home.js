// Document ready jQuery syntax
$(function() {
  // Attaching event listeners and prevent default event action on click
  function attachListeners() {
    $('#read-reviews').click(function(e) {
      e.preventDefault()
    });

    $('#write-reviews').click(function(e) {
      e.preventDefault()
    });
  }
});