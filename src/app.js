
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
        
        
        cc.loader.loadJson("res/Inspirations.json", function(error, data){
            if( !error ) {
                cc.log(data); //data is the json object
                jsdata = data ;
            }
        });

        
        var scene = new TextInputUIScene();
         if (scene) 
         {
             scene.runLayer();
             //cc.director.runScene(scene);

         }
        
//        var scene = new TextInputTestScene();
//         if (scene) 
//         {
//             //scene.runThisTest();
//             cc.director.runScene(scene);
//
//         }
        
        // Edit box 1 with default value and background sprite at normal state
//        this._box1 = cc.EditBox.create(cc.size(100, 40), cc.Scale9Sprite.create(res.HelloWorld_png));
//        this._box1.setText("Image");
//        this._box1.setPosition(220, 250);
//        this._box1.setFontColor(cc.c3b(15, 250, 245));
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

        return true;
    }
    
    
    
    // Edit box delegation functions: editBoxEditingDidBegin, editBoxEditingDidEnd, editBoxTextChanged, editBoxReturn
//    editBoxEditingDidBegin: function (editBox) {
//        logTest("editBox DidBegin !");
//    },
//
//    editBoxEditingDidEnd: function (editBox) {
//        logTest("editBox DidEnd !");
//    },
//
//    editBoxTextChanged: function (editBox, text) {
//        logTest("editBox, TextChanged, text: " + text);
//    },
//
//    editBoxReturn: function (editBox) {
//        logTest("editBox  was returned !");
//        inspirationSearch(editBox) ;
//    },
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

