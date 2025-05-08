import { useState } from "react";

export default function useInput(initialValue, validationFunction) {
    const [value, setValue] = useState(initialValue);
    const [isEdited, setIsEdited] = useState(false);
    const isValid = validationFunction(value);
    function handleInputChange(e) {

        setValue(e.target.value);
        setIsEdited(false);
    }

    function handleInputBlur() {
        setIsEdited(true);
    }
    return {
        value,
        handleInputChange,
        handleInputBlur,
        isEdited,
        hasError: isEdited && !isValid
    }

}