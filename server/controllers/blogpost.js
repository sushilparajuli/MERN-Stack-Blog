const Blog = require('../models/blog')

exports.posts = function (req, res, next) {
  const title = req.body.title
  const categories = req.body.categories
  const content = req.body.content

  if (!title && !categories && !content ) {
    return res.status(422).send({error: 'You must provide title, categories, content'})
  }
  //if a user with email does not exist, create and save user record
  const NewPost = new Blog({
    title: title,
    categories: categories,
    content : content
  })

  NewPost.save(function (err) {
    if (err) {
      return next(err)
    }
    //Respond to request indicating the user was created

    res.json({success: true})
  })

}
exports.getPosts = function(req, res) {
  Blog.find({}, function (err, docs) {
    res.json(docs)
  })
};

exports.getPost = function(req, res) {
  const id = req.params.id
  Blog.findById(id, function (err, docs) {
    res.json(docs)
  })
};

exports.deletePost = function(req, res) {
  const id = req.params.id
  Blog.findById( id, function( err, post ) {
    return post.remove( function( err ) {
      if( !err ) {
        return res.send( {removed: true} );
      } else {
        console.log( err );
        return res.send('ERROR');
      }
    });
  });
};