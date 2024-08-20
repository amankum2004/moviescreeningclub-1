import { useEffect, useState } from 'react';
import './AdminFoodCorner.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/food/orders')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    return (
        <div>
            <h2 style={{color:"black",fontWeight:"bold",fontSize:"1.5rem"}}>All Orders Received</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Movie Title</th>
                        <th>Showtime Date</th>
                        <th>Items</th>
                        <th>Total Price</th>
                        <th>Customer Email</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.movie?.title || 'N/A'}</td>
                            <td>{order.movie?.showtimeDate ? new Date(order.movie.showtimeDate).toLocaleString() : 'N/A'}</td>
                            <td>
                                {order.items.map(item => (
                                    <div key={item._id}>
                                        {item.foodName} (x{item.quantity}) - Rs. {item.price}
                                    </div>
                                ))}
                            </td>
                            <td>Rs. {order.totalPrice}</td>
                            <td>{order.email || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
