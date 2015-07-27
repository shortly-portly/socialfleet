/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  myPosts: function(req, res) {
    Post.find({owner: req.userId}, function(err, posts) {
      res.json(posts);
    })
  },

  tweet: function(req, res) {

		User.findOne(req.userId, function(err, user) {

			var message = req.body.message;
      var datetime = req.body.scheduledFor;

      Post.create({
        message: message,
        scheduledFor: datetime,
        isPosted: false,
        owner: req.userId
      }).exec(function(err, post) {
        console.log("working", post, err);
        res.status('200').end();
      });

  	})
	}
}
