$(".article__title").on("click", function() {
  var thisId = $(this).attr("data-id");

  $.get({ url: `/articles/${thisId}` }).then(data => {
    console.log("DATA:", data);
    $("#submit").removeAttr("data-id");
    $(".commentSection").empty();

    $("#submit").attr("data-id", data._id);
    var commentBody = data.comment.body;
    var commentTitle = data.comment.title;

    var title = $("<p>").html(`<b>${commentTitle}</b> <br/>`);
    var comment = $("<p>").html(commentBody + "<br/>");
    $(".commentSection").append(title, comment);

    // for (i = 0; i < data.comment.length; i++) {
    //   console.log(data.comment[i]);
    //   $.get({ url: `articles/comments/${data.comment[i]}` }).then(data => {
    //     $("#commentSection").append(data);
    //   });
    // }
  });

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
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#recipient-name").val("");
    $("#message-text").val("");

    //========post route to change note=====================================
  });

  $("#exampleModal").on("show.bs.modal", function(event) {
    console.log("click");
    var button = $(event.relatedTarget);
    var recipient = button.data($(".article__title").attr("data-id"));
    var modal = $(this);
    debugger;
  });
});
