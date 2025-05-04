export default function NavBar({ children }) {
    return (
        <header>
            <nav className="bg-primary text-white p-2">
                <div className="container">
                    <div className="row align-items-center">
                        {children}
                    </div>
                </div>
            </nav>
        </header>
    )
}