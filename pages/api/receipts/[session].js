import { prisma } from "../../../lib/prisma";
import { randInt } from "../../../lib/randomWord";

export default async function handle(req, res) {
  const selected = await prisma.selected.findUnique({
    where: {
      value: req.query.session,
    },
    select: {
      id: true,
    },
  });

  const receipts = await prisma.receiptSessionsSelected.findMany({
    select: {
      receipt: {
        select: {
          name: true,
        },
      },
    },
    where: {
      selected: {
        id: { in: [Number(selected.id)] },
      },
    },
    distinct: ["receiptId"],
  });

  const { receipt } = receipts[randInt(receipts.length - 1)];

  return res.json({ receipt, code: 200 });
}
