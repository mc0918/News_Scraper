$(".article__title").on("click", function() {
  //   //$("#comments").empty() //un-comment this when comment part is made
  var thisId = $(this).attr("data-id");

  $.get({ url: `/articles/${thisId}` }).then(data => {
    console.log(data);
    $("#submit").removeAttr("data-id");
    $("#submit").attr("data-id", data._id);
    //     $("#comments").append("<input id='title-input' name='title' ");
    //     $("#comments").append("<textarea id='body-input' name='body'></textarea>");
    //     $("#comments").append(
    //       "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
    //     );

    if (data.comment) {
      // Place the title of the comment in the title input
      $("#recipient-name").val(data.comment.title);
      // Place the body of the comment in the body textarea
      $("#message-text").val(data.comment.body);
    }

    $("#submit").on("click", function() {
      console.log($("#message-text").val());

      var thisId = $(this).attr("data-id");
      //========post route to change note=====================================
      // Run a POST request to change the note, using what's entered in the inputs
      $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          // Value taken from title input
          title: $("#recipient-name").val(),
          // Value taken from note textarea
          body: $("#message-text").val()
        }
      })
        // With that done
        .then(function(data) {
          // Log the response
          console.log(data);
          // close modal?
        });

      // Also, remove the values entered in the input and textarea for note entry
      $("#recipient-name").val("");
      $("#message-text").val("");
      //========post route to change note=====================================
    });
  });

  $("#exampleModal").on("show.bs.modal", function(event) {
    console.log("click");
    var button = $(event.relatedTarget);
    var recipient = button.data($(".article__title").attr("data-id"));
    var modal = $(this);
    debugger;
    //modal.find(".modal-title").text("New message to " + recipient);
    //modal.find(".modal-body input").val(recipient);
  });
});

// $("#submit").on("click", function() {
//   console.log($("#message-text").val());
// });
