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

})