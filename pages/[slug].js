export default function slug({post}) {
    return (
        <div>This is test</div>
    );
}

export const getServerSideProps = async ({ params }) => {
    const slug = params.slug;
    const res = await fetch(`${process.env.APP_URL}/api/posts/${slug}`);
    const { post } = await res.json();
    console.log(post);

    return { props: {  } }
}
