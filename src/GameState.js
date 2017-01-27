//http://discuss.cocos2d-x.org/t/how-i-can-save-game-progress-to-json/18124/4

var GameState = cc.Class.extend({

    	data: null,
    	loadCallback: null,

    	load: function(loadCallback) {
    		this.loadCallback = loadCallback;

    		var self = this;
    		cc.loader.loadJson(res.GameState_json, function(error, data){
    			self.data = data;
    			self.loadCallback();
    		});
    	},

    	save: function(){
    		cc.sys.localStorage.removeItem("GameState");
    		cc.sys.localStorage.setItem("GameState", JSON.stringify(this.data));
    	}
     });

var gameState = new GameState();

gameState.load(function(){ //load game state
            cc.log("state loaded");

});