import { Fragment } from "react";
import { Text } from "./Text";

export const Paragraph = ({ value }) => {
  return (
    <p>
      <Text text={value.text} />
    </p>
  );
};

export const Heading = ({ value, type }) => {
  return {
    heading_1: (
      <h1 className="flex items-center justify-center">
        <Text text={value.text} />
      </h1>
    ),
    heading_2: (
      <h2 className="flex items-center justify-center">
        <Text text={value.text} />
      </h2>
    ),
    heading_3: (
      <h3>
        <Text text={value.text} />
      </h3>
    ),
  }[type];
};

export const ListItem = ({ value }) => {
  return (
    <li>
      <Text text={value.text} />
    </li>
  );
};

export const ToDo = ({ value, id }) => {
  return (
    <div>
      <label htmlFor={id}>
        <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
        <Text text={value.text} />
      </label>
    </div>
  );
};

export const Toggle = ({ value, renderBlock }) => {
  return (
    <details>
      <summary>
        <Text text={value.text} />
      </summary>
      {value.children?.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </details>
  );
};

export const Quote = ({ value }) => {
  return <blockquote>{value.text[0].plain_text}</blockquote>;
};

export const Picture = ({ value }) => {
  return <img src={value[value.type].url} alt="" title="" />;
};

export const BulletBox = ({ value }) => {
  const bullet = value.text[1].text.content.split("-");
  const content = bullet.shift();

  return (
    <div
      className="mb-4 border border-gray-300 p-8"
      key={`${value.text[0].plain_text}`}
    >
      <div className="bg-gray-200 p-4">
        <Text text={value.text[0]} />
      </div>
      {content !== "" ? <p>{content}</p> : ""}
      <style jsx>{`
        .columns-2 {
          column-count: 2;
        }
      `}</style>
      <ul className={`${bullet.length >= 10 ? "columns-2" : ""}`}>
        {bullet.map((item) => {
          return <li key={`${item}`}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export const ContentBox = ({ value }) => {
  return (
    <div className="border border-gray-300 p-8 " key={`${value.icon.emoji}`}>
      {value.text.map((item, i) => {
        if (i === 0) {
          return (
            <div className="mb-4 bg-gray-200 p-4">
              <Text text={item} />
            </div>
          );
        }
        return <Text text={item} key={item.plain_text} />;
      })}
    </div>
  );
};

export const Callout = ({ value }) => {
  return (
    <div className="bg-gray-100 p-8" key={`${value.icon.emoji}`}>
      {value.text.map((item, i) => {
        if (i === 0) {
          return (
            <div className="text-center">
              <Text text={item} />
            </div>
          );
        }
        return <Text text={item} key={item.plain_text} />;
      })}
    </div>
  );
};
