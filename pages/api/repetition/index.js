import { databaseNotion } from '@lib/notion'
import { formatDate } from '@lib/dateTime'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  const id = process.env.NOTION_REPETITION_ID

  const body = {
    sorts: [
      {
        property: 'Topic',
        direction: 'descending',
      },
    ],
    filter: {
      property: 'Repeat Date',
      date: {
        equals: formatDate('yyyy-mm-dd'),
      },
    },
  }

  const { results } = await databaseNotion(id, body)

  return res.json({ repetitions: results, code: 200 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
