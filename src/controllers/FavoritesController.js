const Users = require('../models/UsersData');

module.exports = {
    async read(request, response) {
        const { id } = request.params;

        const user = await Users.findOne({_id: id})

        const favoriteBooks = user.books.filter((e) => e.favorite)

        return response.json(favoriteBooks);
    },
};