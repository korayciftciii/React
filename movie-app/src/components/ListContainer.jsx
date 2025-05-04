import React, { useState, useEffect } from 'react';
export default function ListContainer({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="movie-list">
            <button className='btn btn-sm btn-outline-primary mb-2' onClick={() => setIsOpen(val => !val)}><i className={isOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'}></i></button>
            {
                isOpen &&
                children
            }
        </div>
    )
}