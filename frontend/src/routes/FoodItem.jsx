<<<<<<< HEAD
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

const OrderPage = () => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const [foodItems, setFoodItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const location = useLocation()

  const { movieId } = location.state
  console.log(movieId)

  useEffect(() => {
    // Fetch movies from backend
    fetch('http://localhost:8000/movie')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error))

    // Fetch food items from backend
    fetch('http://localhost:8000/adminfood/food-items')
      .then((res) => res.json())
      .then((data) => setFoodItems(data))
      .catch((error) => console.error('Error fetching food items:', error))
  }, [])

  console.log(movies)

  const handleShowtimeChange = (e) => {
    const showtime = selectedMovie.showtimes.find(
      (st) => st._id === e.target.value
    )
    setSelectedShowtime(showtime)
  }

  const handleIncrease = (food) => {
    const existingItem = selectedItems.find(
      (item) => item.foodName === food.foodName && item.vendor === food.vendor
    )
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.foodName === food.foodName && item.vendor === food.vendor
=======
import { Loading } from '@/components/icons/Loading'
import { useLogin } from '@/components/LoginContext'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

const OrderPage = () => {
  const location = useLocation()
  const { user } = useLogin()
  const showTimeId = new URLSearchParams(location.search).get('showtime')
  const [foodItems, setFoodItems] = useState([])
  const [movie, setMovie] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  useEffect(() => {
    getFoodItems()
    getMovie()
  }, [])
  if (!showTimeId) return <Navigate to="/home" />
  const getFoodItems = async () => {
    try {
      const response = await api.get(`/food/show/${showTimeId}`)
      if (!response.data) {
        throw new Error('Failed to fetch food items')
      }
      setFoodItems(response.data)
    } catch (error) {
      console.error('Error fetching food items:', error)
    }
  }
  const getMovie = async () => {
    try {
      const response = await api.get(`movie/show/${showTimeId}`)
      if (!response.data) {
        throw new Error('Failed to fetch movies')
      }
      setMovie(response.data)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const handleIncrease = (food) => {
    const existingItem = selectedItems.find((item) => item._id === food._id)
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((item) =>
          item._id === food._id
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: (item.quantity + 1) * food.price
              }
            : item
        )
      )
    } else {
      setSelectedItems([
        ...selectedItems,
        {
<<<<<<< HEAD
          foodName: food.foodName,
=======
          _id: food._id,
          name: food.name,
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
          quantity: 1,
          price: food.price,
          vendor: food.vendor
        }
      ])
    }
  }

  const handleDecrease = (food) => {
<<<<<<< HEAD
    const existingItem = selectedItems.find(
      (item) => item.foodName === food.foodName && item.vendor === food.vendor
    )
    if (existingItem && existingItem.quantity > 1) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.foodName === food.foodName && item.vendor === food.vendor
=======
    const existingItem = selectedItems.find((item) => item._id === food._id)
    if (existingItem && existingItem.quantity > 1) {
      setSelectedItems(
        selectedItems.map((item) =>
          item._id === food._id
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
            ? {
                ...item,
                quantity: item.quantity - 1,
                price: (item.quantity - 1) * food.price
              }
            : item
        )
      )
    } else {
<<<<<<< HEAD
      setSelectedItems(
        selectedItems.filter(
          (item) =>
            !(item.foodName === food.foodName && item.vendor === food.vendor)
        )
      )
=======
      setSelectedItems(selectedItems.filter((item) => !item._id === food._id))
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
    }
  }

  const handleSubmitOrder = async () => {
<<<<<<< HEAD
    if (!selectedMovie || !selectedShowtime) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a movie and showtime',
        icon: 'error'
      })
      return
    }

    const totalPrice = selectedItems.reduce(
      (total, item) => total + item.price,
      0
    )
    const orderData = {
      movie: {
        movieId: selectedMovie._id,
        title: selectedMovie.title,
        showtimeId: selectedShowtime._id,
        showtimeDate: selectedShowtime.date
      },
      items: selectedItems,
      totalPrice
    }

    try {
      const response = await fetch('http://localhost:8000/food/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })
      console.log(orderData)
      if (response.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Order placed successfully',
          icon: 'success'
        })
        setSelectedItems([])
        setSelectedMovie(null)
        setSelectedShowtime(null)
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to place order',
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('Error placing order:', error)
    }
  }

  const matchingMovie = movies.find((movie) =>
    movie.showtimes.some((showtime) => showtime._id === movieId)
  )
  console.log(matchingMovie)

  let moviename = ''
  if (matchingMovie) {
    moviename = matchingMovie.title
  }
  return (
    <div className="max-w-4xl mx-auto p-5 bg-gray-100 font-sans">
=======
    Swal.fire({
      title: 'Confirm',
      text: `Are you sure you want to order?`,
      icon: 'info',
      confirmButtonText: 'Yes',
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSubmitting(true)
        const orderData = {
          showtimeId: showTimeId,
          items: selectedItems
        }
        try {
          const response = await api.post('/order', orderData)
          console.log(orderData)
          if (response.status !== 200) {
            Swal.fire({
              title: 'Error',
              text: 'Failed to place order',
              icon: 'error'
            })
            console.error('Error requesting membership:', res.data.error)
            return
          }
          const options = {
            atomTokenId: response.data.atomTokenId,
            merchId: response.data.merchId,
            custEmail: user.email,
            custMobile: user.phone,
            returnUrl:
              (import.meta.env.VITE_environment === 'development'
                ? 'http://localhost:8000'
                : document.location.origin) + '/api/order/redirect'
          }
          let atom = new AtomPaynetz(options, 'uat')
          setSelectedItems([])
        } catch (error) {
          console.error('Error placing order:', error)
          const err = error.response?.data?.error

          Swal.fire({
            title: 'Error',
            text: typeof err == 'string' ? err : 'Failed to place order',
            icon: 'error'
          })
        } finally {
          setIsSubmitting(false)
          getFoodItems()
        }
      }
    })
  }

  if (!foodItems.length || !movie) {
    return <Loading />
  }

  return (
    <div className="max-w-4xl mx-auto p-5 bg-gray-100 font-sans flex-1 flex-col items-center">
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
      <h2 className="text-2xl font-bold text-red-500 text-center mb-6">
        Order Food
      </h2>

<<<<<<< HEAD
      <h3 className="text-lg font-semibold text-center mb-3 capitalize">
        current Movie: {moviename}
      </h3>
      {selectedMovie && (
        <>
          <h3 className="text-lg font-semibold text-center mb-3">
            Select Showtime
          </h3>
          <select
            className="block w-full p-3 rounded-md border border-gray-300 mb-5"
            onChange={handleShowtimeChange}
            value={selectedShowtime?._id || ''}
          >
            <option value="" disabled>
              Select Showtime
            </option>
            {selectedMovie.showtimes.map((showtime) => (
              <option key={showtime._id} value={showtime._id}>
                {new Date(showtime.date).toLocaleString()}
              </option>
            ))}
          </select>
        </>
      )}

=======
      <h3 className="text-lg font-semibold text-center mb-1 capitalize">
        current Movie: {movie.title}
      </h3>
      <p className="w-full text-center  mb-4">
        showtime:{' '}
        {new Date(
          movie.showtimes.find((s) => s._id === showTimeId).date
        ).toLocaleString()}
      </p>
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
      <h3 className="text-lg font-semibold text-center mb-4">Select Food</h3>
      <div className="space-y-6">
        {foodItems.map((food) => (
          <div
            key={food._id}
            className="flex items-center bg-white p-4 rounded-lg shadow"
          >
            <img
              src={food.poster}
<<<<<<< HEAD
              alt={food.foodName}
=======
              alt={food.name}
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
<<<<<<< HEAD
                {food.foodName}
=======
                {food.name}
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
              </h2>
              <p className="text-green-600">{food.description}</p>
              <p className="text-gray-800">Rs. {food.price}</p>
              <p className="text-gray-600">Vendor: {food.vendor}</p>
<<<<<<< HEAD
=======
              <p className="text-gray-600">Available : {food.quantity}</p>
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="bg-yellow-500 text-white font-bold px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => handleDecrease(food)}
              >
                -
              </button>
              <span className="font-bold text-lg">
<<<<<<< HEAD
                {selectedItems.find(
                  (item) =>
                    item.foodName === food.foodName &&
                    item.vendor === food.vendor
                )?.quantity || 0}
=======
                {selectedItems.find((item) => item._id === food._id)
                  ?.quantity || 0}
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
              </span>
              <button
                className="bg-yellow-500 text-white font-bold px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => handleIncrease(food)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <ul className="space-y-2">
          {selectedItems.map((item) => (
<<<<<<< HEAD
            <li
              key={`${item.foodName}-${item.vendor}`}
              className="text-gray-800"
            >
              {item.foodName} (Vendor: {item.vendor}) - {item.quantity} x Rs.{' '}
=======
            <li key={`${item._id}`} className="text-gray-800">
              {item.name} (Vendor: {item.vendor}) - {item.quantity} x Rs.{' '}
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
              {item.price / item.quantity} = Rs. {item.price}
            </li>
          ))}
        </ul>
        <p className="text-right text-xl font-semibold mt-4">
          Total Price: Rs.{' '}
          {selectedItems.reduce((total, item) => total + item.price, 0)}
        </p>
        <button
          className="mt-6 w-full bg-red-500 text-white font-bold py-3 rounded hover:bg-red-600"
          onClick={handleSubmitOrder}
<<<<<<< HEAD
        >
          Place Order
=======
          disabled={isSubmitting || !selectedItems.length}
        >
          {isSubmitting ? 'Placing...' : 'Place Order'}
>>>>>>> 2991839200574039184e38cdf0b262db3d9c089c
        </button>
      </div>
    </div>
  )
}

export default OrderPage
