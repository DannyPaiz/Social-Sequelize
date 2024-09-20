const { Comment, Like, Post, Profile, User } = require("./index");
const { sequelize } = require('./db/connection')

const users = require('./seed/users.json');
const profiles = require('./seed/profiles.json');
const posts = require('./seed/posts.json');
const comments = require('./seed/comments.json');
const likes = require('./seed/likes.json');

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await sequelize.sync({ force: true });
    })

    // Write your tests here
    // test('can create a User via CREATE', async () => {
    //     const testUser = await User.create({
    //         username: 'testUser',
    //         email: 'test@mail.com'
    //     })
    //     expect(testUser.username).toBe('testUser')
    //     expect(testUser.email).toBe('test@mail.com')
    // })

    test("can create a User via BULK CREATE, seed data file", async function () {
        // console.log(users)
        await User.bulkCreate(users);
        const foundUser = await User.findByPk(1);

        expect(foundUser).toEqual(expect.objectContaining(users[0]));
    })

    test("can create a PROFILE via BULK CREATE, seed data file", async () => {
        await Profile.bulkCreate(profiles);
        const foundProfile = await Profile.findByPk(1);

        expect(foundProfile).toEqual(expect.objectContaining(profiles[0]));
    })

    test("can create a POST via BULK CREATE, seed data file", async () => {
        await Post.bulkCreate(posts);
        const foundPosts = await Post.findByPk(1);

        expect(foundPosts).toEqual(expect.objectContaining(posts[0]));
    })

    test("can create a COMMENT via BULK CREATE, seed data file", async () => {
        await Comment.bulkCreate(comments);
        const foundComments = await Comment.findByPk(1);

        expect(foundComments).toEqual(expect.objectContaining(comments[0]))

    })

    test("can create a LIKE via BULK CREATE, seed data file", async () => {
        await Like.bulkCreate(likes);
        const foundLikes = await Like.findByPk(1);

        expect(foundLikes).toEqual(expect.objectContaining(likes[0]))
    })

    // ====== Associations =======
    test("ONE TO MANY, users can have only 1 profile", async () => {
        await sequelize.sync({ force: true }) // reset DB

        let myUser = await User.create(users[0]);
        let myProfile = await Profile.create(profiles[0]);

        await myUser.setProfile(myProfile);

        const associatedProfile = await myUser.getProfile();
        expect(associatedProfile instanceof Profile).toBeTruthy();
    })

    test("one user can make many likes, ONE TO MANY", async function() {
        await sequelize.sync({ force: true }) // reset DB
        let myUser = await User.create(users[0]);
        let myLike1 = await Like.create(likes[0]);
        let myLike2 = await Like.create(likes[1]);

        await myUser.addLike(myLike1);
        await myUser.addLike(myLike2);

        const associatedLikes = await myUser.getLikes();

        expect(associatedLikes.length).toBe(2);
        expect(associatedLikes instanceof Like).toBeTruthy;

    })

    test("Likes can have many users", async () => {
        await sequelize.sync({ force: true }) // reset db

        let myLike = await Like.create(likes[0]);
        let user1 = await User.create(users[0]);
        let user2 = await User.create(users[1]);

        await myLike.addUser(user1);
        await myLike.addUser(user2);

        const associatedUsers = await myLike.getUsers();

        expect(associatedUsers.length).toBe(2);
        expect(associatedUsers instanceof User).toBeTruthy;
    })

    test("User can have many posts, POST belongs to 1 USER", async () => {
        await sequelize.sync({ force: true });

        let myPost1 = await Post.create(posts[0]);
        let myPost2 = await Post.create(posts[1]);
        let myUser = await User.create(users[0]);

        await myUser.addPost(myPost1);
        await myUser.addPost(myPost2);
        
        const associatedPosts = await myUser.getPosts();
        expect(associatedPosts.length).toBe(2);
        expect(associatedPosts instanceof Post).toBeTruthy;

    })


})