import { useRef } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce  from 'debounce-promise'

export default function AsyncMultiSelect(props) {
    async function searchSentence(keyword) {
        if (keyword !== '') {
            let url = `/api/sentences?take=100&skip=0&q=${keyword}`

            if (props.dictionary) {
                url = `/api/dictionaries?take=100&skip=0&q=${keyword}`
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

    const debounceDropDown = useRef(
        debounce((sentence) => searchSentence(sentence), 1000)
      ).current

    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            resolve(debounceDropDown(inputValue))
        });

    const styles = {
        valueContainer: (base) => ({
            ...base,
            maxHeight: 75,
            overflowY: "auto"
        }),

    };

    return (
        <AsyncCreatableSelect
            isMulti
            cacheOptions
            defaultValue={props.default}
            loadOptions={promiseOptions}
            onChange={(selected) => props.onChange(selected)}
            styles={styles}
            maxMenuHeight={100}
        />
    )
}
