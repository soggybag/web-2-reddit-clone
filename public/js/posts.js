
// var addTransferButtons = document.querySelector('.add-to-transfer');
// for (var i in addTransferButtons) {
//   addTransferButtons[i].onclick = function(e) {
//     // find el
//     el.classList.toggle('selected');
//   }
// }

$(document).ready(function() {
  /*
    li.record-item
      div.record-name
      a.add-to-transfer
  */

  $('body').on('click', '.add-to-transfer', function(e) {
    e.preventDefault();
    $(this).siblings('.record-name').toggleClass('selected');
  });

  // You migght also want to include the id in the hash at the end of the url
  // for the link

  $('body').on('click', 'a.add-to-transfer',function(e) {
    alert(this.hash.substr(1));
  });


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
