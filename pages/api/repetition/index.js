import { databaseNotion } from '@lib/notion'
import { formatDate } from '@lib/dateTime'

export default async function handle(req, res) {
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
