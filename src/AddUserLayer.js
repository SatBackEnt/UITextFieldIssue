// AddUserLayer.js
// Add to project.json:
// "modules" : ["cocos2d", "extensions"],
// 


var AddUserLayer = cc.Layer.extend({
    textField: null,

    ctor:function() {
        this._super();

        cc.associateWithNative( this, cc.Layer );
        this.init();
    },

    title:function () {
        return "Add User";
    },
    
    subtitle:function () {
        return "Enter Info";
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
        
        this.formSetup();
        this.exitSetup();
    },
    
 
    
    formSetup: function( )
    {
        var scrollView = new ccui.ScrollView( );
        // ccui.ScrollView.DIR_VERTICAL or ccui.ScrollView.DIR_HORIZONTAL
        scrollView.setDirection( ccui.ScrollView.DIR_VERTICAL );
        scrollView.setTouchEnabled( true );
        scrollView.setBounceEnabled( true );
        // optional
        //scrollView.setBackGroundImage( "Background image filepath" );
        // visible scroll view size
//        scrollView.setContentSize( cc.size( this._textArea.width, this._textArea.height ) );
        // total scroll view size
//        scrollView.setInnerContainerSize( cc.size( this._textArea.width, 500 ) );
        scrollView.setAnchorPoint( cc.p( 0.5, 0.5 ) );

        // add a node to the scroll view
        //scrollView.addChild( this.textArea ) ;
        //this.addChild(scrollView) ;
        
        
        
//        var airplaneFuncCall = function( )
//        {
//            var aScene = new cc.Scene ;
//            var airplaneLayer = new AirplaneLayer();
//            
//            aScene.addChild(airplaneLayer);
//            cc.director.runScene(aScene);
//        };
//        
//        var addUserFuncCall = function( )
//        {
//            var aScene = new cc.Scene ;
//            var aLayer = new AddUserLayer();
//            
//            aScene.addChild(aLayer);
//            cc.director.runScene(aScene);
//        };
//        
//        var menuItem1 = cc.MenuItemFont.create("Airplanes", airplaneFuncCall) ;
//        var menuItem2 = new cc.MenuItemImage( res.s_pathB1, res.s_pathB2, addUserFuncCall );
////        var menuItem2 = cc.MenuItemFont.create("Add User", addUserFuncCall) ;
////        var menuItem2 = cc.MenuItemSprite.create(res.s_pathB1, res.s_pathB2, addUserFuncCall) ;
//        
//        var menu = new cc.Menu( menuItem1, menuItem2 );
//        menu.alignItemsVertically();
//        
//        /***** MenuItemFont *****/
//        menuItem1.setFontName( "Thonburi" );
//        menuItem1.setFontSize( 12 );
//        
//        this.addChild(menu, 1) ;
                                             
//        var richText = new ccui.RichText( );
//        
//        richText.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 4));
//        this.addChild(richText, 1);
    },
    
    exitSetup: function( )
    {
        
        var exitFuncCall = function( )
        {
            var aScene = new cc.Scene ;
            var aLayer = new MenuLayer();
            
            aScene.addChild(aLayer);
            cc.director.runScene(aScene);
        };
        
        var winSize = cc.winSize;
        
        var menuItem1 = new cc.MenuItemImage( res.s_pathB1, res.s_pathB2, exitFuncCall );
        var menu = new cc.Menu( menuItem1 );
        menu.alignItemsVertically();
        menu.setPosition( cc.p(menuItem1.getContentSize().width , 
                              winSize.height - menuItem1.getContentSize().height )) ;
        
        this.addChild(menu, 1) ;
                                             
//        var richText = new ccui.RichText( );
//        
//        richText.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 4));
//        this.addChild(richText, 1);
    },
    
    
    
});




var AddUserLayerScene = cc.Scene.extend({
    
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
        var layer = new AddUserLayer();

        this.addChild(layer);
        cc.director.runScene(this);
    }

});
