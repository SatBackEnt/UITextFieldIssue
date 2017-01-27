

var AirplaneLayer = cc.Layer.extend({
    _airplanes : null,
    _sprite:null,
    _textArea: null, 
    _userText: null,
    _jsdata : null,

    ctor:function() {
        this._super();

        cc.associateWithNative( this, cc.Layer );
        this.init();
        
        // ask the window size
        //var size = cc.winSize;
    },
    
    onEnter:function () {
        this._super();

        var winSize = cc.winSize;
        
        this._textArea = new ccui.Text("The Text is not in here.", 22) ;
        this._textArea.setTextAreaSize (cc.size(winSize.width * 0.75, winSize.height / 2)) ;
        this._textArea.setTextAreaSize (cc.size(winSize.width * 0.75, winSize.height / 2)) ;
        this._textArea.ignoreContentAdaptWithSize(false); // need false for text wrap
        this._textArea.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this._textArea.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP) ;
        this._textArea.setString("TextArea Text \n Try\n this\n test.")
//        this._textArea.setFontName("AmericanTypewriter")
//        this._textArea.setFontSize(32)
        this._textArea.enableShadow(cc.color.RED, cc.size(2,-2) ) ;
//
//        this._textArea.enableOutline(cc.color.ORANGE, cc.size(1,1)) // Invalid for web/html
//        this._textArea.enableGlow(cc.color.GREEN) ; //????
        this._textArea.setTouchScaleChangeEnabled(true) ; //????
        this._textArea.setTouchEnabled( true );
        //
        this._textArea.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - this._textArea.getContentSize().height / 2))  ;
        this.addChild(this._textArea) ;


        var scrollView = new ccui.ScrollView( );
        // ccui.ScrollView.DIR_VERTICAL or ccui.ScrollView.DIR_HORIZONTAL
        scrollView.setDirection( ccui.ScrollView.DIR_VERTICAL );
        scrollView.setTouchEnabled( true );
        scrollView.setBounceEnabled( true );
        // optional
        //scrollView.setBackGroundImage( "Background image filepath" );
        // visible scroll view size
        scrollView.setContentSize( cc.size( this._textArea.width, this._textArea.height ) );
        // total scroll view size
        scrollView.setInnerContainerSize( cc.size( this._textArea.width, 500 ) );
        scrollView.setAnchorPoint( cc.p( 0.5, 0.5 ) );

        // add a node to the scroll view
        //scrollView.addChild( this.textArea ) ;
        //this.addChild(scrollView) ;
        
        
        var close_button = new ccui.Button();
        close_button.loadTextures( res.s_pathR1, res.s_pathR2 );
        close_button.setPosition(cc.p(winSize.width * 0.75, winSize.height / 2 + close_button.getContentSize().height ))  ;
        this.addChild(close_button) ;
        // this is used to assign the touch event listener (usually is coded when the button is constructed)
        close_button.addTouchEventListener( this.touchEvent, this );
        
        cc.loader.loadJson("res/test.json", function(error, data){
            if( !error ) {
//                cc.log(data); //data is the json object
//                console.log(data); 
                this._jsdata = data ;
            }
        });
        
        console.log(this._jsdata) ;
        
        this._airplanes = [] ;
        
        for( var ind = 0; ind < 3; ind++)
        {
            var randNum = getRandomArbitrary(-10, 150) ;
            var randNum2 = getRandomArbitrary(-10, 150) ;
            
            var aPlane = new airplaneSprite() ; //res.airplane_png
            this.addChild(aPlane, 1);

            //getLinePoints (lineConfig, duration);
            var dLine = drawDashedLine(aPlane.getStart(), aPlane.getDestination(), 8.0) ;
            this.addChild(dLine, 0);
            
        }
                              
     
