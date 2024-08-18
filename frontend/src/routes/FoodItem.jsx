import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom'

const OrderPage = () => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const [foodItems, setFoodItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const location = useLocation();

  const {movieId}=location.state;
  console.log(movieId);

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

  console.log(movies);
  const handleMovieChange = (e) => {
    const movie = movies.find((m) => m._id === e.target.value)
    setSelectedMovie(movie)
    setSelectedShowtime(null) // Reset showtime selection
  }

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
          foodName: food.foodName,
          quantity: 1,
          price: food.price,
          vendor: food.vendor
        }
      ])
    }
  }

  const handleDecrease = (food) => {
    const existingItem = selectedItems.find(
      (item) => item.foodName === food.foodName && item.vendor === food.vendor
    )
    if (existingItem && existingItem.quantity > 1) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.foodName === food.foodName && item.vendor === food.vendor
            ? {
                ...item,
                quantity: item.quantity - 1,
                price: (item.quantity - 1) * food.price
              }
            : item
        )
      )
    } else {
      setSelectedItems(
        selectedItems.filter(
          (item) =>
            !(item.foodName === food.foodName && item.vendor === food.vendor)
        )
      )
    }
  }

  const handleSubmitOrder = async () => {
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

  const matchingMovie = movies.find(movie =>
    movie.showtimes.some(showtime => showtime._id === movieId)
  );
  // console.log(matchingMovie);
  return (
    <div className="max-w-4xl mx-auto p-5 bg-gray-100 font-sans">
      <h2 className="text-2xl font-bold text-red-500 text-center mb-6">
        Order Food
      </h2>

      <h3 className="text-lg font-semibold text-center mb-3 capitalize">current Movie: {matchingMovie.title}</h3>
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

      <h3 className="text-lg font-semibold text-center mb-4">Select Food</h3>
      <div className="space-y-6">
        {foodItems.map((food) => (
          <div
            key={food._id}
            className="flex items-center bg-white p-4 rounded-lg shadow"
          >
            <img
              src={food.poster}
              alt={food.foodName}
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {food.foodName}
              </h2>
              <p className="text-green-600">{food.description}</p>
              <p className="text-gray-800">Rs. {food.price}</p>
              <p className="text-gray-600">Vendor: {food.vendor}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="bg-yellow-500 text-white font-bold px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => handleDecrease(food)}
              >
                -
              </button>
              <span className="font-bold text-lg">
                {selectedItems.find(
                  (item) =>
                    item.foodName === food.foodName &&
                    item.vendor === food.vendor
                )?.quantity || 0}
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
            <li
              key={`${item.foodName}-${item.vendor}`}
              className="text-gray-800"
            >
              {item.foodName} (Vendor: {item.vendor}) - {item.quantity} x Rs.{' '}
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
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

export default OrderPage
