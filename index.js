const { Comment, Like, Post, Profile, User } = require("./models/index");


// Define your associations here

// One to One, the User OWNS the unique Profile.
// Profile belongs to User
User.hasOne(Profile);
Profile.belongsTo(User);

// One to Many, the POST belongs to USER,
// The USER can have MANY POSTS
Post.belongsTo(User);
User.hasMany(Post);

// Many to Many,
// A POST CAN HAVE MANY COMMENTS
// MANY USERS CAN COMMENT BE ON MANY POSTS
Comment.belongsTo(Post);
Post.hasMany(Comment);

// Many to Many
// A USER CAN LIKE MANY POSTS
// A POST CAN HAVE BE LIKED BY MANY USERS
User.hasMany(Like);
Like.hasMany(User);


module.exports = {
    Comment,
    Like,
    Post,
    Profile,
    User
}