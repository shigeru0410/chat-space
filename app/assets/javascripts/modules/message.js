$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="middle-items" data-message-id=${message.id}>
          <div class="middle-items__info">
            <div class="middle-items__info__name">
              ${message.user_name}
            </div>
            <div class="middle-items__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="middle-items__message">
            <p class="middle-items__message__text">
              ${message.content}
            </p>
            <img class="middle-items__message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="middle-items" data-message-id=${message.id}>
        <div class="middle-items__info">
          <div class="middle-items__info__name">
            ${message.user_name}
          </div>
          <div class="middle-items__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="middle-items__message">
          <p class="middle-items__message__text">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.bottom-items').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.bottom-items__submitbtn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});