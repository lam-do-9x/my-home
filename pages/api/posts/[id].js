import { prisma, Prisma } from '../../../lib/prisma';
import prismaErrorCode from '../../../lib/prismaErrorCode';

export default function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            handlePUT(req, res);
            break;
        case 'DELETE':
            handleDELETE(req, res);
            break;
        case 'GET':
            handleGET(req, res);
            break;
        default:
            throw new Error(
                `The HTTP ${req.method} method is not supported at this route.`
            )
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
            return res.json({ message: prismaErrorCode(e.code, e.meta.target[0]), code: 400 })
        }
    }
}

async function handleDELETE(req, res) {
    const id = Number(req.query.id);

    try {
        await prisma.post.delete({
            where: { id }
        });
        return res.json({ data: { id }, message: 'Delete the post successfully!', code: 204 });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return res.json({ message: prismaErrorCode(e.code), code: 400 })
        }
    }
}
