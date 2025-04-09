export function Footer() {
    const time = new Date().getHours();
  const isOpen = time >= 9 && time <= 17;
  const greeting = isOpen ? "We are open!" : "We are closed.";
    return (
      <footer>
        <p>{greeting}</p>
      </footer>
    );
  }