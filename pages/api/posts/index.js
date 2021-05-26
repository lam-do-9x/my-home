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
  let { isPublished, take } = req.query;
  let where = {};
  let select = {};
  const postCount = await prisma.post.count();

  if (isPublished && take) {
    where['isPublished'] = true;
    where['publishedDate'] = {
        lte: new Date()
    }
    select = {
      publishedDate: true,
      slug: true,
      title: true,
      content: true
    }
  }
  if (!take && isPublished) {
    take = postCount;
    select = {
      publishedDate: true,
      slug: true,
      title: true
    }
  }

  if (!take && !isPublished) {
    take = postCount;
    select = {
      id: true,
      title: true,
      publishedDate: true,
      isPublished: true
    }
  }

  const posts = await prisma.post.findMany({
    where,
    take: Number(take),
    orderBy: {
      publishedDate: 'desc'
    },
    select
  });

  return res.json({ posts, code: 200 });
  }
