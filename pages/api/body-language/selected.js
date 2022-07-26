import { prisma } from '@lib/prisma'
import { removeDuplicateArrayObject } from '@lib/helper'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

function transformSelected(selected) {
  const selectedSection = selected.map((clothe) => clothe.selected)
  return removeDuplicateArrayObject(selectedSection)
}

async function handle(req, res) {
  const bodyLanguageEmotionSelected =
    await prisma.bodyLanguageEmotionsSelected.findMany({
      select: {
        selected: true,
      },
    })
  const bodyLanguageEmotionSelectedOptions = transformSelected(
    bodyLanguageEmotionSelected
  )

  const bodyLanguageTypesSelected =
    await prisma.bodyLanguageTypesSelected.findMany({
      select: {
        selected: true,
      },
    })
  const bodyLanguageTypesSelectedOptions = transformSelected(
    bodyLanguageTypesSelected
  )

  return res.json({
    bodyLanguageEmotionSelectedOptions,
    bodyLanguageTypesSelectedOptions,
  })
}

export default apiAuthMiddleware(handle)
