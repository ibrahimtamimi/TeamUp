var Game = require('../games/gameModel.js');
var Player = require('../users/userModel.js');
var Comment = require ('./commentModel.js');

module.exports = {
	insertComment : function (req, res) {
		var newComment = new Comment({
			from : req.body.userId,
			text : req.body.text,
			game : req.params.id
		});
		newComment.save(function (err,comment) {
		  if(comment){
			res.status(201).send(comment);
		  	console.log("comment saved");
		  }else {
		  	res.status(500).send( err)
		  }
		});
	},
	
	getComments :function (req, res) {
		Comment.find({ game : req.params.id}).exec(function (err,allComment) {
			if(err){
				res.status(500).send('err');
			}else{
				var players=[];
				for (var i = 0; i < allComment.length; i++) {
					Player.findOne({_id:allComment[i].from}).exec(function (err , player) {
						players.push(player)
						if(players.length===allComment.length){
							res.json({allComment:allComment , players: players});
						}
					});
				}
			}
		});
	}
}