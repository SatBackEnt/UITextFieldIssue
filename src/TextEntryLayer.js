


var TextEntryLayer = cc.Layer.extend({
    textField: null,
    sprite:null,
    _editBox1: null,
    textArea: null, 
    _userText: null,
    _jsdata : null,

    ctor:function() {
        this._super();

        cc.associateWithNative( this, cc.Layer );
        this.init();
        
        // ask the window size
        //var size = cc.winSize;
    },

    title:function () {
        return "Text Input Test";
    },
    
    subtitle:function () {
        return "Input Subtitle";
    },
    
    onEnter:function () {
        this._super();

        var winSize = cc.winSize;
        
        // Edit box 1 with default value and background sprite at normal state
        this._editBox1 = new cc.EditBox(cc.size(900, 100), cc.Scale9Sprite.create(res.blackBG_png));
        this._editBox1.setString("Image");
        this._editBox1.setPosition(winSize.width / 2, winSize.height/2 + this._editBox1.getContentSize().height);
        this._editBox1.setFontColor(cc.color(15, 250, 245)) ; //new cc.Color3B(255,0,0)
        this._editBox1.fontSize = 42;
//        this._editBox1.setInputFlag(cc.EDITBOX_INPUT_MODE_ANY) ;
//        this._editBox1.setInputMode(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_WORD) ;
        this._editBox1.setDelegate(this);
        this.addChild(this._editBox1);
//        _editPassword->setInputFlag(ui::EditBox::InputFlag::PASSWORD);
//        _editPassword->setInputMode(ui::EditBox::InputMode::SINGLE_LINE);
//        _editEmail->setInputMode(ui::EditBox::InputMode::EMAIL_ADDRESS);
//  EDITBOX_INPUT_MODE_ANY EDITBOX_INPUT_MODE_SINGLELINE EDITBOX_INPUT_MODE_EMAILADDR EDITBOX_INPUT_MODE_PHONENUMBER EDITBOX_INPUT_MODE_NUMERIC EDITBOX_INPUT_MODE_URL EDITBOX_INPUT_MODE_DECIMAL 
//  EDITBOX_INPUT_FLAG_PASSWORD | EDITBOX_INPUT_FLAG_SENSITIVE EDITBOX_INPUT_FLAG_INITIAL_CAPS_WORD | EDITBOX_INPUT_FLAG_INITIAL_CAPS_SENTENCE | EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS | 
        
        this.textArea = new ccui.Text("The Text is not in here.", 22) ;
        this.textArea.setTextAreaSize (cc.size(winSize.width * 0.75, winSize.height / 2)) ;
        this.textArea.setTextAreaSize (cc.size(winSize.width * 0.75, winSize.height / 2)) ;
        this.textArea.ignoreContentAdaptWithSize(false); // need false for text wrap
        this.textArea.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.textArea.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP) ;
        this.textArea.setString("TextArea Text \n Try\n this\n test.")
//        this.textArea.setFontName("AmericanTypewriter")
//        this.textArea.setFontSize(32)
        this.textArea.enableShadow(cc.color.RED, cc.size(2,-2) ) ;
//
//        this.textArea.enableOutline(cc.color.ORANGE, cc.size(1,1)) // Invalid for web/html
//        this.textArea.enableGlow(cc.color.GREEN) ; //????
        this.textArea.setTouchScaleChangeEnabled(true) ; //????
        this.textArea.setTouchEnabled( true );
        //
        this.textArea.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - this.textArea.getContentSize().height / 2))  ;
        this.addChild(this.textArea) ;


        
        var scrollView = new ccui.ScrollView( );
        // ccui.ScrollView.DIR_VERTICAL or ccui.ScrollView.DIR_HORIZONTAL
        scrollView.setDirection( ccui.ScrollView.DIR_VERTICAL );
        scrollView.setTouchEnabled( true );
        scrollView.setBounceEnabled( true );
        // optional
        //scrollView.setBackGroundImage( "Background image filepath" );
        // visible scroll view size
        scrollView.setContentSize( cc.size( this.textArea.width, this.textArea.height ) );
        // total scroll view size
        scrollView.setInnerContainerSize( cc.size( this.textArea.width, 500 ) );
        scrollView.setAnchorPoint( cc.p( 0.5, 0.5 ) );

        // add a node to the scroll view
        //scrollView.addChild( this.textArea ) ;
        //this.addChild(scrollView) ;
        
        // checks if the device you are using is capable of keyboard input 
        if ( cc.sys.capabilities.hasOwnProperty( 'keyboard' ) )
        {
            //add a keyboard event listener to layer
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(keyCode, event) {
                    var layer = event.getCurrentTarget();
                    cc.log( "Key Pressed: " + keyCode.toString( ) );
               },
               onKeyReleased: function(keyCode, event){
                    var layer = event.getCurrentTarget();
                    cc.log( "Key Released: " + keyCode.toString( ) );
                   
                   //var keyStr = keyCode.toString( );
                    if (keyCode == 13)
                    {
                        layer._userText = layer._editBox1.getString() ;
                        //this._userText = this._userText.concat("\n") ;
                        layer._userText += '\n' ;
                        layer._editBox1.setString(layer._userText);
                        layer._editBox1.setSelected(true) ; 
                        
                        layer.textArea.setString(layer._userText) ;
                    }
               }
            }, this);
        }
        

        var submit_button = new ccui.Button();
        submit_button.loadTextures( res.s_pathR1, res.s_pathR2 );
        submit_button.setPosition(cc.p(winSize.width * 0.75, winSize.height / 2 + submit_button.getContentSize().height ))  ;
        this.addChild(submit_button) ;
        // this is used to assign the touch event listener (usually is coded when the button is constructed)
        submit_button.addTouchEventListener( this.touchEvent, this );
        this._editBox1.setSelected(true) ;  
        
        cc.loader.loadJson("res/test.json", function(error, data){
            if( !error ) {
//                cc.log(data); //data is the json object
//                console.log(data); 
                this._jsdata = data ;
            }
        });
        
        console.log(this._jsdata) ;
                            
                        
    
    },
    
    
    // this is called when the user interacts with the button
    touchEvent: function(sender, type)
    {
        switch (type)
        {
            case ccui.Widget.TOUCH_BEGAN:
                // code to handle when the button is first clicked

                break;

            case ccui.Widget.TOUCH_MOVED:
                // code to handle when the user is moving their finger/cursor whilst clicking the button

                break;

            case ccui.Widget.TOUCH_ENDED:
                // code to handle when the button click has ended (e.g. finger is lifted off the screen)
                this._editBox1.setSelected(false) ;
                this._userText = this._editBox1.getString() ;
                this.textArea.setString(this._userText) ;
                
                var entryKey = "Message1"
                cc.sys.localStorage.setItem(entryKey, this._userText); 
                
//                var jsonfile = require('jsonfile')
// 
//                var file = 'res/test.json'
//                var obj = {name: 'JP'}
// 
//                jsonfile.writeFile(file, obj, function (err) {
//                    console.error(err)
//                } ) ;

                break;

            case ccui.Widget.TOUCH_CANCELLED:
                // code to handle when the button click has been cancelled,  this is usually handled the same way as ENDED in most applications (e.g. another application takes control of the device)

                break;                
        }
    }
    
    
});
    
    
    //        textField = new ccui.TextField( );
