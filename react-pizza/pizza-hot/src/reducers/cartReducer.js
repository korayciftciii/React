export default function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );
            const updatedItems = [...state.items];

            if (existingItemIndex > -1) {
                const existingItem = updatedItems[existingItemIndex];
                updatedItems[existingItemIndex] = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                };
            } else {
                updatedItems.push({ ...action.item, quantity: 1 });
            }

            return { ...state, items: updatedItems };
        }

        case "REMOVE_ITEM": {
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );
            if (existingItemIndex === -1) return state;

            const updatedItems = [...state.items];
            const existingItem = updatedItems[existingItemIndex];

            if (existingItem.quantity === 1) {
                updatedItems.splice(existingItemIndex, 1);
            } else {
                updatedItems[existingItemIndex] = {
                    ...existingItem,
                    quantity: existingItem.quantity - 1,
                };
            }

            return { ...state, items: updatedItems };
        }
        case "CLEAR_CART":
            return { ...state, items: [] };
        default:
            return state;
    }
}
