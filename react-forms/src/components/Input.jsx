export default function Input({ labelTitle, id, type, name, validationInfo, feedBackMessage, handleInputChange, handleInputBlur }) {
    return (
        <div className="mb-3" >
            <label htmlFor={id} className="form-label">
                {labelTitle}
            </label>
            <input
                type={type}
                className="form-control"
                id={id}
                name={name}
                onChange={handleInputChange}
                onBlur={handleInputBlur} />
            {
                validationInfo && (<p className="invalid-feedback d-block">{feedBackMessage}</p>)
            }
        </div>
    )
}