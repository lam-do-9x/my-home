import { prisma, Prisma } from '../../../lib/prisma';
import prismaErrorCode from '../../../lib/prismaErrorCode';

export default function handler(req, res) {
    if (req.method === 'PUT') {
        handlePUT(req, res);
    } else {
        handleGET(req, res);
    }
}

async function handleGET(req, res) {
    const { id } = req.query;
    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    });
    return res.json({ post, code: 200 });
}

async function handlePUT(req, res) {
    const { id } = req.query;

    try {
        const post = await prisma.post.update({
            where: {
                id: Number(id)
            },
            data: req.body
        });
        return res.json({ post, code: 201 });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return res.json({ error: prismaErrorCode(e.code, e.meta.target[0]), code: 400 })
        }
    }
}
