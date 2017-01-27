// AddQuoteLayer.js
// Add to project.json:
// "modules" : ["cocos2d", "extensions"],
// 


var AddQuoteLayer = cc.Layer.extend({
    _textField: null,
    _textEntryStatus: null,

    ctor:function() {
        this._super();

        cc.associateWithNative( this, cc.Layer );
        this.init();
    },

    title:function () {
        return "Add A Quote";
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
        
        var textStatus = cc.LabelTTF.create("Not Editing Text", "Thonburi", 16);
        this.addChild(textStatus, 1);
        textStatus.setPosition(cc.p(winSize.width / 2, winSize.height - 100));
        this._textEntryStatus = textStatus ;
        
        this.formSetup();
        this.exitMenuSetup();
    },
    
 
    makeLayout:function (title) {
        var winSize = cc.winSize;

        var text = new ccui.Text( );
        text.setString( title );
        text.setColor(cc.color.BLUE); 
        text.setFontName( "Thonburi" );
        text.setFontSize( 32 );
        // cc.TEXT_ALIGNMENT_LEFT, cc.TEXT_ALIGNMENT_CENTER or cc.TEXT_ALIGNMENT_RIGHT
        text.setTextHorizontalAlignment( cc.TEXT_ALIGNMENT_LEFT );
        // cc.VERTICAL_TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER or cc.VERTICAL_TEXT_ALIGNMENT_RIGHT
        text.setTextVerticalAlignment( cc.VERTICAL_TEXT_ALIGNMENT_CENTER );
//        text.setPosition(cc.p(winSize.width / 2, winSize.height*0.25));    
        
        
        var textField = new ccui.TextField( );
        textField.setTouchEnabled( true );
        textField.fontName = "Arial";
        textField.placeHolder = "Input";
        textField.fontSize = 30;
        textField.color = cc.color.GREEN ;
        
        textField.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        //textField.setPosition(cc.p(winSize.width / 2, winSize.height*0.25));        
        textField.addEventListener( this.textFieldEvent, this );

        // optional length functions
//        textField.setMaxLengthEnabled( true );
//        textField.setMaxLength( 12 );

        // optional password character mask functions
//        textField.setPasswordEnabled( true );
//        textField.setPasswordStyleText( "*" );
        
        //textField.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        //this.addChild(textField, 1);
        
        // this is used to assign the touch event listener (usually is coded when the text field is constructed)
//        textField.addEventListener( this.textFieldEvent, this );
        
        
//        text.setPosition(cc.p(200, 200 )) ;
//        lastname_text.setPosition(cc.p(200, 300 )) ;
//        this.addChild(text);
//        this.addChild(lastname_text);
        
        var editBox1 = new cc.EditBox(cc.size(500, 50), cc.Scale9Sprite.create(res.blackBG_png));
        editBox1.setString("Image");
        //editBox1.setPosition(winSize.width / 2, winSize.height*1 - editBox1.getContentSize().height);
        editBox1.setFontColor(cc.color(15, 250, 245)) ; //new cc.Color3B(255,0,0)
        editBox1.fontSize = 20;
//        this._editBox1.setInputFlag(cc.EDITBOX_INPUT_MODE_ANY) ;
//        this._editBox1.setInputMode(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_WORD) ;
        editBox1.setDelegate(this);
//        this.addChild(editBox1); 
        
//        var layout = new ccui.Layout();
//        // LINEAR_HORIZONTAL or LINEAR_VERTICAL
//        layout.setLayoutType( ccui.Layout.LINEAR_HORIZONTAL );
//        // ccui.Widget.SIZE_PERCENT or ccui.Widget.SIZE_ABSOLUTE
//        layout.sizeType = ccui.Widget.SIZE_PERCENT;
//        layout.setSizePercent( cc.p( 1, 0.1 ) );
//        // ccui.Widget.POSITION_PERCENT or ccui.Widget.POSITION_ABSOLUTE
//        layout.setPositionType( ccui.Widget.POSITION_ABSOLUTE );
////        layout.setPositionType( ccui.Widget.POSITION_PERCENT );
////        layout.setPositionPercent( cc.p( 0.0, 0.25 ) );
//        // ccui.Layout.BG_COLOR_GRADIENT, ccui.Layout.BG_COLOR_NONE or ccui.Layout.BG_COLOR_SOLID
//        layout.setBackGroundColorType( ccui.Layout.BG_COLOR_SOLID );
//        layout.setBackGroundColor( cc.color.GRAY );
//        //cc.Color(r, g, b, a)
//
//        // add node to layout
////        layout.pushBackCustomItem( layout );
////        layout.setPosition(cc.p(winSize.width/2, winSize.height/2  )) ; //- layout.getContentSize().height
//        layout.addChild( text );
//        //layout.addChild( editBox1 );
//        layout.addChild( textField );
////        this.addChild(layout);
        
//        var layout = FormLayout.create(text);
        var layout = FormLayout.create(text, textField, editBox1);
////        layout.alignItemsHorizontallyWithPadding(20) ;
////        layout.alignItemsVerticallyWithPadding(20) ;
        layout.alignItemsTest(20) ;
        layout.setColor(cc.color(255, 200, 0, 255)) ;
        
//        layout.setBackGroundColorType( ccui.Layout.BG_COLOR_SOLID );
//        layout.setBackGroundColor( cc.color.GRAY );
        //cc.Color(r, g, b, a)
      
        return layout ;
        
//        var colorLayer = cc.LayerColor.create(cc.color.WHITE, winSize.width, winSize.height/4);
//        text.setPosition(cc.p(100, winSize.height*0.1));    
//        textField.setPosition(cc.p(250, winSize.height*0.1));    
//        colorLayer.addChild(text);
//        colorLayer.addChild(textField);
//        return colorLayer ;
        
//        var layout = FormLayout.create();
//        layout.setColor(cc.color(255, 200, 0, 255)) ;
//        layout.addChild(text);
//        layout.addChild(textField) ;
        
        return layout; 
        
    },
    
    
    formSetup: function( )
    {
        var winSize = cc.winSize;
        
        var button = new ccui.Button();
        button.loadTextures( res.s_pathB1, res.s_pathB2 );
        button.addTouchEventListener( this.touchEvent, this );

        
//        var listView = new ccui.ListView( );
//        // scroll direction (ccui.ScrollView.DIR_VERTICAL or ccui.ScrollView.DIR_HORIZONTAL)
//        listView.setDirection( ccui.ScrollView.DIR_VERTICAL );
//        listView.setTouchEnabled( true );
//        listView.setBounceEnabled( true );
//        // optional
////        listView.setBackGroundImage( "Background image filepath" );
//        
////        listView.setBackGroundColorType(ccui.Layout.COLOR_SOLID)
//////        //Sets Color Type for ccui.Layout.
////        listView.setBackGroundColor(cc.color.WHITE, cc.color.WHITE)
////        //Sets background color for layout, if color type is Layout.COLOR_SOLID
////        listView.setBackGroundColorOpacity(opacity)
//        //Sets background opacity to ccui.Layout.
//        listView.setPosition(cc.p(winSize.width/2, winSize.height/2  )) ;
        
        // add a UI element to the list view
        //listView.pushBackCustomItem( layout );
//        this.addChild(listView);
        
        
        var scrollView = new ccui.ScrollView( );
        // ccui.ScrollView.DIR_VERTICAL or ccui.ScrollView.DIR_HORIZONTAL
        scrollView.setDirection( ccui.ScrollView.DIR_VERTICAL );
        scrollView.setTouchEnabled( true );
        scrollView.setBounceEnabled( true );
        // optional
//        scrollView.setBackGroundImage( "Background image filepath" );
        scrollView.setBackGroundColorType(ccui.Layout.COLOR_SOLID) ;
//        //Sets Color Type for ccui.Layout.
        scrollView.setBackGroundColor(cc.color.YELLOW) ;
        scrollView.setBackGroundColorOpacity(255) ;
        
//        scrollView.sizeType = ccui.Widget.SIZE_PERCENT;
//        scrollView.setSizePercent( cc.p( 1, 1 ) );
        
        // visible scroll view size
        scrollView.setContentSize( cc.size( winSize.width, 400 ) );
        // total scroll view size
        scrollView.setInnerContainerSize( cc.size( winSize.width, 1000 ) );
        scrollView.setAnchorPoint( cc.p( 0.5, 0.5 ) );
        
        scrollView.setPosition(cc.p(winSize.width/2, winSize.height/2  )) ;
//        // add a node to the scroll view
        
        var formArray = ["First Name", "Last Name", "Address 1", "City", "State", "Zip", "Country", "Birthday (mm/dd/yyy)"];
        for(var c=0; c<1; c++)
        {
            var alayout = this.makeLayout(formArray[c]) ;
            alayout.position= cc.p(100, 900-100*c); //500-100*c
            //scrollView.addChild( alayout );
            this.addChild(alayout);
        }
        
        //scrollView.addChild( lastname_text );
        //this.addChild(scrollView);
        
//        var item1 = cc.MenuItemFont.create("Test1") ;
//        var item2 = cc.MenuItemFont.create("Test 2: this is long") ;
//        var item3 = cc.MenuItemFont.create("Test 3: oh my") ;
//        var testMenu = new cc.Menu(item1, item2, item3);
////        testMenu.alignItemsHorizontallyWithPadding(20) ;
//        testMenu.alignItemsInRows(2,1) ;
////        testMenu.position= cc.p(100, 900-100*1);
//        this.addChild(testMenu);
        

    },
    
    
    exitMenuSetup: function( )
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
    },
    
    // this is called when the user interacts with the text field
    textFieldEvent: function( sender, type )
    {
        var winSize = cc.winSize;
        switch ( type )
        {
            // keyboard is activated
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                //cc.log( "Attach IME string %s", textField.string );
                console.log( "Attach IME %s", textField.string );
                
                textField = sender ;
                var curPos= textField.getPosition();
                textField.runAction( new cc.MoveBy( 0.225, cc.p(30, 0) ) );

//                textField.runAction( new cc.MoveTo( 0.225, cc.p(curPos.x + textField.getContentSize().height / 2.0), curPos.y) ) ;
                
                textField.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
                textField.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                textField.color = cc.color.GREEN ;
                
                this._textEntryStatus.setString("Editing Text");
                this._textEntryStatus.setColor(cc.color.RED) ;
                
                break;

            // keyboard is deactivated
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                //cc.log( "Detach IME string %s", textField.string );
                console.log( "Detach IME %s", textField.string );
                
                this._textEntryStatus.setString("Not Editing Text");
                this._textEntryStatus.setColor(cc.color.WHITE) ;
                
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
    
    
});




var AddQuoteLayerScene = cc.Scene.extend({
    
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
        var layer = new AddQuoteLayer();

        this.addChild(layer);
        cc.director.runScene(this);
    }

});


   
//var lastname_text = new ccui.Text( );
//        lastname_text.setString( "Last Name" );
//        lastname_text.setFontName( "Thonburi" );
//        lastname_text.setFontSize( 32 );
//        // cc.TEXT_ALIGNMENT_LEFT, cc.TEXT_ALIGNMENT_CENTER or cc.TEXT_ALIGNMENT_RIGHT
//        lastname_text.setTextHorizontalAlignment( cc.TEXT_ALIGNMENT_CENTER );
//        // cc.VERTICAL_TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER or cc.VERTICAL_TEXT_ALIGNMENT_RIGHT
//        lastname_text.setTextVerticalAlignment( cc.VERTICAL_TEXT_ALIGNMENT_CENTER );

