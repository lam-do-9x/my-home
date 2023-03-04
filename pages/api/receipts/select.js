import { prisma } from '@lib/prisma'
import { removeDuplicateArrayObject } from '@lib/helper'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

function transformSelected(select) {
  const selectedSection = select.map((cloth) => cloth.select)
  return removeDuplicateArrayObject(selectedSection)
}

async function handle(req, res) {
  const receiptIngredientsSelect =
    await prisma.receiptIngredientsSelect.findMany({
      select: {
        select: true,
      },
    })
  const receiptIngredients = transformSelected(receiptIngredientsSelect)

  const receiptSessionsSelect = await prisma.receiptSessionsSelect.findMany(
    {
      select: {
        select: true,
      },
    }
  )
  const receiptSessions = transformSelected(receiptSessionsSelect)

  const receiptMethodsSelect = await prisma.receiptMethodsSelect.findMany({
    select: {
      select: true,
    },
  })
  const receiptMethods = transformSelected(receiptMethodsSelect)

  return res.json({ receiptIngredients, receiptSessions, receiptMethods })
}

export default apiAuthMiddleware(handle)
