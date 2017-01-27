


  inspirationSearch: function (editBox) 
    {
        var messages = [] ;
        
        if(editBox.text != null)
        {
            console.log("editBox search");
            var searchKey = editBox.text;
            
            for(var item in jsdata)
            {
               for (iter in item["meta"])
               {
                   if ( iter == searchKey )
                   {
                       messages.push(item["message"]);
                       break ;
                   }
               }
            }
            
            console.log(messages);

             var messageLabel = new cc.LabelTTF(messages[1], "Arial", 38);
            // position the label on the center of the screen
            messageLabel.x = size.width / 2;
            messageLabel.y = size.height * 0.75 ;
            // add the label as a child to this layer
            this.addChild(messageLabel, 6);
        }   
    }
        
        
        

//load:
        var jsdata ;
        cc.loader.loadJson("res/test.json", function(error, data){
            if( !error ) {
                cc.log(data); //data is the json object
                console.log(data); 
                jsdata = data ;
            }
        });
        
        console.log(jsdata) ;
        
        // cc.sys.localStorage.setItem(key, value);
        // cc.sys.localStorage.getItem(key);
        // cc.sys.localStorage.removeItem(key);

        //Handle for quick access to Cocos2D's implementation of Local Storage:
        var ls = cc.sys.localStorage;

        var value = 99; //high score value
        var key  = "highScore";

        //This should save value 99 on key "highScore" on Local Storage
        ls.setItem(key, value);

        //This should read the content associated with key "highScore" from Local Storage:
        var data = ls.getItem(key);

        cc.log(data); //Should output 99 to the console.

        //This should remove the contents of key "highScore" from Local Storage:
        ls.removeItem(key);

        //This should print "null"
        data = ls.getItem(key);
        cc.log(data);

//-----------------------------
    var data = cc.sys.localStorage.getItem(key);
    cc.sys.localStorage.setItem("GameState", JSON.stringify(this.data));



//---------------------------------

//Event listeners encapsulate your event processing code.
//Event Manager manage listeners of user events.
//Event objects contain information about the event.

//cc.EventListenerTouch - responds to touch events
//cc.EventListenerKeyboard - responds to keyboard events
//cc.EventListenerAcceleration - reponds to accelerometer events
//cc.EventListenMouse - responds to mouse events
//cc.EventListenerCustom - responds to custom events

//Create a "one by one" touch event listener (processes one touch at a time)
    var listener1 = cc.EventListener.create({
	    event: cc.EventListener.TOUCH_ONE_BY_ONE,
		// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
	    swallowTouches: true,
		//onTouchBegan event callback function						
	    onTouchBegan: function (touch, event) {	
			// event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.	
		    var target = event.getCurrentTarget();	

			//Get the position of the current point relative to the button
		    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
		    var s = target.getContentSize();
		    var rect = cc.rect(0, 0, s.width, s.height);

			//Check the click area
		    if (cc.rectContainsPoint(rect, locationInNode)) {		
			    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
			    target.opacity = 180;
			    return true;
		    }
		    return false;
	    },
		//Trigger when moving touch
	    onTouchMoved: function (touch, event) {			
		    //Move the position of current button sprite
			var target = event.getCurrentTarget();
		    var delta = touch.getDelta();
		    target.x += delta.x;
		    target.y += delta.y;
	    },
		//Process the touch end event
	    onTouchEnded: function (touch, event) {			
		    var target = event.getCurrentTarget();
		    cc.log("sprite onTouchesEnded.. ");
		    target.setOpacity(255);
			//Reset zOrder and the display sequence will change
		    if (target == sprite2) {					
		    	sprite1.setLocalZOrder(100);
		    } else if (target == sprite1) {
		    	sprite1.setLocalZOrder(0);
		    }
	    }
    });


cc.eventManager.addListener({
	    event: cc.EventListener.MOUSE,
	    onMouseMove: function(event){
		    var str = "MousePosition X: " + event.getLocationX() + "  Y:" + event.getLocationY();
		    // do something...
	    },
	    onMouseUp: function(event){
		    var str = "Mouse Up detected, Key: " + event.getButton();
		    // do something...
	    },
	    onMouseDown: function(event){
		    var str = "Mouse Down detected, Key: " + event.getButton();
		    // do something...
	    },
	    onMouseScroll: function(event){
		    var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
		    // do something...
	    }
    },this);


    //add a keyboard event listener to statusLabel
	cc.eventManager.addListener({
	    event: cc.EventListener.KEYBOARD,
	    onKeyPressed:  function(keyCode, event){
		    var label = event.getCurrentTarget();
		    label.setString("Key " + keyCode.toString() + " was pressed!");
	    },
	    onKeyReleased: function(keyCode, event){
		    var label = event.getCurrentTarget();
		    label.setString("Key " + keyCode.toString() + " was released!");
	    }
    }, statusLabel);


    //pause aLayer and its children's event listener
	cc.eventManager.pauseTarget(aLayer, true);
    //resume aLayer and its children's event listener
	cc.eventManager.resumeTarget(aLayer, true);

cc.eventManager.addListener(new BoundEventListener(), aSprite);


//----------------------------

var textField = new ccui.TextField( );
textField.setTouchEnabled( true );
textField.fontName = "Font filepath";
textField.placeHolder = "Input text here";
textField.fontSize = 30;

// optional length functions
textField.setMaxLengthEnabled( true );
textField.setMaxLength( 12 );

