

var airplaneSprite = cc.Sprite.extend({
    _start : null,                  ///Start point
    _destination : null,            ///End point
    _loops:null,                    ///Loops number in the path
    _trail: null,                   ///Path array
    _flyTime: null,                 ///Total travel time
    _timeDelta: null,             ///time between each point in path
    _return: null,                  /// return trip
    _flip : null,                   /// flip the sprite for return travel

    ctor:function(fileName) {
        
        var fileName = res.airplane_png ;
        this._super(fileName);

//        cc.associateWithNative( this, cc.Layer );
//        this.init();
        
        // ask the window size
        var winSize = cc.winSize;
        var randNum = getRandomArbitrary(-10, 150) ;
        var randNum2 = getRandomArbitrary(-10, 150) ;

        this._start = cc.p( -this.getContentSize().width, winSize.height/2 + this.getContentSize().height + randNum ) ;
        this._destination = cc.p(winSize.width + this.getContentSize().width, (winSize.height / 2)+ randNum2 ) ;
        this._flyTime = 3.75 ;
        //aSprite = new cc.Sprite() ;
        this.setPosition(this._start)  ;
    
        this._loops = 0 ;
        this._trail = 1 ;
        this._timeDelta = this._flyTime / 10 ;

    },
    
    onEnter:function () {
        this._super();

        var winSize = cc.winSize; 
    
        var actionTo = new cc.MoveTo(this._flyTime, this._destination)  ;
        //var actionBy = new cc.MoveTo(2, cc.p(80, 80));
        this.runAction( actionTo ) ;
        //this.flyTo();
        
        this.scheduleUpdate();
        
        var eventListener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan});
        
        cc.eventManager.addListener(eventListener, this);
        
        //cc.pDistance
        //pDistanceSQ
        //CGFloat distance = hypotf(p1.x - p2.x, p1.y - p2.y);
//        CGFloat xDist = (p2.x - p1.x);
//        CGFloat yDist = (p2.y - p1.y);
//        CGFloat distance = sqrt((xDist * xDist) + (yDist * yDist));
                            
    },
        
    /* Update will be called automatically every frame if "scheduleUpdate" is called when the node is "live".<br/>
     * The default behavior is to invoke the visit function of node's componentContainer.<br/>
     * Override me to implement your own update logic.
     * @function
     * @param {Number} dt Delta time since last update
     */
    update: function (dt) {
        this._super() ;
        
        var point = this.getPosition();
        if ( cc.pFuzzyEqual(point, this._destination, 0.0001) )  //cc.pSameAs cc.pFuzzyEqual
        {
            this._flip = !this._flip ;
            this._return = true;
            
            this.setFlippedX(this._flip) ;
            
            var tempPosition = this._start ;
            this._start = this._destination;
            this._destination = tempPosition ;
            
            this.flyTo();
        }
    },
    
    getStart: function() {
        return this._start ;  
    },
    
    getDestination: function () {
        return this._destination ;
    },
    
//    getColor: function () {
//        var locRealColor = this._realColor;
//        return cc.color(locRealColor.r, locRealColor.g, locRealColor.b, locRealColor.a);
//    },
    
    flyTo: function()
    {
        var actionTo = new cc.MoveTo(this._flyTime, this._destination)  ;
        this.runAction( actionTo ) ;        
    },
        
    flyFro: function()
    {
        var actionFro = new cc.MoveTo(this._flyTime, this._start)  ; //_start
        this.runAction( actionFro ) ;  
    },
    
    onTouchBegan:function(touch, event){
        var target = event.getCurrentTarget();
        var PosInScreen = target.convertToNodeSpace(touch.getLocation());
        var Size = target.getContentSize();
        var rect = cc.rect(0, 0, Size.width, Size.height);

        if(cc.rectContainsPoint(rect, PosInScreen)){
            if(target.getTag()== -1) 
            {
                target.stopAllActions();
                var scaleAction = new cc.ScaleTo(1.25, 2.0) ;
                var callBack = function (sender){
                    var txtLayer = new TextInputUILayer() ;
                    txtLayer.setTag(10) ;
//                    sender._parent.addChild( txtLayer, 10 );
                                  } ;
                var callAction = new cc.callFunc( callBack, this ) ;
                var seqAction = new cc.Sequence(scaleAction,callAction) ;
                target.runAction(seqAction) ;
                //target.removeFromParent();
                //this._order++;
                return true ;
            }
            
//            var scene = new RichConsoleScene();
//            if (scene) 
//            {
//                cc.director.runScene(scene);
//            }
        }
        
        
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
                
                //TextEntryLayer
                var scene = new RichConsoleScene();
                if (scene) 
                {
                    cc.director.runScene(scene);
                }
                
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

function getBezierArray(configArray, duration) 
{
    var locConfig = [cc.p(0, windowSize.height / 2), cc.p(300, -windowSize.height / 2), cc.p(300, 100)];
    
    maxStep = duration / 0.1 ;
    
    var xa = 0;
    var xb = locConfig[0].x;
    var xc = locConfig[1].x;
    var xd = locConfig[2].x;

    var ya = 0;
    var yb = locConfig[0].y;
    var yc = locConfig[1].y;
    var yd = locConfig[2].y;

    var dt = 0 ;
    
    var pointArray = [];
    
    for (dt = 0; dt< maxStep; dt++)
    {
        var x = cc.bezierAt(xa, xb, xc, xd, dt);
        var y = cc.bezierAt(ya, yb, yc, yd, dt);

        pointArray.push(cc.p(x,y)) ;
    }
    
    return pointArray ;
    
    //return (Math.pow(1-t,3) * a + 3*t*(Math.pow(1-t,2))*b + 3*Math.pow(t,2)*(1-t)*c + Math.pow(t,3)*d );

};
    
//function bezierAt = function (a, b, c, d, t) {
//    return (Math.pow(1 - t, 3) * a +
//            3 * t * (Math.pow(1 - t, 2)) * b +
//            3 * Math.pow(t, 2) * (1 - t) * c +
//            Math.pow(t, 3) * d );
//};
    
