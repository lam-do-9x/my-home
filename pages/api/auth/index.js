import jwt from 'jsonwebtoken';

function isValid(email, password) {
    if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password) {
        return true;
    }

    return false;
}

export default async function hander(req, res) {
    const { email, password } = await req.body;
    if(isValid(email, password)) {
        const expiresIn = 60 * 60 * 24;
        const token = jwt.sign( { data: email }, process.env.JWT_SECRET, { expiresIn});
        return res.json({ data: { token, expiresIn}, code: 200 });
    }

    return res.json({ code: 401, message: 'Please check your email or password' });
}