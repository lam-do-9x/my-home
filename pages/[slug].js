import Main from "../components/Main";
import Nav from "../components/Nav";
import NotionRender from "../components/NotionRender";
import { parsePageId } from "../lib/parsePageId";

export default function Slug({ blocks, page }) {
  return (
    <Main>
      <div className="pb-8">
        <Nav page={page} />
        <div className="h-screen justify-center items-center flex flex-col mb-16 bg-black">
          <style jsx>{`
            .art-cover {
              background-image: url(${page.cover
                ? page.cover[page.cover.type].url
                : "/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg"});
            }
          `}</style>
          <div className="art-cover bg-no-repeat bg-center bg-cover w-full h-screen opacity-30 absolute z-10"></div>
          <div className="mx-20 px-56 container justify-center flex flex-col text-white z-20">
            <div className="text-5xl uppercase">
              {page.properties.title.title[0].text.content}
            </div>
            <div className="my-8 text-xl">
              {page.properties.excerpt.rich_text[0]?.plain_text}
            </div>
          </div>
        </div>
        <div
          className="mx-20 px-56 container w-full"
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
