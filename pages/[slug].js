import Main from "../components/Main";
import MDRender from "../components/MDRender";
import Nav from '../components/Nav';

export default function slug({post}) {
    return (
        <Main>
            <div>
                <Nav post={post}/>
                <div className="h-screen justify-center items-center flex flex-col mb-16 bg-black">
                    <style jsx>{`
                    .art-cover {
                          background-image: url(${post.cover ?? '/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg'});
                    }
                    `}</style>
                    <div className="art-cover bg-no-repeat bg-center bg-cover w-full h-screen opacity-30 absolute z-10"></div>
                    <div className='mx-20 px-56 container justify-center flex flex-col text-white z-20'>
                        <div className="text-5xl uppercase">{post.title}</div>
                        <div className="my-8 text-xl">{post.excerpt}</div>
                    </div>
                </div>
                <div className="mx-20 px-56 container w-full" key={post.slug}>
                    <div className="prose lg:prose-xl">{<MDRender content={post.content}/>}</div>
                </div>
            </div>
        </Main>
    );
}

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`${process.env.APP_URL}/api/posts/${params.slug}?column=slug`);
    const { post } = await res.json();

    return { props: { post } }
}
