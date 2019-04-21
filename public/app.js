$(".article__title").on("click", function() {
  //$("#comments").empty() //un-comment this when comment part is made
  var thisId = $(this).attr("data-id");

  $.get({ url: `/articles/${thisId}` }).then(data => {
    console.log(data);
    $("#comments").append("<input id='title-input' name='title' ");
    $("#comments").append("<textarea id='body-input' name='body'></textarea>");
  });
});

$("#exampleModal").on("show.bs.modal", event => {
  var button = $(event.relatedTarget);
  var recipient = button.data("test");
  var modal = $(this);
  modal.find(".modal-title").text("New message to " + recipient);
  modal.find(".modal-body input").val(recipient);
});
