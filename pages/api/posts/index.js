import { prisma, Prisma } from '../../../lib/prisma';
import prismaErrorCode from '../../../lib/prismaErrorCode';

export default async function handle(req, res) {
  if (req.method === 'POST') {
    handlePOST(req, res);
  } else {
    handleGET(req, res);
  }
}

async function handlePOST(req, res) {
  try {
    const data = await prisma.post.create({ data: req.body });
    return res.json({ data, code: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.json({ message: prismaErrorCode(e.code, e.meta.target[0]), code: 400 })
    }
  }
}

async function handleGET(req, res) {
  const posts = await prisma.post.findMany();
  return res.json({ posts, code: 200 });
}
