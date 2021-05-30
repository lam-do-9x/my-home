import jwt from 'jsonwebtoken';

export default function checkAuth(ctx, token) {
    if (!token || !jwt.verify(token.split('token=')[1], process.env.JWT_SECRET)) {
        ctx.res.writeHead(302, { Location: `/login?redirect=${ctx.req.url}` });
        ctx.res.end();
    }
}