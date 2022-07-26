import { prisma } from '@lib/prisma'
import { removeDuplicateArrayObject } from '@lib/helper'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

function transformSelected(selected) {
  const selectedSection = selected.map((clothe) => clothe.selected)
  return removeDuplicateArrayObject(selectedSection)
}

async function handle(req, res) {
  const receiptIngredientsSelected =
    await prisma.receiptIngredientsSelected.findMany({
      select: {
        selected: true,
      },
    })
  const receiptIngredients = transformSelected(receiptIngredientsSelected)

  const receiptSessionsSelected = await prisma.receiptSessionsSelected.findMany(
    {
      select: {
        selected: true,
      },
    }
  )
  const receiptSessions = transformSelected(receiptSessionsSelected)

  const receiptMethodsSelected = await prisma.receiptMethodsSelected.findMany({
    select: {
      selected: true,
    },
  })
  const receiptMethods = transformSelected(receiptMethodsSelected)

  return res.json({ receiptIngredients, receiptSessions, receiptMethods })
}

export default apiAuthMiddleware(handle)
