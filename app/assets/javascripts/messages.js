$(function(){
  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      var html =`<div class="message" data-message-id='${message.id}'>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${ message.user_name }
                      </div>
                      <div class="upper-message__date">
                        ${ message.time }
                      </div>
                    </div>
                    <div class="lower-message">
                      <div class="lower-message__content">
                          ${ message.content }    
                      </div>
                      <div class="lower-message__image">
                        <img src='${ message.image}'
                      </div>
                    </div>
                　</div>`
    } else if (message.content) {
      var html =`<div class="message" data-message-id='${message.id}'>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${ message.user_name }
                      </div>
                      <div class="upper-message__date">
                        ${ message.time }
                      </div>
                    </div>
                    <div class="lower-message">
                      <div class="lower-message__content">
                          ${ message.content }    
                      </div>
                    </div>
              　  </div>`
    }else if (message.image.url) {
      
      var html =`<div class="message" data-message-id='${message.id}'>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${ message.user_name }
                      </div>
                      <div class="upper-message__date">
                        ${ message.time }
                      </div>
                    </div>
                    <div class="lower-message">
                      <div class="lower-message__content">
                          ${ message.content }    
                      </div>
                      <div class="lower-message__image">
                        <img src='${ message.image }'
                      </div>
                    </div>
                  </div>`
    };
    return html;
  };

  var reloadMessages = function() {
    
    last_message_id = $('.message:last').data('id');
    $.ajax({
      url: "api/messages#index",
      type: 'Get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      var html ='';
      messages.forEach(function(message) {
        html = buildMessageHTML(message);
      $(".messages").append(html);
      scrollBottom();
      })
    })
    .fail(function() {
      aleat('自動更新に失敗しました');
    });
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessageHTML(message);
      $('.messages').append(html)
      $("#new_message")[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  })
   setInterval(reloadMessages, 5000);
});