//var scrollView = new ccui.ScrollView( );
//// ccui.ScrollView.DIR_VERTICAL or ccui.ScrollView.DIR_HORIZONTAL
//scrollView.setDirection( ccui.ScrollView.DIR_VERTICAL );
//scrollView.setTouchEnabled( true );
//scrollView.setBounceEnabled( true );
//// optional
//scrollView.setBackGroundImage( "Background image filepath" );
//// visible scroll view size
//scrollView.setContentSize( cc.size( 300, 200 ) );
//// total scroll view size
//scrollView.setInnerContainerSize( cc.size( 1280, 2500 ) );
//scrollView.setAnchorPoint( cc.p( 0.5, 0.5 ) );
//
//// add a node to the scroll view
//scrollView.addChild( nodeToAdd );


//        var scrollView = new ccui.ScrollView( );
//        // ccui.ScrollView.DIR_VERTICAL or ccui.ScrollView.DIR_HORIZONTAL
//        scrollView.setDirection( ccui.ScrollView.DIR_VERTICAL );
//        scrollView.setTouchEnabled( true );
//        scrollView.setBounceEnabled( true );
//        // optional
//        //scrollView.setBackGroundImage( "Background image filepath" );
//        // visible scroll view size
////        scrollView.setContentSize( cc.size( this._textArea.width, this._textArea.height ) );
//        // total scroll view size
////        scrollView.setInnerContainerSize( cc.size( this._textArea.width, 500 ) );
//        scrollView.setAnchorPoint( cc.p( 0.5, 0.5 ) );
//
//        // add a node to the scroll view
//        //scrollView.addChild( this.textArea ) ;
//        //this.addChild(scrollView) ;
