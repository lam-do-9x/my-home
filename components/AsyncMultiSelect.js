import AsyncCreatableSelect from 'react-select/async-creatable';

export default function AsyncMultiSelect(props) {
    async function searchSentence(keyword) {
        if (keyword !== '') {
            let url = `/api/sentences?take=100&skip=1&q=${keyword}`

            if (props.dictionary) {
                url = `/api/dictionaries?take=100&skip=1&q=${keyword}`
            }

            const res = await fetch(url).then((response) => response.json())

            if (props.dictionary) {
                return res.dictionaries.map((dictionary) => {
                    return {
                        value: dictionary.id,
                        label: dictionary.word
                    }
                });
             }

            return res.sentences.map((sentence) => {
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
            defaultValue={props.default}
            loadOptions={promiseOptions}
            onChange={(selected) => props.onChange(selected)}
        />
    )
}
