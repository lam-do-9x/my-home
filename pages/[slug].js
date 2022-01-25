import Main from "../components/Main";
import Nav from "../components/Nav";
import NotionRender from "../components/notion/NotionRender";
import { parsePageId } from "../lib/parsePageId";

export default function Slug({ blocks, page }) {
  return (
    <Main>
      <div className="pb-8">
        <Nav page={page} />
        <div className="mb-16 flex h-screen flex-col items-center justify-center bg-black">
          <style jsx>{`
            .art-cover {
              background-image: url(${page.cover
                ? page.cover[page.cover.type].url
                : "/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg"});
            }
          `}</style>
          <div className="art-cover absolute z-10 h-screen w-full bg-cover bg-center bg-no-repeat opacity-30"></div>
          <div className="container z-20 mx-20 flex flex-col justify-center px-56 text-white">
            <div className="text-5xl uppercase">
              {page.properties.title.title[0].text.content}
            </div>
            <div className="my-8 text-xl">
              {page.properties.excerpt.rich_text[0]?.plain_text}
            </div>
          </div>
        </div>
        <div
          className="container mx-20 w-full px-56"
          key={page.properties.slug.rich_text[0]?.plain_text}
        >
          <div className="prose lg:prose-xl">
            {<NotionRender blocks={blocks} />}
          </div>
        </div>
      </div>
    </Main>
  );
}

export const getServerSideProps = async ({ params }) => {
  const id = parsePageId(params.slug, { uuid: false });
  const { blocks, page } = await fetch(
    `${process.env.APP_URL}/api/blogs/${id}`
  ).then((res) => res.json());
  return { props: { blocks, page } };
};
