const Users = require('../models/UsersData');

module.exports = {
    async read(request, response) {
        const { id } = request.params;

        const user = await Users.findOne({_id: id});

        const { books } = user;

        return response.json(books);
    },
    
    async readOne(request, response) {
        const { id, bookId } = request.params;

        const user = await Users.findOne({_id: id});
        const book = user.books.filter((e) => e.id === bookId)

        if (book.length !== 0) {
            return response.json(...book);
        }
        return response.json({error: "book not found"})
    },

    async add(request, response) {
        const { id } = request.params;
        const {id: bookId} = request.body;

        const user = await Users.findOne({_id: id});
        
        if (user.books.map((book) => book.id === bookId)) {
            const book = user.books.filter((e) => e.id !== bookId)
            user.books = book
        }

        user.books.push(request.body)

        await user.save();

        return response.json(user);
    },

    async delete(request, response) {
        const { id, bookId } = request.params;

        const user = await Users.findOne({_id: id})

        const book = user.books.filter((e) => e.id !== bookId)
        user.books = book

        user.save()

        return response.json(user)
    }
};