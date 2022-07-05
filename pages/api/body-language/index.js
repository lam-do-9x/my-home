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
  const selectedBodyLanguage = {
    id: true,
    media: true,
    emotions: {
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

  const take = Number(req.query.take);
  const skip = Number(req.query.skip);

  let operator = {
    orderBy: {
      id: "desc",
    },
  };

  const emotions = req.query.emotions;

  if (emotions && emotions !== "undefined") {
    const emotionsSelected = emotions
      ?.split(",")
      .map((emotion) => Number(emotion));

    operator = {
      where: {
        selected: {
          id: { in: emotionsSelected },
        },
      },
    };

    const bodyLanguagesRaw = await prisma.bodyLanguageEmotionsSelected.findMany(
      {
        take,
        skip,
        select: {
          bodyLanguage: {
            select: selectedBodyLanguage,
          },
        },
        ...operator,
      }
    );
    const bodyLanguages = bodyLanguagesRaw.map((bl) => {
      return bl.bodyLanguage;
    });

    const total = await prisma.bodyLanguageEmotionsSelected.count(operator);

    const pageCount = Math.ceil(total / take);

    return res.json({ bodyLanguages, pageCount, code: 200 });
  }

  const total = await prisma.bodyLanguage.count(operator);

  const pageCount = Math.ceil(total / take);

  const bodyLanguages = await prisma.bodyLanguage.findMany({
    take,
    skip,
    ...operator,
    select: selectedBodyLanguage,
  });

  return res.json({ bodyLanguages, pageCount, code: 200 });
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
