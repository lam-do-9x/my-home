import { Fragment } from "react";
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
} from "./notion/BasicBlock";
import { Bookmarks, Video } from "./notion/Media";

const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return <Paragraph value={value} />;
    case "heading_1":
    case "heading_2":
    case "heading_3":
      return <Heading value={value} type={type} />;
    case "bulleted_list_item":
    case "numbered_list_item":
      return <ListItem value={value} />;
    case "to_do":
      return <ToDo value={value} id={id} />;
    case "toggle":
      return <Toggle value={value} renderBlock={renderBlock} />;
    case "quote":
      return <Quote value={value} />;
    case "image":
      return <Picture value={value} />;
    case "divider":
      return <hr className="bg-gray-200 my-4 !important" />;
    case "bookmark":
      return <Bookmarks value={value} />;
    case "callout":
      if (value.icon.emoji === "📮") {
        return <BulletBox value={value} />;
      }
      if (value.icon.emoji === "📦") {
        return <ContentBox value={value} />;
      }
      return <Callout value={value} />;
    case "video":
      return <Video value={value} />;
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default function NotionRender({ blocks }) {
  return (
    <div>
      {blocks.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  );
}
