// MenuLayer.js
// Add to project.json:
// "modules" : ["cocos2d", "extensions"],
// 


var MenuLayer = cc.Layer.extend({
    textField: null,

    ctor:function() {
        this._super();

        cc.associateWithNative( this, cc.Layer );
        this.init();
    },

    title:function () {
        return "Daily Quote";
    },
    
    subtitle:function () {
        return "Get Your Inspiration!";
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
        
        this.menuSetup();
        
        textField = new ccui.TextField( );
        textField.setTouchEnabled( true );
        textField.fontName = "Arial";
        textField.placeHolder = "Input text here";
        textField.fontSize = 30;
        textField.color = cc.color.WHITE ;
        textField.setPosition(cc.p(winSize.width / 2, winSize.height*0.25));
        this.addChild(textField, 1);
        
        textField.addEventListener( this.textFieldEvent, this );

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
                
                var widgetSize = cc.winSize ;
//                textField.runAction( new cc.MoveTo( 0.225, cc.p(screenSize.width / 2.0, screenSize.height / 2.0 + textField.getContentSize().height / 2.0)) ) ;
//                
//                textField.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
//                textField.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
                
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
    
    menuSetup: function( )
    {
        
        var airplaneFuncCall = function( )
        {
            var aScene = new cc.Scene ;
            var airplaneLayer = new AirplaneLayer();
            
            aScene.addChild(airplaneLayer);
            cc.director.runScene(aScene);
        };
        
        var addQuoteFuncCall = function( )
        {
            var aScene = new cc.Scene ;
            var addLayer = new AddQuoteLayer();
            
            aScene.addChild(addLayer);
            cc.director.runScene(aScene);
        };
        
        var addUserFuncCall = function( )
        {
            var aScene = new cc.Scene ;
            var aLayer = new TextEntryLayer(); // AddUserLayer(); TextInputUILayer  TextEntryLayer
            
            aScene.addChild(aLayer);
            cc.director.runScene(aScene);
        };
        
        
        var menuItem1 = cc.MenuItemFont.create("Airplanes", airplaneFuncCall) ;
        var menuItem2 = new cc.MenuItemImage( res.s_pathR1, res.s_pathR2, addQuoteFuncCall );
        var menuItem3 = new cc.MenuItemImage( res.s_pathR1, res.s_pathR2, addUserFuncCall );
//        var menuItem2 = cc.MenuItemFont.create("Add User", addUserFuncCall) ;
//        var menuItem2 = cc.MenuItemSprite.create(res.s_pathB1, res.s_pathB2, addUserFuncCall) ;
        
        var menu = new cc.Menu( menuItem1, menuItem2, menuItem3 );
        menu.alignItemsVertically();
        
        /***** MenuItemFont *****/
        menuItem1.setFontName( "Thonburi" );
        menuItem1.setFontSize( 20 );
        
        this.addChild(menu, 1) ;
                                             
//        var richText = new ccui.RichText( );
//        
//        richText.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 4));
//        this.addChild(richText, 1);
    },
    
    
    
});




var MenuLayerScene = cc.Scene.extend({
    
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
        var layer = new MenuLayer();

        this.addChild(layer);
        cc.director.runScene(this);
    }

});
