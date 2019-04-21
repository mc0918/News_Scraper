$(".article__title").on("click", function() {
  //$("#comments").empty() //un-comment this when comment part is made
  var thisId = $(this).attr("data-id");

  $.get({ url: `/articles/${thisId}` }).then(data => {
    console.log(data);
  });
});
