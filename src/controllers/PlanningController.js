const Users = require('../models/UsersData');

module.exports = {
    async read(request, response) {
        const { id } = request.params;

        const user = await Users.findOne({_id: id})

        const planningBooks = user.books.filter((e) => e.planning)

        return response.json(planningBooks);
    },
};