//        textField.setTouchEnabled( true );
//        textField.fontName = "Arial";
//        textField.placeHolder = "Input text here";
//        textField.fontSize = 30;
//        textField.color = cc.color.WHITE ;

        // optional length functions
//        textField.setMaxLengthEnabled( true );
//        textField.setMaxLength( 12 );

        // optional password character mask functions
//        textField.setPasswordEnabled( true );
//        textField.setPasswordStyleText( "*" );
        
//        textField.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
//        this.addChild(textField, 1);
//        
//        // this is used to assign the touch event listener (usually is coded when the text field is constructed)
//        textField.addEventListener( this.textFieldEvent, this );
        
        //this.addRichText();
                                     
//        rConsole = new RichConsole() ;
//        rConsole.changeWidthAndHeight(400, 200);
//        rConsole.setPosition(cc.p( cc.winSize.width / 2 - rConsole.width / 2, rConsole.height / 4));
//        rConsole.setColor(cc.color.BLUE) ;
//        this.addChild(rConsole) ;
//        rConsole.log("Test in the console") ;
    
//        var layout = new ccui.Layout();
//        // LINEAR_HORIZONTAL or LINEAR_VERTICAL
//        layout.setLayoutType( ccui.Layout.LINEAR_VERTICAL );
//        // ccui.Widget.SIZE_PERCENT or ccui.Widget.SIZE_ABSOLUTE
//        layout.sizeType = ccui.Widget.SIZE_PERCENT;
//        layout.setSizePercent( cc.p( 0.9, 0.9 ) );
//        // ccui.Widget.POSITION_PERCENT or ccui.Widget.POSITION_ABSOLUTE
//        layout.setPositionType( ccui.Widget.POSITION_PERCENT );
//        layout.setPositionPercent( cc.p( 0.25, 0.25 ) );
//        // ccui.Layout.BG_COLOR_GRADIENT, ccui.Layout.BG_COLOR_NONE or ccui.Layout.BG_COLOR_SOLID
//        layout.setBackGroundColorType( ccui.Layout.BG_COLOR_SOLID );
//        layout.setBackGroundColor( cc.color.GRAY );
//
//        // add node to layout
//        layout.addChild( nodeToAdd );
        