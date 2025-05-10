import { useContext } from 'react';
import Modal from './UI/Modal';
import { UIContext } from '../contexts/UIContext';
import { cartContext } from '../contexts/CartContext';
import useFetch from '../hooks/useFetch';
const config = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
}
export default function checkout() {
    const { UIProgress, hideCheckout } = useContext(UIContext)
    const { items, clearCart } = useContext(cartContext);
    const cartTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const { data, loading, error, SendRequest } = useFetch("http://localhost:3000/orders", config);
    function handleClose() {
        clearCart();
        hideCheckout();
    }
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        SendRequest(JSON.stringify({
            order: {
                items: items,
                customer: data,
                total: cartTotal,
            }
        })
        );
    }
    if (data && !error) {
        return (
            <Modal open={UIProgress === 'checkout'}>
                <h2>Siparis Tamamlandi</h2>
                <div className="modal-actions text-end">
                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleClose()}>Cancel</button>
                </div>
            </Modal>
        )
    }
    return (
        <Modal open={UIProgress === 'checkout'} >
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <h4 className="mb-4">Teslimat Bilgileri</h4>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Adınız</label>
                        <input type="text" className="form-control" id="name" name="name" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="surname" className="form-label">Soyadınız</label>
                        <input type="text" className="form-control" id="surname" name="surname" />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-posta</label>
                    <input type="email" className="form-control" id="email" name="email" />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Telefon</label>
                    <input type="text" className="form-control" id="phone" name="phone" />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Adres</label>
                    <input type="text" className="form-control" id="address" name="address" />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="city" className="form-label">İl</label>
                        <input type="text" className="form-control" id="city" name="city" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="district" className="form-label">İlçe</label>
                        <input type="text" className="form-control" id="district" name="district" />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="postalCode" className="form-label">Posta Kodu</label>
                    <input type="text" className="form-control" id="postalCode" name="postalCode" />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <strong className="fs-5 text-success">Toplam: {cartTotal.toFixed(2)} ₺</strong>
                    {
                        loading ? (
                            <>
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <button type="submit" className="btn btn-success btn-sm">Siparişi Tamamla</button>
                            </>
                        )
                    }

                </div>
            </form>


            <div className="modal-actions text-end">
                <button className="btn btn-sm btn-danger me-2" onClick={() => hideCheckout()}>Cancel</button>
            </div>
        </Modal>
    )
}