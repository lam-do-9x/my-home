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
  const selectedFashion = {
    id: true,
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
  };

  const orderBy = {
    id: "desc",
  };
  const take = Number(req.query.take);

  let operator = {};

  const clothes = req.query.clothes;

  if (clothes) {
    const clothesSelected = clothes?.split(",").map((clothe) => Number(clothe));

    operator = {
      select: {
        fashion: {
          select: selectedFashion,
        },
      },
      where: {
        selected: {
          id: { in: clothesSelected },
        },
      },
    };

    const rawFashions = await prisma.fashionClothesSelected.findMany(operator);
    const fashions = rawFashions.map((fsh) => {
      return fsh.fashion;
    });
    return res.json({ fashions, code: 200 });
  }

  if (clothes === undefined || clothes === "") {
    let cursor = undefined;
    if (req.query.id !== "undefined") {
      cursor = { id: Number(req.query.id) };
    }
    operator = {
      take,
      cursor,
      orderBy,
      select: selectedFashion,
    };
  }

  const fashions = await prisma.fashion.findMany(operator);

  const total = await prisma.fashion.count();

  return res.json({ fashions, total, code: 200 });
}

async function handlePOST(req, res) {
  const assignedAt = new Date();
  const createEmotions = [req.body.emotions]?.map((emotion) => {
    if (emotion.__isNew__) {
      return {
        assignedAt,
        selected: {
          create: {
            value: emotion.value,
            label: capitalizeFirstLetter(emotion.value),
          },
        },
      };
    }

    return {
      assignedAt,
      selected: {
        connect: {
          id: emotion.id,
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

  const bodyLanguage = await prisma.bodyLanguage.create({
    data: {
      media: req.body.media,
      emotions: { create: createEmotions },
      types: { create: createTypes },
    },
  });

  return res.json({ bodyLanguage, code: 201 });
}
