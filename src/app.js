
var jsdata ;

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    _box1: null,
    
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Welcome", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        
        
//        cc.loader.loadJson("res/Inspirations.json", function(error, data){
//            if( !error ) {
//                cc.log(data); //data is the json object
//                jsdata = data ;
//            }
//        });

//        var textEntryLayer = new TextEntryLayer();
//        this.addChild(textEntryLayer) ;
        
        
//        var airplaneLayer = new AirplaneLayer();
//        this.addChild(airplaneLayer) ;
        
        var aLayer = new MenuLayer();
        this.addChild(aLayer) ;
        
//         var scene = new MenuLayerScene();
//         if (scene) 
//         {
//             cc.director.runScene(scene);
//         }
        
//         var scene = new RichConsoleScene();
//         if (scene) 
//         {
//             cc.director.runScene(scene);
//         }
        
        
//        var scene = new TextInputUIScene();
//         if (scene) 
//         {
//             scene.runLayer();
//             //cc.director.runScene(scene);
//
//         }
        
//        var scene = new TextInputTestScene();
//         if (scene) 
//         {
//             //scene.runThisTest();
//             cc.director.runScene(scene);
//
//         }
        
        // Edit box 1 with default value and background sprite at normal state
//        this._box1 = cc.EditBox.create(cc.size(480, 320), cc.Scale9Sprite.create(res.blackBG_png));
//        this._box1.setText("Image");
//        this._box1.setPosition(220, 250);
//        this._box1.setFontColor(cc.color(15, 250, 245)) ; //new cc.Color3B(255,0,0)
//        this._box1.fontSize = 42;
//        this._box1.setDelegate(this);
//        this.addChild(this._box1);
        
//        this._box1 = cc.TextFieldTTF.create("Test TextField", "Arial", 32)
        // When five parameters
        //var textField = cc.TextFieldTTF.create("", cc.size(100,50), cc.TEXT_ALIGNMENT_LEFT,"Arial", 32);
        // When three parameters
        //var textField = cc.TextFieldTTF.create("", "Arial", 32);
        //this._box1.setDelegate(this);

//        this._box1 = new ccui.TextField() ;
//        this._box1.setTouchEnabled(true);
//        this._box1.fontName = "Arial"
//        this._box1.fontSize = 22 ;
//        this._box1.placeHolder = "Test TextField";
//        this._box1.x = 50;
//        this._box1.y = 40 ;
//        
//        this._box1.setPosition(220, 250);
//        this._box1.addEventListener(this.textFieldEvent, this) ;
//
//        
//        this.addChild(this._box1);
        
//        Text* text = Text::create("Text can line wrap","AmericanTypewriter",32);
//        text->ignoreContentAdaptWithSize(false);
//        text->setContentSize(Size(280, 150));
//        text->setTextHorizontalAlignment(TextHAlignment::CENTER);
//        text->setPosition(Vec2(widgetSize.width / 2.0f, widgetSize.height / 2.0f - text->getContentSize().height / 8.0f));
//        _uiLayer->addChild(text); 
        
//        var textArea = new ccui.Text("Text can line wrap when it is long and there are many characters \n What comes next","AmericanTypewriter", 22) ;
//        textArea.setTextAreaSize (cc.size(400, 400)) ;
//        textArea.ignoreContentAdaptWithSize(false); // need for text wrap
//        textArea.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
////        textArea.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER) ;
////        textArea.setString("TextArea widget can line wrap")
////        textArea.setFontName("AmericanTypewriter")
////        textArea.setFontSize(32)
//        textArea.enableShadow(cc.color.RED, cc.size(2,-2) ) ;
////
////        textArea.enableOutline(cc.color.ORANGE, cc.size(1,1)) // Invalid for web/html
////        textArea.enableGlow(cc.color.GREEN) ; //????
//        textArea.setTouchScaleChangeEnabled(true) ; //????
//        textArea.setTouchEnabled( true );
//
//        //
//        textArea.setPosition(cc.p(size.width / 2, size.height / 2 - textArea.getContentSize().height / 8))  ;
//        this.addChild(textArea) ;

        return true;
    },
    
    
    
    // Edit box delegation functions: editBoxEditingDidBegin, editBoxEditingDidEnd, editBoxTextChanged, editBoxReturn
    editBoxEditingDidBegin: function (editBox) {
        cc.log("editBox DidBegin !"); //logTest()
    },

    editBoxEditingDidEnd: function (editBox) {
        cc.log("editBox DidEnd !");
    },

    editBoxTextChanged: function (editBox, text) {
        cc.log("editBox, TextChanged, text: " + text);
    },

    editBoxReturn: function (editBox) {
        cc.log("editBox  was returned !");
        //inspirationSearch(editBox) ;
    }
    
//     _getEditBoxName :function(editBox){
//        if (this._box1 == editBox) {
//            return "box1";
//        } else if (this._box2 == editBox) {
//            return "box2";
//        } else if (this._box3 == editBox) {
//            return "box3";
//        } else if (this._box4 == editBox) {
//            return "box4";
//        }
//        return "Unknown EditBox";
//    }
    
//    
//    TextFieldTTFReturn: function (editBox) {
//        logTest("TextField was returned !");
//        inspirationSearch(editBox) ;
//    },
    
//    textFieldEvent: function (sender, type) 
//    {
//        console.log("textFieldEvent did begin !");
//        switch(type)
//            {
//                case ccui.TextField.EVENT_ATTACH_WITH_ME :
//                    cc.log("Activate") ;
//                    break  ;
//                case ccui.TextField.EVENT_DETACH_WITH_ME :
//                    cc.log("Deactivate") ;
//                    break  ;
//                case ccui.TextField.EVENT_INSERT_TEXT :
//                    cc.log("Insert Character") ;
//                    cc.log(this._box1.string) ;
//                case ccui.TextField.EVENT_DELETE_BACKWARD :
//                    cc.log("Delete Character") ;
//                    cc.log(this._box1.string) ;    
//                    
//                    break  ;
//            }
//    },
//    
//    onTouchEnded : function (touchPoint)
//    {
//        console.log("textField onTouchEnded !");
//        this._super.onTouchEnded(touchPoint) ;
//    },

        
   

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

