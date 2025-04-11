import { useState } from "react";
export default function Form({ onAddItem, onClearAll }) {
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState(1);
  
    function handleFormSubmit(e) {
      e.preventDefault();
      if (title.trim() === "") {
        alert("Item title cannot be empty!"); // Kullanıcıya uyarı mesajı
        return;
      }
      const item = { id: Date.now(), title: title.trim(), quantity, completed: false };
      onAddItem(item);
      setTitle("");
      setQuantity(1);
    }
  
    return (
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Add item"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
        <button type="button" onClick={onClearAll}>
          Clear All
        </button>
      </form>
    );
  }
  