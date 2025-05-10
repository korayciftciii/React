import { useContext } from "react";
import Modal from "./UI/Modal";
import { cartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";
import { UIContext } from "../contexts/UIContext";

export default function Cart() {
    const { items, addItem, removeItem } = useContext(cartContext);
    const { UIProgress, hideCart, showCheckout } = useContext(UIContext);

    const cartTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const isCartEmpty = items.length === 0;

    return (
        <Modal open={UIProgress === "cart"}>
            <div className="p-3">
                {isCartEmpty ? (
                    <>
                        <div className="alert alert-warning text-center fw-semibold">
                            Sepetiniz boş
                        </div>
                        <div className="text-end mt-3">
                            <button
                                className="btn btn-sm btn-secondary"
                                onClick={hideCart}
                            >
                                Kapat
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h4 className="text-center mb-4">Sepetiniz</h4>

                        <ul className="list-unstyled mb-3">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    addItem={addItem}
                                    removeItem={removeItem}
                                />
                            ))}
                        </ul>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <span className="fs-5 fw-bold text-success">
                                Toplam: {cartTotal.toFixed(2)} ₺
                            </span>
                            <div>
                                <button
                                    className="btn btn-sm btn-outline-danger me-2"
                                    onClick={hideCart}
                                >
                                    Kapat
                                </button>
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={showCheckout}
                                >
                                    Siparişi Tamamla
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}
