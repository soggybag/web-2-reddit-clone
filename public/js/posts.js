$(document).ready(function() {

  $('body').on('submit', '.vote-up', function(e){
    e.preventDefault();
    console.log("**********");
  });

  $('.post-vote-up').submit(function (e) {
    e.preventDefault();

    var postId = $(this).data('id');

    // $.get('/path', {a:12, b:23}, function(data){})
    // $.post('/path', {a:12}, function(data){})

    $.ajax({
      type: 'PUT',
      url: '/posts/' + postId + '/vote-up',
      success: function(data) {
        console.log("voted up!");
        console.log("New Vote count:", data);
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });

  $('.post-vote-down').submit(function (e) {
    e.preventDefault();

    var postId = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: '/posts/' + postId + '/vote-down',
      success: function(data) {
        console.log("voted down!");
        console.log("New Vote count:", data);
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });

});
