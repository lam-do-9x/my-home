import { prisma } from '@lib/prisma'
import { capitalizeFirstLetter } from '@lib/helper'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  switch (req.method) {
    case 'POST':
      handlePOST(req, res)
      break
    case 'GET':
      handleGET(req, res)
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
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
  }

  const orderBy = {
    id: 'desc',
  }
  const take = Number(req.query.take)

  let operator = {}

  const clothes = req.query.clothes

  if (clothes) {
    const clothesSelected = clothes?.split(',').map((clothe) => Number(clothe))

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
    }

    const rawFashions = await prisma.fashionClothesSelected.findMany(operator)
    const fashions = rawFashions.map((fsh) => {
      return fsh.fashion
    })
    return res.json({ fashions, code: 200 })
  }

  if (clothes === undefined || clothes === '') {
    let cursor = undefined
    if (req.query.id !== 'undefined') {
      cursor = { id: Number(req.query.id) }
    }
    operator = {
      take,
      cursor,
      orderBy,
      select: selectedFashion,
    }
  }

  const fashions = await prisma.fashion.findMany(operator)

  const total = await prisma.fashion.count()

  return res.json({ fashions, total, code: 200 })
}

async function handlePOST(req, res) {
  const assignedAt = new Date()
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
      }
    }

    return {
      assignedAt,
      selected: {
        connect: {
          id: clothe.id,
        },
      },
    }
  })

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
      }
    }

    return {
      assignedAt,
      selected: {
        connect: {
          id: type.id,
        },
      },
    }
  })

  const fashion = await prisma.fashion.create({
    data: {
      image: req.body.image,
      clothes: { create: createClothes },
      types: { create: createTypes },
    },
  })

  return res.json({ fashion, code: 201 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