//        for( var ind = 0; ind < 3; ind++)
//        {
//            var randNum = getRandomArbitrary(-10, 150) ;
//            var randNum2 = getRandomArbitrary(-10, 150) ;
//            
//            aSprite = new cc.Sprite(res.airplane_png) ;
//            aSprite.setPosition(cc.p(winSize.width * 0.1, winSize.height/2 + aSprite.getContentSize().height + randNum ))  ;
//            this.addChild(aSprite, 1);
//
//            //getLinePoints (lineConfig, duration);
//            var dLine = drawDashedLine(aSprite.getPosition(), cc.p(winSize.width, (winSize.height / 2)+ randNum2 ), 8.0) ;
//            this.addChild(dLine, 0);
//            
//            var actionTo = new cc.MoveTo( 3.75, cc.p(winSize.width, (winSize.height / 2)+ randNum2 ) )  ;
//            //var actionBy = new cc.MoveTo(2, cc.p(80, 80));
//            aSprite.runAction( actionTo ) ;
//                              
//        }
        
                            
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
//                this._textArea.setString(this._userText) ;
                
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
    
    
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};


function drawDashedLine(origin, destination, dashLength)
{
    var delta = cc.pSub(destination, origin);
    var dist = cc.pDistance(origin, destination);
    var x = delta.x / dist * dashLength;
    var y = delta.y / dist * dashLength;
    var linePercentage = 0.5;
    
    var p1 = origin;
    
    var line = new cc.DrawNode();

    for(var i = 0; i <= dist / dashLength * linePercentage; i++)
    {
        var p2 = cc.p(p1.x + x, p1.y + y);
        //cc.DrawLine(p1, p2);
        //drawSegment(from, to, lineWidth, color)
        line.drawSegment(p1, p2, 4, cc.color.WHTE);
        p1 = cc.p(p1.x + x / linePercentage, p1.y + y / linePercentage);
    }
    
    return line;
};


// lineConfig dictionary with startp and endp
function getLinePoints (lineConfig, duration)
{
    var xsp = lineConfig["startp"].x;
    var xep = lineConfig["endp"].x;
  
    var ysp = lineConfig["startp"].y;
    var yep = lineConfig["endp"].y;

    var maxStep = duration / 0.1 ; 
    var step = Math.abs(xep - xsp) / maxStep ;
    var lPoints = [] ;
    lPoints.push(lineConfig["startp"]);
    
    var dt ; 
    for(dt = 0; dt < maxStep; dt+=step)
    {
        var m = (yep-ysp) / (xep - xsp) ;
        var b = yep - (m*xep) ;
        var x = xsp + dt;
        var y = (m*x) + b;
        
        var newPoint = cc.p(x,y) ;
        lPoints.push(newPoint);
    }
    
    lPoints.push(lineConfig["endp"]);
      
};



function getBezierPoints (bezierConfig, duration)
{
    var locbezier = [cc.p(0, windowSize.height / 2), cc.p(300, -windowSize.height / 2), cc.p(300, 100)];
    
    var locConfig = bezierConfig ;
    var xsp = locConfig[0].x;
    var xcp1 = locConfig[1].x;
    var xcp2 = locConfig[2].x;
    var xep = locConfig[3].x;
  
    var ysp = locConfig[0].x;
    var ycp1 = locConfig[1].y;
    var ycp2 = locConfig[2].y;
    var yep = locConfig[3].y;

    var maxStep = duration / 0.1 ; 
    var step = Math.abs(xep - xsp) / maxStep ;
    var bPoints = [] ;
    bPoints.push(locConfig[0]);
    
    var dt ; 
    for(dt = 0; dt < maxStep; dt++)
    {
        var x = cc.bezierAt(xsp, xcp1, xcp2, xep, dt);
        var y = cc.bezierAt(ysp, ycp1, ycp2, yep, dt);
        
        var newPoint = cc.p(x,y) ;
        bPoints.push(newPoint);
    }
    
    bPoints.push(locConfig[3]);
    
    
};


function bezierAt (a, b, c, d, t) {
    return (Math.pow(1 - t, 3) * a +
        3 * t * (Math.pow(1 - t, 2)) * b +
        3 * Math.pow(t, 2) * (1 - t) * c +
        Math.pow(t, 3) * d );
};

   