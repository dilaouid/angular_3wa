import express from "express";
import jwt from "jsonwebtoken";
import { checkToken } from "../../middlewares";

const auth = express();

const SECRET = "fd85g4d5f4g5d4f5645^$ù^ùù*$^$^dsfsç_è-ç_iujhdskjhfkjhsdkjfsdghFGFghJHkjhudf"

auth.post('/login', (request, response) => {
    const { username, password } = request.body;

    // on vérifie que les champs sont bien remplis (pas vide)
    if (!username?.trim() || !password?.trim())
        return response.status(400).json({message: 'Missing fields'});
    
    // on vérifie que le username et le password sont corrects (admin/admin, on écrit pas en dur
    // mais en temps normal, on va chercher dans la base de données)
    if (username !== 'admin' || password !== 'admin')
        return response.status(400).json({message: 'Invalid credentials'});

    try {
        // création du token JWT
        const token = jwt.sign({}, SECRET, {
            subject: { user: username },
            expiresIn: '1h'
        })

        // on envoie le token dans un cookie httpOnly (parce qu'on est en http)
        response.cookie("token", token, { httpOnly: true });

        // on envoie une réponse API pour dire que tout est OK
        response.status(200).json({message: 'OK!'});
    } catch(err) {
        // si la création du token a échoué, on envoie une erreur
        response.status(400).json(err);
    }
});

auth.get('/logout', (request, response) => {
    // on supprime le cookie token
    response.clearCookie('token');

    // on envoie une réponse API pour dire que tout est OK
    response.status(200).json({message: 'OK!'});
});

auth.get('/me', checkToken, (request, response) => {
    // on récupère le token dans le cookie
    const token = request.cookies.token;

    // on vérifie que le token est valide
    try {
        const verified = jwt.verify(token, SECRET);
        response.status(200).json(verified);
    } catch(err) {
        response.status(400).json(err);
    }
});

export default auth;