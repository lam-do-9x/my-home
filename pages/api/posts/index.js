import { prisma, Prisma } from '../../../lib/prisma';
import prismaErrorCode from '../../../lib/prismaErrorCode';

export default async function handle(req, res) {
  try {
    const data = await prisma.post.create({ data: req.body });
    res.json({data, code: 201});
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.json({error: prismaErrorCode(e.code, e.meta.target[0]), code:400})
    }
  }
}
