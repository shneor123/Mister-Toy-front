import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export const useForm = (initialFields, cb) => {

    const [fields, setFields] = useState(initialFields)

    const handleChange = ({ target }) => {
        let value = target.type === 'number' ? (+target.value || '') : target.value
        const field = target.name
        if (field === 'inStock') value = value === 'yes'
        if (field === 'price') value = +value
        if (field === 'labels') value = Array.from(target.selectedOptions).map(option => option.value)
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    const clearFields = (field) => {
        setFields((prevFields) => {
            if (field) {
                return { ...prevFields, [field]: '' }
            }
            const newObj = {}
            for (const i in prevFields) {
                newObj[i] = ''
            }
            return newObj
        })
    }


    // if(cb) cb()
    return [
        fields,
        handleChange,
        clearFields,
        setFields,
    ]
}


