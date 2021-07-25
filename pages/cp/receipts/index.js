import { useState } from "react";
import Image from 'next/image';
import Layout from "../../../components/Layout";
import { notion } from '../../../lib/notion';
import ReceiptModal from "../../../components/ReceiptModal";

export default function Receipts({results}) {
    const [modal, setModal] = useState(false);
    const [block, setBlock] = useState(null);

    function openPage(block) {
        setBlock(block);
        setModal(true);
    }

    return (
        <Layout>
            <div className="overflow-x-auto">
                <h2 className="mx-10 text-lg font-bold uppercase rounded p-4">Receipts</h2>
                <div className="overflow-hidden">
                    <div className="flex flex-wrap mx-10 w-full">
                        {results.filter((id, block) => id !== 0).map(block => (
                            <div className="flex flex-col justify-center items-center border border-gray-200 shadow-md rounded w-1/5 m-5 cursor-pointer" key={block.id} onClick={() => openPage(block)}>
                                <Image className="object-fit" src={block.properties.cover ?? '/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg'} width={300} height={300} />
                                <div className="pt-2 font-medium uppercase">{block.properties.name.title[0].plain_text}</div>
                                <div className={`mb-2 rounded p-2 bg-${block.properties.type.select.color}-200`}>{block.properties.type.select.name}</div>
                            </div>
                        ))}
                        {modal && <ReceiptModal block={block} onClick={() => setModal(false)}/>}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const database_id = process.env.NOTION_DATABASE_ID;
    const response = await notion.databases.query({ database_id });

    return {
        props: {
            results: response.results
        },
    };
}