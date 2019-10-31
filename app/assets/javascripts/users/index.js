document.addEventListener('turbolinks:load', function(){

  function appendUser(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
              </div>`;
  $("#user-search-result").append(html);               
  }
  function appendNoUser(user){
  var html =  `<div class='chat-group-user clearfix'>
                  <p class="chat-group-user__name">${ user }</p></div>`
  $("#user-search-result").append(html);
  }
  function  addUser(id,name){
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${id}'> 
              <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>`
    $("#chat-group-users").append(html)
    console.log("ok");
  }

  $('#user-search-field').on("keyup", function(e) {
    e.preventDefault();
    var input = $('#user-search-field').val()
    // console.log(input);
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
          // console.log(input);
        });
      }
      else {
        appendNoUser("一致するユーザはいません");
      }
    })
    .fail(function() {
      alert('error');
    })
  });
  $("#user-search-result").on('click', ".user-search-add", function(e) {
    e.preventDefault();
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
      addUser(id,name);
    $(this).parent().remove();

  });
  $("#chat-group-users").on("click", ".user-search-remove", function(e){
    e.preventDefault();
    $(this).parent().remove();
  });
});