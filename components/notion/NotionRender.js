import {
  Paragraph,
  Heading,
  ListItem,
  ToDo,
  Toggle,
  Quote,
  Picture,
  BulletBox,
  ContentBox,
  Callout,
} from './BasicBlock'
import { Bookmarks, Video } from './Media'

const renderBlock = (block) => {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return <Paragraph value={value} key={id} />
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      return <Heading value={value} type={type} key={id} />
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return <ListItem value={value} key={id} />
    case 'to_do':
      return <ToDo value={value} id={id} key={id} />
    case 'toggle':
      return <Toggle value={value} renderBlock={renderBlock} key={id} />
    case 'quote':
      return <Quote value={value} key={id} />
    case 'image':
      return <Picture value={value} key={id} />
    case 'divider':
      return <hr className="!important my-4 bg-gray-200" key={id} />
    case 'bookmark':
      return <Bookmarks value={value} key={value.title} />
    case 'callout':
      if (value.icon.emoji === '📮') {
        return <BulletBox value={value} key={id} />
      }
      if (value.icon.emoji === '📦') {
        return <ContentBox value={value} key={id} />
      }
      return <Callout value={value} key={id} />
    case 'video':
      return <Video value={value} key={id} />
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`
  }
}

export default function NotionRender({ blocks }) {
  return <div>{blocks.map((block) => renderBlock(block))}</div>
}
