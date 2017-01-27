

var textColors = [cc.color.YELLOW, cc.color.GREEN] ;
var lineCnt = 0 ;


var RichConsole = cc.LayerColor.extend({
    _richTextField: null,
    _richElements: [],
    _lineIndex : 1,
    _colour : cc.color.YELLOW,
    _fontName : "Arial",
    _fontSize : 14,
    _reverse : false,
    
    ctor:function() {
        this._super();

        cc.associateWithNative( this, cc.Layer );
        this.init();

        this.addRichTextField();
        
        //_lineIndex = 1;
    },

    title:function () {
        return "Console Output";
    },
    
    onEnter:function () {
        this._super();

        var winSize = cc.winSize;

        var label = cc.LabelTTF.create(this.title(), "Arial", 8);
        this.addChild(label);
        label.setPosition(cc.p(winSize.width / 2, winSize.height - 15));
        
        this.setColor(cc.color.BLACK)
                
    },
    
    addRichTextField: function( )
    {
        this._richTextField = new ccui.RichText( );
        // sets whether or not the element resizes based on its content aka rich text items added below
        this._richTextField.ignoreContentAdaptWithSize( false );
        this._richTextField.width = this.getContentSize().width;
        this._richTextField.height = this.getContentSize().height;
        
        this._richTextField.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.addChild(this._richTextField, 1);
        
//        var re0 = new ccui.RichElementText( 0, cc.color.WHITE, 255, "<0>", "Arial", 12 );
//        this._richTextField.insertElement( re0, 1 );

    },
    
    changeWidthAndHeight: function (w, h) 
    {    
        this._super(w,h);

        //this.width = w;
        //this.height = h;
        
        if(this._richTextField)
        {
            this._richTextField.width = w;
            this._richTextField.height = h;
        
            var size = this._richTextField.getContentSize() ;
            cc.log(size) ;
        }   
    },
    
    setContentSize: function (nSize) 
    {    
        this._super(nSize);

        //this.width = w;
        //this.height = h;
        
        if(this._richTextField)
        {
            this._richTextField.width = nSize.width ;
            this._richTextField.height = nSize.height ;

            var size = this._richTextField.getContentSize() ;
            cc.log(size) ;
            size = this.getContentSize() ;
            cc.log(size) ;
        }
    },
    
    
    log: function( text )
    {
        this._colour = cc.color.YELLOW ;
        var cindex = this._lineIndex % textColors.length  ;
        this._colour = textColors[cindex] ;
        
//        this._fontName = "Arial" ;
//        this._fontSize = 14 ;
        
        if (text && text !== "") 
        {
            
            var nlCnt = (text.match(/\n/gi) || []).length ;
            nlCnt++ ;
            
            for (i = 0; i< nlCnt; i++)
            {
                var newLineText = new ccui.RichElementText( 1, cc.color.WHITE, 255, "\n", this._fontName, this._fontSize ); 
                this._richTextField.insertElement( newLineText, 1 );
                lineCnt++ ;
//                this._richTextField.insertElement( newLineText, lineCnt++ );

            }
             
//            var newLineNode = new cc.Node() ;
//            newLineNode.setContentSize(this._richTextField.getContentSize().width, 0) ;
//            var newLineText = new ccui.RichElementText( 1, cc.color.WHITE, 255, "\n", this._fontName, this._fontSize ); //newLineNode
            //richText.pushBackElement( re1 );
//            this._richTextField.insertElement( newLineText, 1 );
            //this._richTextField.insertElement( newLineText, lineCnt++ );
            
            var superString = "<" + this._lineIndex + "> " + text ;
            var re1 = new ccui.RichElementText( this._lineIndex, this._colour, 255, superString, this._fontName, this._fontSize );
            // insert the element at a particular index
            this._richTextField.insertElement( re1, 1 );
            //this._richTextField.insertElement( re1, lineCnt++ );
            lineCnt++ ;
            
            this._richElements.push(newLineText);
            this._richElements.push(re1);

            
            this._lineIndex++ ;

        }
        
    },
    
    clearLog: function( text )
    {
        cc.log("Clear RichConsole Log") ;
//        for (var element in this._richTextField._richElements)
//            this._richTextField.removeElement( element);
        
        var array = this._richElements; //this._richTextField._richElements ;
        var i = 0 ;
        for (i = 0; i < array.length; i++) 
        {   
            var element = array[i] ;
            this._richTextField.removeElement( element);
        }
        
        lineCnt = 0 ;
        
        cc.log("Cleared "+ i + " log elements") ;

//         var newLineText = new ccui.RichElementText( 1, cc.color.WHITE, 255, "\n ----- \n", this._fontName, this._fontSize ); 
//       this._richTextField.pushBackElement( newLineText );
//         this._richTextField.insertElement( newLineText, 1 );
        
//         var c1 = this._colour ;
        this.log("------") ;
        
    }
    
});

//Node *newLine = Node::create();
//newLine->setContentSize(Size(richText->getContentSize().width, 0.0f));
//richText->pushBackElement(ui::RichElementCustomNode::create(0, Color3B::WHITE, 255, newLine));
//Edit: I found a solution by doing contentSize magic. The anchor point of a scroll view is BOTTOM LEFT and the rich text container's one is MIDDLE.


var RichConsoleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var rclayer = new RichConsole();
        this.addChild(rclayer);
        
        rclayer.setColor(cc.color.BLACK) ;
        //rclayer.setContentSize(cc.size(400, 400)) ;
        
        rclayer.log("Test 1") ;
        rclayer.log("Test 2") ;
        rclayer.log("Test 3") ;
        rclayer.log("Test 4") ;
        rclayer.log("Test 5") ;
        rclayer.log("Test 6") ;
        rclayer.log("Test 7") ;
        rclayer.log("Test 8 : What happens if I log a really long line of text with some of these \n newline char\nacters in them\n") ;
        rclayer.log("Test A") ;
        rclayer.log("Test B") ;
        rclayer.log("Test C") ;
        rclayer.log("Test D") ;
        rclayer.log("Test E") ;
        
        
        var delayAction = cc.DelayTime.create(3);
            //new cc.DelayTime(4.0);
        
        var callBack = function (rtlayer){ rtlayer.clearLog() ; 
                                    rtlayer.setColor(cc.color.BLUE) ;
                                    rtlayer.log("Test I") ;
                                    rtlayer.log("Test II") ;
                                    rtlayer.log("Test III") ;
                                    rtlayer.log("Test IV") ;
                                  } ;
        // calls a functions when the action is run (can be inline or a external function)
        var functionAction = new cc.CallFunc( callBack, rclayer );
        // runs several actions one after another
        var sequenceAction = new cc.Sequence( delayAction, functionAction );
        //rclayer.runAction( sequenceAction );
        
        
        //rclayer.clearLog() ; 
        rclayer.setColor(cc.color.RED) ;
        rclayer.log("Test I") ;
        rclayer.log("Test II") ;
        rclayer.log("Test III") ;
        rclayer.log("Test IV") ;
    }
});



/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 * @author Vitim.us http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function countsInString (text) 
{
    var countOcurrences = function (str, value) {
        var regExp = new RegExp(value, "gi");
        return (str.match(regExp) || []).length;
    }

    var cnt = countOcurrences(text, "\n");

    var count1 = (text.split("\n").length - 1) ;
    var count2 = (text.match(/\n/gi) || []).length;

    var string = text,
            searchFor = '\n',
            count3 = 0,
            pos = string.indexOf(searchFor);

     while (pos > -1) {
       ++count3;
       pos = string.indexOf(searchFor, ++pos);
     }

    console.log(count3); 
}