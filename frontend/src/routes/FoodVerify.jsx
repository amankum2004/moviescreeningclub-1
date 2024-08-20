import  { useState } from 'react';

const FoodVerify = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/foodverification/foodverify?email=${email}&otp=${otp}`);
            const data = await response.json();

            if (response.ok) {
                setDeliveryStatus(data.isdelivered ? 'Delivered' : 'Not Delivered');
                setError(null);
            } else {
                setError(data.message);
                setDeliveryStatus(null);
            }
        } catch (error) {
            setError('Server error');
            setDeliveryStatus(null);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/foodverification/foodverify/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            });
            const data = await response.json();

            if (response.ok) {
                setDeliveryStatus('Delivered');
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Server error');
        }
    };

    return (
        // <div>
        //     <h2>Check Food Delivery Status</h2>
        //     <div>
        //         <label>Email:</label>
        //         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        //     </div>
        //     <div>
        //         <label>OTP:</label>
        //         <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        //     </div>
        //     <button onClick={handleSearch}>Check Status</button>
        //     {deliveryStatus && <p>Delivery Status: {deliveryStatus}</p>}
        //     {error && <p style={{ color: 'red' }}>{error}</p>}
        //     <button onClick={handleUpdate}>Mark as Delivered</button>
        // </div>
        <div className="food-verify-container">
    <h2 className="food-verify-heading">Check Food Delivery Status</h2>
    <div className="food-verify-input-group">
        <label className="food-verify-label">Email:</label>
        <input
            className="food-verify-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
    </div>
    <div className="food-verify-input-group">
        <label className="food-verify-label">OTP:</label>
        <input
            className="food-verify-input"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
        />
    </div>
    <button className="food-verify-button" onClick={handleSearch}>
        Check Status
    </button>
    {deliveryStatus && (
        <p className="food-verify-status">Delivery Status: {deliveryStatus}</p>
    )}
    {error && <p className="food-verify-error">{error}</p>}
    <button className="food-verify-button" onClick={handleUpdate}>
        Mark as Delivered
    </button>
</div>

    );
};

export default FoodVerify;
