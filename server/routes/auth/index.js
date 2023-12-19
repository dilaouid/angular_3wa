import express from "express";
import jwt from "jsonwebtoken";

const auth = express();

const SECRET = "fd85g4d5f4g5d4f5645^$ù^ùù*$^$^dsfsç_è-ç_iujhdskjhfkjhsdkjfsdghFGFghJHkjhudf"

auth.post('/login', (request, response) => {
    const { username, password } = req.body;

    /////////////
    /////////////

    // création du token JWT
    const token = jwt.sign({}, SECRET, {
        subject: { user: username },
        expiresIn: '1h'
    })

    // on envoie le token dans un cookie httpOnly (parce qu'on est en http)
    response.cookie("token", token, { httpOnly: true });
});