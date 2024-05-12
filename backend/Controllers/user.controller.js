import UserModel from './../models/User.model.js';
import validator from 'validator';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    console.log('registerUser');;
    try {
        const { username, email, password } = req.body;
        let user = await UserModel.findOne({ $or: [{ email: email }, { username: username }] });
        console.log('user', user.username, username);
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Veuillez remplir tous les champs' });
        }

        if (user.email === email) {
            return res.status(400).json({ error: 'L\'adresse e-mail saisie existe déjà.' })
        }

        if(user.username === username) {
            return res.status(400).json({ error: 'le nom d\'utilisateur saisi existe déjà.' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Une adresse email valide est requise' });
        }

        if (!validator.isLength(username, { min: 3, max: 15 })) {
            return res.status(400).json({ error: 'Le nom d\'utilisateur doit contenir entre 3 et 15 caractères' });
        }

        if (!validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
        })) {
            return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email,
        })

        if (newUser) {
            await newUser.save();
            res.status(200).json({
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
            });

        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const loginUser = async (req, res) => {
    console.log('loginUser');
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid username or password' });
        const isValidPassword = await bcrypt.compare(password, user.password || '');
        if (!isValidPassword) return res.status(400).json({ error: 'Invalid username or password' });
        await user.save();
        res.status(200).json({
            _id: user._id,
            username: user.username,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export { registerUser, loginUser };
