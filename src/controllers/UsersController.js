const Users = require('../models/UsersData');

module.exports = {
    async create(request, response) {
        const { username, email, password, books } = request.body;

        const verifyEmail = await Users.findOne({email: email})
        const verifyUsername = await Users.findOne({username: username})

        if (verifyEmail === null) {
            if (verifyUsername === null) {
                if (password.length > 6) {
                    const userCreated = await Users.create({
                        username,
                        email,
                        password,
                        books,
                    });
            
                    return response.json(userCreated);
                }
                return response.json({error: "password needs to have more than 6 characters"})
            }
            return response.json({error: "username already taken"})
        }
        return response.json({error: "an account with this email already exists"})
    },

    async update(request, response) {
        const { id } = request.params;
        const { username, email, password } = request.body;
        
        const user = await Users.findOne({_id: id});
        
        if (username !== '') {
            const verifyUsername = await Users.findOne({username: new RegExp('^' + username + '$', 'i')})

            if (verifyUsername === null || username.toLowerCase() === user.username.toLowerCase()) {
                user.username = username
            }

            if (verifyUsername !== null && verifyUsername._id.toString() !== id) {
                return response.json({error: "username already taken"})
            }
        }

        if (email !== '') { 
            const verifyEmail = await Users.findOne({email: new RegExp('^' + email + '$', 'i')})

            if (verifyEmail === null && email.toLowerCase() === user.email.toLowerCase()) {
                user.email = email
            }

            if (verifyEmail !== null && verifyEmail._id.toString() !== id) {
                return response.json({error: "email already exists"})
            }
        }

        if (password !== '') {
            user.password = password
        }

        await user.save();

        return response.json(user)
    },

    async read(request, response) {
        const usersList = await Users.find();

        return response.json(usersList);
    },

    async readOne(request, response) {
        const { id } = request.params; 

        const user = await Users.findOne({_id: id});

        return response.json(user);
    },

    async login(request, response) {
        const { email, password } = request.body;

        const user = await Users.findOne({email: email}) 

        if (user !== null) {
            if (user.password === password) {
                return response.json(user);
            }
        }
        return response.json({error: "wrong email and/or password"})
    },

    async delete(request, response) {
        const { id } = request.params;

        const userDeleted = await Users.findOneAndDelete({_id: id})

        if (userDeleted) {
            return response.json(userDeleted)
        }

        return response.json({error: "id not founded"})
    }
};