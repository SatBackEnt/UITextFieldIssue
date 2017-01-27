


/****************************************************************************
 Copyright (c) 2012 Roger Clark
 www.rogerclark.net

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var DashedLineSprite = cc.Sprite.extend(
    {
        _dashArray:null,
        _startX:null,
        _endX:null,
        _startY:null,
        _endY:null,
        ctor:function (startX,startY,endX,endY,dashArray)
        {
            this._super();

            this._startX= startX * cc.CONTENT_SCALE_FACTOR();
            this._startY =startY * cc.CONTENT_SCALE_FACTOR() * -1;
            this._endX =  endX * cc.CONTENT_SCALE_FACTOR();
            this._endY =endY * cc.CONTENT_SCALE_FACTOR() * -1;
            if (!dashArray)
            {
                this._dashArray=[10,5];
            }
            else
            {
                this._dashArray=dashArray;
            }
        },
        draw:function () {
            cc.renderContext.fillStyle = "rgba(255,255,255,1)";// Hardcoded colour
            cc.renderContext.strokeStyle = "rgba(255,255,255,1)";// Hardcoded colour
            cc.renderContext.beginPath();

            var x=this._startX;
            var y=this._startY;
            var x2=this._endX;
            var y2=this._endY;

            if (dashLength==0)
            {
                dashLength = 0.001;
            } // Hack for Safari
            var dashCount = this._dashArray.length;

            cc.renderContext.moveTo(x , y );
            var dx = (x2-x), dy = (y2-y);
            var slope = dy/dx;
            var distRemaining = Math.sqrt( dx * dx + dy * dy );
            var dashIndex=0, draw=true;
            while (distRemaining>=0.1)
            {
                var dashLength = this._dashArray[dashIndex++ % dashCount];
                if (dashLength > distRemaining)
                {
                    dashLength = distRemaining;
                }
                var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
                if (dx<0)
                {
                    xStep = -xStep;
                }
                x += xStep
                y += slope*xStep;
                if (draw)
                {
                    cc.renderContext.lineTo(x ,y );
                }
                else
                {
                    cc.renderContext.moveTo(x ,y );
                }
                distRemaining -= dashLength;
                draw = !draw;
            }
            cc.renderContext.closePath();
            cc.renderContext.stroke();
        }
    }
)



var line = new cc.DrawNode();
line.drawSegment(cc.p(50,50), cc.p(200,200),2);


var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
if (CP && CP.lineTo){
  CP.dashedLine = function(x,y,x2,y2,dashArray){
    if (!dashArray) dashArray=[10,5];
    if (dashLength==0) dashLength = 0.001; // Hack for Safari
    var dashCount = dashArray.length;
    this.moveTo(x, y);
    var dx = (x2-x), dy = (y2-y);
    var slope = dx ? dy/dx : 1e15;
    var distRemaining = Math.sqrt( dx*dx + dy*dy );
    var dashIndex=0, draw=true;
    while (distRemaining>=0.1){
      var dashLength = dashArray[dashIndex++%dashCount];
      if (dashLength > distRemaining) dashLength = distRemaining;
      var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
      if (dx<0) xStep = -xStep;
      x += xStep
      y += slope*xStep;
      this[draw ? 'lineTo' : 'moveTo'](x,y);
      distRemaining -= dashLength;
      draw = !draw;
    }
  }
}

// Fixed: Minus xStep bug (when x2 < x, original code bugs)
// Fixed: Vertical line bug (when abs(x - x2) is zero, original code bugs because of NaN)
var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
if(CP && CP.lineTo) CP.dashedLine = function(x, y, x2, y2, dashArray){
    if(! dashArray) dashArray=[10,5];
    var dashCount = dashArray.length;
    var dx = (x2 - x);
    var dy = (y2 - y);
    var xSlope = (Math.abs(dx) > Math.abs(dy));
    var slope = (xSlope) ? dy / dx : dx / dy;

    this.moveTo(x, y);
    var distRemaining = Math.sqrt(dx * dx + dy * dy);
    var dashIndex = 0;
    while(distRemaining >= 0.1){
        var dashLength = Math.min(distRemaining, dashArray[dashIndex % dashCount]);
        var step = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
        if(xSlope){
            if(dx < 0) step = -step;
            x += step
            y += slope * step;
        }else{
            if(dy < 0) step = -step;
            x += slope * step;
            y += step;
        }
        this[(dashIndex % 2 == 0) ? 'lineTo' : 'moveTo'](x, y);
        distRemaining -= dashLength;
        dashIndex++;
    }
}


var DashedLineSprite = cc.Sprite.extend(
    {
        _dashArray:null,
        _startX:null,
        _endX:null,
        _startY:null,
        _endY:null,
        ctor:function (startX,startY,endX,endY,dashArray)
        {
            this._super();

            this._startX= startX * cc.CONTENT_SCALE_FACTOR();
            this._startY =startY * cc.CONTENT_SCALE_FACTOR() * -1;
            this._endX =  endX * cc.CONTENT_SCALE_FACTOR();
            this._endY =endY * cc.CONTENT_SCALE_FACTOR() * -1;
            if (!dashArray)
            {
                this._dashArray=[10,5];
            }
            else
            {
                this._dashArray=dashArray;
            }
        },
        draw:function () {
            cc.renderContext.fillStyle = "rgba(255,255,255,1)";
            cc.renderContext.strokeStyle = "rgba(255,255,255,1)";
            cc.renderContext.beginPath();

            var x=this._startX;
            var y=this._startY;
            var x2=this._endX;
            var y2=this._endY;

            if (dashLength==0)
            {
                dashLength = 0.001;
            } // Hack for Safari
            var dashCount = this._dashArray.length;

            cc.renderContext.moveTo(x , y );
            var dx = (x2-x), dy = (y2-y);
            var slope = dy/dx;
            var distRemaining = Math.sqrt( dx * dx + dy * dy );
            var dashIndex=0, draw=true;
            while (distRemaining>=0.1)
            {
                var dashLength = this._dashArray[dashIndex++ % dashCount];
                if (dashLength > distRemaining)
                {
                    dashLength = distRemaining;
                }
                var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
                if (dx<0)
                {
                    xStep = -xStep;
                }
                x += xStep
                y += slope*xStep;
                if (draw)
                {
                    cc.renderContext.lineTo(x ,y );
                }
                else
                {
                    cc.renderContext.moveTo(x ,y );
                }
                distRemaining -= dashLength;
                draw = !draw;
            }
            cc.renderContext.closePath();
            cc.renderContext.stroke();
        }
    }
)