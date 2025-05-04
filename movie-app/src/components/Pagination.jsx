export default function Pagination({ nextPage, prevPage, currentPage, totalPages }) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination d-flex justify-content-between">
                <li className={currentPage != 1 ? "page-item" : "page-item disabled"}><a className="page-link" href="#" onClick={prevPage}>Previous</a></li>
                <li className={currentPage < totalPages ? "page-item" : "page-item disabled"}><a className="page-link" href="#" onClick={nextPage}>Next</a></li>
            </ul>
        </nav>
    );
}