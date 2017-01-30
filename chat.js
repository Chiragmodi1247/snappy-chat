
ifUserIsLoggedin(function() {
//  console.log(window.currentUser);
  updateUserData();

loadUser(function(users) {
    var usersList = "";

    for(var uid in users){
      var user = users[uid];

      if(window.currentUser.id != uid){
        usersList += renderUser(user);
      }
  }

    getElement("members").innerHTML = usersList;

  });

  onClickMultiple("member" ,function (element) {
      var chat_id = element.id;

      var database = firebase.database();
      var usersRef = database.ref("users");

      usersRef.on('value', function(snapshot) {
          var users = snapshot.val();

          for (var uid in users) {
              var user = users[uid];

              //if (window.currentUser.id != uid)
                  //for (var uid in users) {
                    //  var user = users[uid];

                      //if (chat_id == uid+""+window.currentUser.id)
                      //UName(user);
                      if(getChatId(window.currentUser.id,uid)==chat_id){
                      var ul=renderUser1(user);

                      UName(ul);
                    }
                      //  }
          }
      });

      loadMessages(chat_id,function (messages) {
          var messagesList = "";

        for(var uid in messages){
          var message = messages[uid];

            messagesList += renderMessage(message);
          }


        getElement("messages").innerHTML = messagesList;

      });

      getElement("chat-id").value = chat_id;

  });


  click("send-button" , function() {
    var text = getElement("message-text").value;
    var chat_id = getElement("chat-id").value;
    sendMessage(chat_id,text);

  });

});
