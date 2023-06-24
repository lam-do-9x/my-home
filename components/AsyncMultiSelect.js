import AsyncCreatableSelect from 'react-select/async-creatable';

export default function AsyncMultiSelect() {
    async function searchSentence(keyword) {
        if (keyword !== '') {
            let url = `/api/sentences?take=100&skip=1&q=${keyword}`

            const { sentences } = await fetch(url).then((response) => response.json())

            return sentences.map((sentence) => {
                return {
                    value: sentence.id,
                    label: sentence.title
                }
            });
        }
    };

    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(searchSentence(inputValue))
            }, 500);
        });

    return (
        <AsyncCreatableSelect
            isMulti
            cacheOptions
            loadOptions={promiseOptions}
        />
    )
}
