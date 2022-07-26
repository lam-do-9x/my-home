import { prisma } from '@lib/prisma'
import { removeDuplicateArrayObject } from '@lib/helper'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

function transformSelected(selected) {
  const selectedSection = selected.map((clothe) => clothe.selected)
  return removeDuplicateArrayObject(selectedSection)
}

async function handle(req, res) {
  const fashionClothesSelected = await prisma.fashionClothesSelected.findMany({
    select: {
      selected: true,
    },
  })
  const clothesSelectedOptions = transformSelected(fashionClothesSelected)

  const fashionTypesSelected = await prisma.fashionTypesSelected.findMany({
    select: {
      selected: true,
    },
  })
  const typesSelectedOptions = transformSelected(fashionTypesSelected)

  return res.json({ clothesSelectedOptions, typesSelectedOptions })
}

export default apiAuthMiddleware(handle)
