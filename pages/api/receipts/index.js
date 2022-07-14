import { prisma } from "../../../lib/prisma";
import { capitalizeFirstLetter } from "../../../lib/helper";

export default async function handle(req, res) {
  switch (req.method) {
    case "GET":
      handleGET(req, res);
      break;
    case "POST":
      handlePOST(req, res);
      break;
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}

async function handleGET(req, res) {
  const selectedReceipt = {
    id: true,
    name: true,
    cover: true,
    note: true,
    reference: true,
    sessions: {
      select: {
        selected: true,
      },
    },
    methods: {
      select: {
        selected: true,
      },
    },
  };

  const take = Number(req.query.take);
  const skip = Number(req.query.skip);

  let operator = {
    orderBy: {
      id: "desc",
    },
  };

  const total = await prisma.receipt.count(operator);

  const pageCount = Math.ceil(total / take);

  const receipts = await prisma.receipt.findMany({
    take,
    skip,
    ...operator,
    select: selectedReceipt,
  });

  return res.json({ receipts, pageCount, code: 200 });
}

async function handlePOST(req, res) {
  const assignedAt = new Date();

  const createIngredients = req.body.ingredients?.map((ingredient) => {
    if (ingredient.__isNew__) {
      return {
        assignedAt,
        selected: {
          create: {
            value: ingredient.value,
            label: capitalizeFirstLetter(ingredient.value),
          },
        },
      };
    }

    return {
      assignedAt,
      selected: {
        connect: {
          id: ingredient.id,
        },
      },
    };
  });

  const createSessions = req.body.sessions?.map((session) => {
    if (session.__isNew__) {
      return {
        assignedAt,
        selected: {
          create: {
            value: session.value,
            label: capitalizeFirstLetter(session.value),
          },
        },
      };
    }

    return {
      assignedAt,
      selected: {
        connect: {
          id: session.id,
        },
      },
    };
  });

  const createMethods = req.body.methods?.map((method) => {
    if (method.__isNew__) {
      return {
        assignedAt,
        selected: {
          create: {
            value: method.value,
            label: capitalizeFirstLetter(method.value),
          },
        },
      };
    }

    return {
      assignedAt,
      selected: {
        connect: {
          id: method.id,
        },
      },
    };
  });

  const { cover, name, reference, note } = req.body;

  const receipt = await prisma.receipt.create({
    data: {
      ingredients: { create: createIngredients },
      sessions: { create: createSessions },
      methods: { create: createMethods },
      cover,
      name,
      reference,
      note,
    },
  });

  return res.json({ receipt, code: 201 });
}
