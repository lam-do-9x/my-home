import { databaseNotion } from '@lib/notion'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  const id = process.env.NOTION_PRONUNCIATION_ID
  let body = {
    sorts: [
      {
        property: 'type',
        direction: 'descending',
      },
    ],
  }

  const { results } = await databaseNotion(id, body)

  return res.json({ pronunciations: results, code: 200 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
