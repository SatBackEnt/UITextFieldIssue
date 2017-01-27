


var userData = {
    _user_id : "",
    _first_name : "",
    _last_name : "",
    _username : "",
    _password : "",
    _created : "",
    _birthday : "",
    _street_address_1 : "",
    _street_address_2 : "",
    _city : "",
    _state : "",
    _country : "",
    _zipcode : "",
    _phone_number : ""
};

var userKeys = {
    user_id : "users_id",
    first_name : "",
    last_name : "",
    username : "",
    password : "",
    created : "",
    birthday : "",
    street_address_1 : "",
    street_address_2 : "",
    city : "",
    state : "",
    country : "",
    zipcode : "",
    phone_number : ""
};


saveUserData: function()
{
    //Handle for quick access to Cocos2D's implementation of Local Storage:
    var ls = cc.sys.localStorage;

    var value = userData; 
    var key  = "UserDataLocal_Key";

    //This should save value  on key on Local Storage
    ls.setItem(key, value);

    //This should read the content associated with key from Local Storage:
    var data = ls.getItem(key);

    cc.log(data); //Should output  to the console.
}

loadUserData: function()
{
    //Handle for quick access to Cocos2D's implementation of Local Storage:
    var ls = cc.sys.localStorage;
    var key  = "UserDataLocal_Key";
    //This should read the content associated with key from Local Storage:
    var data = ls.getItem(key);
    cc.log(data); //Should output  to the console.
    
    userData = data ;
    
}

//    `users_id`, 
//    `first_name`, 
//    `last_name`, 
//    `birthday`, 
//    `street_address_1`, 
//    `street_address_2`, 
//    `city`, 
//    `state`, 
//    `country`, 
//    `zipcode`, 
//    `phone_number`, 
//    `username`, 
//    `password`, 
//    `created`

//`users`.`users_id`, `users`.`first_name`, `users`.`last_name`, `users`.`birthday`, `users`.`street_address_1`, `users`.`street_address_2`, `users`.`city`, `users`.`state`, `users`.`country`, `users`.`zipcode`, `users`.`phone_number`, `users`.`username`, `users`.`password`, `users`.`created`

//Messages
//
//-messages_id (pk)
//
//-text
//
//-users_id (fk)
//
//-creation (datetime)
//
//
//Views
//
//-view_id (pk)
//
//-users_id (fk)
//
//-messages_id (fk)
//
//-view_time (datetime)
//
//
//Likes
//
//-like_id (pk)
//
//-users_id (fk)
//
//-messages_id (fk)
//
//-like_time (datetime)

