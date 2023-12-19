import jwt from 'jsonwebtoken';

const SECRET = "fd85g4d5f4g5d4f5645^$ù^ùù*$^$^dsfsç_è-ç_iujhdskjhfkjhsdkjfsdghFGFghJHkjhudf"

export const checkToken = (request, response, next) => {
    const token = request.cookies.token; // on récupère le token dans le cookie
    if (!token)
        return response.status(401).json({message: 'Unauthorized'});
    try {
        const verified = jwt.verify(token, SECRET); // on vérifie si le jwt = ok
        next(); // on peut accéder au controller sans soucis
    } catch(err) {
        // sinon page d'erreur
        return response.status(400).json({message: 'Token is invalid'});
    }
}