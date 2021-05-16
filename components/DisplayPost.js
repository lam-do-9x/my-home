import Image from 'next/image'

export default function DisplayPost() {
    return (
        <div className="max-w-4xl px-10 py-6 my-4 border-b border-gray-300 flex items-center justify-center">
            <Image className="rounded-full" src="https://markmanson.net/wp-content/uploads/2021/04/documentary-cover-250x250.jpg" width={300} height={300}/>
            <div className="flex flex-col mx-8 w-1/3">
                <span className="font-bold text-gray-600">Date:</span>
                <span className="font-light text-gray-600 w-full">Jun 1,2020</span>
            </div>
            <div className="mt-2">
                <a href="#" className="text-2xl text-gray-700 font-bold">Build Your New Idea with Laravel Freamwork.</a>
                <p className="mt-2 text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim
                reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!
                </p>
            </div>
        </div>
    );
}
