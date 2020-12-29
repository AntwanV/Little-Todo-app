$(document).ready(function(){

  $('form').on('submit', function(){
      var item = $('form input');
      var todo = {item: item.val()};
      $.ajax({
        type: 'POST',
        url: '/',
        data: todo,
        success: function(data){
          console.log(data);
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      console.log('arr');
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
console.log('bal');
