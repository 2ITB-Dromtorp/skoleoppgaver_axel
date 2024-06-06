import React from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [checkout, setCheckout] = React.useState({
        cardholderName: '',
        cardNumber: '',
        expDate: '',
        cvc: '',
        deliveryToClassroom: false,
        classroomNumber: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'cardNumber') {
            const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            const matches = v.match(/\d{4,16}/g);
            const match = matches && matches[0] || '';
            const parts = [];
            for (let i = 0, len = match.length; i < len; i += 4) {
                parts.push(match.substring(i, i + 4));
            }
            if (parts.length) {
                setCheckout(prev => ({ ...prev, [name]: parts.join(' ') }));
            } else {
                setCheckout(prev => ({ ...prev, [name]: value }));
            }
        } else if (name === 'expDate') {
            const v = value.replace(/[^0-9]/gi, '').slice(0, 4);
            if (v.length > 2) {
                setCheckout(prev => ({ ...prev, [name]: `${v.slice(0, 2)}/${v.slice(2, 4)}` }));
            } else {
                setCheckout(prev => ({ ...prev, [name]: v }));
            }
        } else {
            setCheckout(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleQuantityChange = (productId, quantity) => {
        if (quantity >= 0) {
            updateQuantity(productId, quantity);
        }
    };

    const toggleDelivery = () => {
        setCheckout(prev => ({
            ...prev,
            deliveryToClassroom: !prev.deliveryToClassroom,
            classroomNumber: !prev.deliveryToClassroom ? '' : prev.classroomNumber
        }));
    };

    const finishOrder = () => {
        cartItems.forEach(item => {
            axios.post('http://localhost:3500/purchase', {
                productId: item.id,
                quantity: item.quantity
            }, { withCredentials: true })
                .then(response => {
                    console.log(response.data);
                    clearCart();  // Clear cart after successful purchase
                })
                .catch(error => {
                    console.error('Purchase failed:', error);
                });
        });

        const orderNumber = Math.floor(Math.random() * 999); // Generate random order number
        if (checkout.deliveryToClassroom) {
            navigate('/order-complete', { state: { orderNumber, delivery: true, classroom: checkout.classroomNumber } });
        } else {
            navigate('/order-complete', { state: { orderNumber, delivery: false } });
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Your Cart</h1>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <p>{item.produktNavn}: {item.pris} Kr - Quantity:
                        <input type="number" value={item.quantity} min="0" onChange={e => handleQuantityChange(item.id, parseInt(e.target.value, 10))} />
                    </p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
            <h2>Total: {getTotalPrice() + (checkout.deliveryToClassroom ? 10 : 0)} Kr</h2>
            <div>
                <input placeholder="Cardholder Name" name="cardholderName" value={checkout.cardholderName} onChange={handleInputChange} required />
                <input placeholder="Card Number" name="cardNumber" value={checkout.cardNumber} onChange={handleInputChange} required />
                <input placeholder="Expiration Date" name="expDate" value={checkout.expDate} onChange={handleInputChange} required />
                <input placeholder="CVC" name="cvc" value={checkout.cvc} onChange={handleInputChange} maxLength="4" required />
                <div>
                    <label>
                        Deliver to Classroom (10 Kr extra):
                        <input type="checkbox" checked={checkout.deliveryToClassroom} onChange={toggleDelivery} />
                    </label>
                    {checkout.deliveryToClassroom &&
                        <input placeholder="Classroom Number" name="classroomNumber" value={checkout.classroomNumber} onChange={handleInputChange} required />
                    }
                </div>
                <button onClick={finishOrder}>Finish Order</button>
            </div>
        </div>
    );
}

export default Cart;
