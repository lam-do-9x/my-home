import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const improvisation = await prisma.improvisation.update({
    where: {
      id: Number(req.query.id),
    },
    data: req.body,
  });

  return res.json({ improvisation, code: 200 });
}
