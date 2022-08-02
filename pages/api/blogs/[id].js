import { pageNotion, AllChildBlockNotion } from '@lib/notion'
import { getLinkPreview } from 'link-preview-js'

export default async function handle(req, res) {
  const { id } = req.query
  const blocks = await new AllChildBlockNotion(id).get()
  const lastItemIndex = blocks.length - 1
  const linkPreview = await getLinkPreview(blocks[lastItemIndex].bookmark.url)
  blocks[lastItemIndex] = {
    type: 'bookmark',
    bookmark: linkPreview,
  }
  const page = await pageNotion(id)
  return res.json({ blocks, page, code: 200 })
}
