import Layout from '@components/Layout'
import Header from '@components/Header'
import Nav from '@components/Nav'
import NotionRender from '@components/notion/NotionRender'
import { parsePageId } from '@lib/parsePageId'

export default function Slug({ blocks, page }) {
  return (
    <Layout>
      <Header title={page.properties.title.title[0].text.content} />
      <Nav page={page} />
      <style jsx>{`
        .art-cover {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${page.cover
              ? page.cover[page.cover.type].url
              : '/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg'});
        }
      `}</style>
      <div className="art-cover relative min-h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
          <p className="text-3xl uppercase">
            {page.properties.title.title[0].text.content}
          </p>
          <p className="mt-8 text-xl">
            {page.properties.excerpt.rich_text[0]?.plain_text}
          </p>
        </div>
      </div>
      <div className="prose mx-auto mb-8 lg:prose-xl" key={page.id}>
        {<NotionRender blocks={blocks} />}
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const id = parsePageId(params.slug, { uuid: false })
  const { blocks, page } = await fetch(
    `${process.env.APP_URL}/api/blogs/${id}`
  ).then((res) => res.json())
  return { props: { blocks, page } }
}
