export default function MainContent({ children }) {
    return (
        <main className="container">
            <div className="row mt-2">
                {children}
            </div>
        </main>
    )
}