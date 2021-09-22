const listHelper = require('../utils/list_helper')

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that blog', () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Test Blog',
                author: 'Testy McTestface',
                url: 'https://example.com',
                likes: 25,
                __v: 0
            }
        ]

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(25)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Test Blog',
                author: 'Testy McTestface',
                url: 'https://example.com',
                likes: 25,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Another test blog',
                author: 'Bored Tester',
                url: 'http://inescure.website.com',
                likes: 10,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'Robert Tech Quickies',
                author: 'Robert Sebastian',
                url: 'https://rtq.com',
                likes: 5,
                __v: 0
            }
        ]

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(40)
    })
})