import { prisma } from "../../../lib/prisma";
import { capitalizeFirstLetter } from "../../../lib/helper";

export default async function handle(req, res) {
  switch (req.method) {
    case "POST":
      handlePOST(req, res);
      break;
    case "GET":
      handleGET(req, res);
      break;
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}

async function handleGET(req, res) {
  let operator = {};

  const take = Number(req.query.take);

  const clothes = req.query.clothes?.split(",");

  operator = {
    take,
    where: {
      clothes: {
        path: ["value"],
        equals: clothes,
      },
    },
  };

  if (clothes === undefined) {
    let cursor = undefined;
    if (req.query.id !== "undefined") {
      cursor = { id: Number(req.query.id) };
    }
    operator = {
      take,
      cursor,
      orderBy: {
        id: "desc",
      },
      select: {
        image: true,
        clothes: {
          select: {
            selected: true,
          },
        },
        types: {
          select: {
            selected: true,
          },
        },
      },
    };
  }

  const fashions = await prisma.fashion.findMany(operator);

  const hasLoadMore = take === fashions.length;

  return res.json({ fashions, hasLoadMore, code: 200 });
}

async function handlePOST(req, res) {
  const assignedAt = new Date();
  const createClothes = req.body.clothes?.map((clothe) => {
    if (clothe.__isNew__) {
      return {
        assignedAt,
        selected: {
          create: {
            value: clothe.value,
            label: capitalizeFirstLetter(clothe.value),
          },
        },
      };
    }

    return {
      assignedAt,
      selected: {
        connect: {
          id: clothe.id,
        },
      },
    };
  });

  const createTypes = req.body.types?.map((type) => {
    if (type.__isNew__) {
      return {
        assignedAt,
        selected: {
          create: {
            value: type.value,
            label: capitalizeFirstLetter(type.value),
          },
        },
      };
    }

    return {
      assignedAt,
      selected: {
        connect: {
          id: type.id,
        },
      },
    };
  });

  const fashion = await prisma.fashion.create({
    data: {
      image: req.body.image,
      clothes: { create: createClothes },
      types: { create: createTypes },
    },
  });

  return res.json({ fashion, code: 201 });
}
