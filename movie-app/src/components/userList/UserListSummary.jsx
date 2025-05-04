export default function UserListSummary({ moviesLenght, averageRating, averageDuration, averageUserRating }) {
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h6>You Have {moviesLenght} Movie In Your List</h6>
                <div className='d-flex justify-content-between'>
                    <p>
                        <i className="bi bi-star-fill text-warning"></i>
                        <span>{averageRating ? averageRating.toFixed(1) : 0}</span>
                    </p>
                    <p>
                        <i className="bi bi-stars text-warning"></i>
                        <span>{averageUserRating ? averageUserRating.toFixed(1) : 0}</span>
                    </p>
                    <p>
                        <i className="bi bi-clock me-1"></i>
                        <span>{averageDuration ? averageDuration.toFixed(0) : 0} Min</span>
                    </p>
                </div>
            </div>
        </div>
    )
}