<<<<<<< HEAD
import { useState } from 'react'
=======
import { api } from '@/utils/api'
import { useState } from 'react'
import Swal from 'sweetalert2'
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c

const FoodVerify = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
<<<<<<< HEAD

  const handleVerifyOtp = async () => {
    const verifyData = { email, otp }

    try {
      const response = await fetch('http://localhost:8000/food/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verifyData)
      })
      const data = await response.json()
      if (response.ok) {
        alert('OTP verified successfully!')
      } else {
        alert(data.message || 'Failed to verify OTP.')
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
=======
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const handleVerifyOtp = async () => {
    if (!email || !otp) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter email and OTP.',
        icon: 'error'
      })
      return
    }
    setIsLoading(true)
    const verifyData = { email, otp }

    try {
      const res = await api.post('/order/verify', verifyData)
      if (res.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: res.data,
          icon: 'success'
        })
        setData(res.data)
      } else {
        Swal.fire({
          title: 'Error!',
          text: res.data.error,
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
      const err = error.response.data.error
      Swal.fire({
        title: 'Error!',
        text: typeof err === 'string' ? err : 'Failed to verify OTP.',
        icon: 'error'
      })
    } finally {
      setIsLoading(false)
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
    }
  }

  return (
<<<<<<< HEAD
    <div>
      <h2>Verify OTP</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
=======
    <div className=" flex flex-col items-center ">
      <div className="bg-white rounded-xl p-4 gap-4 flex flex-col items-center w-fit">
        <p className="font-semibold text-xl ">Verify OTP</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="px-4 py-2 bg-gray-200 rounded-md"
        />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
          className="px-4 py-2 bg-gray-200 rounded-md"
        />
        <button
          onClick={handleVerifyOtp}
          disabled={isLoading}
          className="px-4 py-2 bg-green-400 rounded-lg text-white font-semibold"
        >
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </button>
        {data && (
          <div className="bg-green-200 p-4 rounded-xl">
            <p className="font-semibold text-lg">Order Verified!</p>
            <p className="text-sm">Order ID: {data.order._id}</p>
            <p className="text-sm">Email: {data.order.email}</p>
            <div className="flex flex-col gap-2">
              {data.order.foodList.map((food) => (
                <div
                  key={food._id}
                  className="flex flex-col gap-2  justify-between"
                >
                  <p>{food._id.name}</p>
                  <p>quantity: {food.quantity}</p>
                  <p>{food._id.vendor}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
    </div>
  )
}

export default FoodVerify