// optional password character mask functions
textField.setPasswordEnabled( true );
textField.setPasswordStyleText( "*" );

// this is used to assign the touch event listener (usually is coded when the text field is constructed)
textField.addEventListener( this.textFieldEvent, this );

// this is called when the user interacts with the text field
textFieldEvent: function( sender, type )
{
    switch ( type )
    {
        // keyboard is activated
        case ccui.TextField.EVENT_ATTACH_WITH_IME:

            break;

        // keyboard is deactivated
        case ccui.TextField.EVENT_DETACH_WITH_IME:

            break;
        
        // character insertion
        case ccui.TextField.EVENT_INSERT_TEXT:
            cc.log( "%s", textField.string );

            break;

        // character deletion
        case ccui.TextField.EVENT_DELETE_BACKWARD:
            cc.log( "%s", textField.string );

            break;
    }
}


/////////////////////////////

//Node *newLine = Node::create();
//newLine->setContentSize(Size(richText->getContentSize().width, 0.0f));
//richText->pushBackElement(ui::RichElementCustomNode::create(0, Color3B::WHITE, 255, newLine));
//Edit: I found a solution by doing contentSize magic. The anchor point of a scroll view is BOTTOM LEFT and the rich text container's one is MIDDLE.



void MyClass::textViewKeyboardWillShow(CCSize size)
{
    if (isInputText || !textView->isVisible()) return;

    CCLOG("Keyboard heigh: %f", size.height);

    CCSize contentSize = textView->getContentSize();
    CCRect rect = CCRectMake(0, 0, contentSize.width, contentSize.height);
    CCRect rectTracked = CCRectApplyAffineTransform(rect, textView->nodeToWorldTransform());
    CCLog("++++++ %f, %f, %f, %f", rectTracked.origin.x, rectTracked.origin.y, rectTracked.size.width, rectTracked.size.height);
    // some adjustment for margin between the keyboard and the edit box.
    rectTracked.origin.y -= 4;

    // if the keyboard area doesn't intersect with the tracking node area, nothing needs to be done.
    if (!rectTracked.intersectsRect(CCRect(0, 0, size.width, size.height)))
    {
        CCLOG("needn't to adjust view layout.");
        return;
    }

    // assume keyboard at the bottom of screen, calculate the vertical adjustment.
    adjustHeight = size.height - rectTracked.getMinY();

    this->stopAllActions();
    this->runAction(CCMoveTo::create(0.2, ccp(0, adjustHeight)));
}
 

void MyClass::textViewKeyboardWillHide()
{
    this->stopAllActions();
    this->runAction(CCMoveTo::create(0.2, ccp(0, 0)));
}


var KeyboardTest = cc.Layer.extend({
    ctor:function() {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var message;
        if( 'keyboard' in sys.capabilities ) {
            this.setKeyboardEnabled(true);
            message = "Press keyboard and watch the TextConsole";
        } else {
            message = "KEYBOARD Not supported";
        }

        var s = cc.Director.getInstance().getWinSize();
        var msgNode = cc.LabelTTF.create(message, "Arial", 24);
        this.addChild(msgNode);
        msgNode.setPosition(s.width / 2, s.height / 2);
    },
    onKeyUp:function(key) {
        logTest("Key up:" + key);
    },
    onKeyDown:function(key) {
        logTest("Key down:" + key);
    },
    // this callback is only available on JSB + OS X
    // Not supported on cocos2d-html5
    onKeyFlagsChanged:function(key) {
        logTest("Key flags changed:" + key);
    }
});

KeyboardTest.create = function(args){
    var layer = new KeyboardTest();
    layer.init();
    return layer;
}


//------------------------------------------------------------------
//
// Keyboard test
//
//------------------------------------------------------------------
var KeyboardTest = EventTest.extend({
    init: function () {
        this._super();
        var self = this;
        var label = new cc.LabelTTF("show key Code");
        var size = cc.director.getWinSize();
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label);
        if ('keyboard' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    var strTemp = "Key down:" + key;
                    var keyStr = self.getKeyStr(key);
                    if (keyStr.length > 0)
                    {
                        strTemp += " the key name is:" + keyStr;
                    }
                    label.setString(strTemp);
                },
                onKeyReleased: function (key, event) {
                    var strTemp = "Key up:" + key;
                    var keyStr = self.getKeyStr(key);
                    if (keyStr.length > 0)
                    {
                        strTemp += " the key name is:" + keyStr;
                    }
                    label.setString(strTemp);
                }
            }, this);
        } else {
            cc.log("KEYBOARD Not supported");
        }
    },
    getKeyStr: function (keycode)
    {
        if (keycode == cc.KEY.none)
        {
            return "";
        }

        for (var keyTemp in cc.KEY)
        {
            if (cc.KEY[keyTemp] == keycode)
            {
                return keyTemp;
            }
        }
        return "";
    },
    subtitle:function () {
        return "Keyboard test. Press keyboard and see console";
    },

    // this callback is only available on JSB + OS X
    // Not supported on cocos2d-html5
    onKeyFlagsChanged:function(key) {
        cc.log("Key flags changed:" + key);
    }
});


<div id="custDiv"></div>

<textarea id="testConsole" hidden="hidden" disabled cols="100" rows="10"></textarea>

<div class="sep_line"></div>
    
http://cocos2d-x.org/npm/cceditbox/index.html
/cocos2d-html5/lib/
clearTextConsole();

cocos2d-html5 clearTextConsole



    