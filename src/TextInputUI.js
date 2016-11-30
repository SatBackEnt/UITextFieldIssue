// TextInputUI.js
// Add to project.json:
// "modules" : ["cocos2d", "extensions"],
// 

var TextInputUILayer = cc.Layer.extend({
    textField: null,

    ctor:function() {
        this._super();

        cc.associateWithNative( this, cc.Layer );
        this.init();
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

        var label = cc.LabelTTF.create(this.title(), "Arial", 24);
        this.addChild(label);
        label.setPosition(cc.p(winSize.width / 2, winSize.height - 50));

        var subTitle = this.subtitle();
        if (subTitle && subTitle !== "") {
            var l = cc.LabelTTF.create(subTitle, "Thonburi", 16);
            this.addChild(l, 1);
            l.setPosition(cc.p(winSize.width / 2, winSize.height - 80));
        }
        
        textField = new ccui.TextField( );
        textField.setTouchEnabled( true );
        textField.fontName = "Arial";
        textField.placeHolder = "Input text here";
        textField.fontSize = 30;

        // optional length functions
//        textField.setMaxLengthEnabled( true );
//        textField.setMaxLength( 12 );

        // optional password character mask functions
//        textField.setPasswordEnabled( true );
//        textField.setPasswordStyleText( "*" );
        
        textField.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(textField, 1);
        
        // this is used to assign the touch event listener (usually is coded when the text field is constructed)
        textField.addEventListener( this.textFieldEvent, this );
        
        this.addRichText();
        
    },
    
     // this is called when the user interacts with the text field
    textFieldEvent: function( sender, type )
    {
        switch ( type )
        {
            // keyboard is activated
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                //cc.log( "Attach IME string %s", textField.string );
                console.log( "Attach IME %s", textField.string );
                break;

            // keyboard is deactivated
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                //cc.log( "Detach IME string %s", textField.string );
                console.log( "Detach IME %s", textField.string );
                break;

            // character insertion
            case ccui.TextField.EVENT_INSERT_TEXT:
                //cc.log( "%s", textField.string );
                console.log( "Inserted Text: %s", textField.string );
                break;

            // character deletion
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                //cc.log( "%s", textField.string );
                console.log( "Deleted Text: %s", textField.string );
                break;
        }
    },
    
    addRichText: function( )
    {
        var richText = new ccui.RichText( );
        // sets whether or not the element resizes based on its content aka rich text items added below
        richText.ignoreContentAdaptWithSize( false );
        richText.width = 120;
        richText.height = 100;

        var re1 = new ccui.RichElementText( 1, cc.color.WHITE, 255, "This color is white", "Arial", 10 );
        var re2 = new ccui.RichElementText( 2, cc.color.YELLOW, 255, "And this is yellow. ", "Arial", 10 );
        var re3 = new ccui.RichElementText( 3, cc.color.BLUE, 255, "This one is blue. ", "Arial", 10 );
        var re4 = new ccui.RichElementText( 4, cc.color.GREEN, 255, "And this is Green. ", "Arial", 25 );
        var re5 = new ccui.RichElementText( 5, cc.color.RED, 255, "This is well red . ", "Arial", 10 );
        var re6 = new ccui.RichElementText( 6, cc.color.ORANGE, 255, "WELL DONE AT THE END. ", "Arial", 10 );

        // add all the rich text items
        richText.pushBackElement( re1 );
        richText.pushBackElement( re2 );
        richText.pushBackElement( re3 );
        richText.pushBackElement( re4 );
        richText.pushBackElement( re5 );
        // insert the element at a particular index
        richText.insertElement( re6, 5 );
        
        richText.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 4));
        this.addChild(richText, 1);
    }
    
});




var TextInputUIScene = cc.Scene.extend({
    
    ctor:function (bPortrait) {
        this._super();
        cc.associateWithNative( this, cc.Scene );
        this.init();
    },

    // callbacks
    onEnter:function () {
        this._super();
    },
    
    runLayer:function () 
    {
        var layer = new TextInputUILayer();

        this.addChild(layer);
        cc.director.runScene(this);
    }

});
