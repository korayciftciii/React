export default function NavSearch({ query, setQuery }) {
    return (
        <div className="col-4">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search Movie" />
        </div>
    )
}