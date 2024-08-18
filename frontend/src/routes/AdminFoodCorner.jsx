import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import './AdminFoodCorner.css'

const AdminFood = () => {
  const [foodItems, setFoodItems] = useState([])
  const [foodName, setFoodName] = useState('')
  const [vendor, setVendor] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [poster, setPoster] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/adminfood/food-items')
      .then((res) => res.json())
      .then((data) => setFoodItems(data))
      .catch((error) => console.error('Error fetching food items:', error))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newFoodItem = { foodName, vendor, price, description, poster }

    if (editingId) {
      console.log('hey frontend')
      // Update food item
      try {
        const response = await fetch(
          `http://localhost:8000/adminfood/food-items/${editingId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFoodItem)
          }
        )
        if (response.ok) {
          Swal.fire({
            title: 'Success',
            text: 'Food item updated successfully',
            icon: 'success'
          })
          resetForm()
          setEditingId(null)
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Failed to update food item',
            icon: 'error'
          })
        }
      } catch (error) {
        console.error('Error updating food item:', error)
      }
    } else {
      console.log('hey else frontend')
      // Add new food item
      try {
        const response = await fetch(
          'http://localhost:8000/adminfood/food-items',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFoodItem)
          }
        )
        if (response.ok) {
          Swal.fire({
            title: 'Success',
            text: 'Food item added successfully',
            icon: 'success'
          })
          resetForm()
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Failed to add food item',
            icon: 'error'
          })
        }
      } catch (error) {
        console.error('Error adding food item:', error)
      }
    }

    // Refresh the food items list
    fetch('http://localhost:8000/adminfood/food-items')
      .then((res) => res.json())
      .then((data) => setFoodItems(data))
      .catch((error) => console.error('Error fetching food items:', error))
  }

  const resetForm = () => {
    setFoodName('')
    setVendor('')
    setPrice('')
    setDescription('')
    setPoster('')
  }

  const handleEdit = (item) => {
    setFoodName(item.foodName)
    setVendor(item.vendor)
    setPrice(item.price)
    setDescription(item.description)
    setPoster(item.poster)
    setEditingId(item._id)
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/adminfood/food-items/${id}`,
        {
          method: 'DELETE'
        }
      )
      if (response.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Food item deleted successfully',
          icon: 'success'
        })
        setFoodItems(foodItems.filter((item) => item._id !== id))
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete food item',
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('Error deleting food item:', error)
    }
  }

  return (
    <div className="flex flex-wrap gap-5 justify-between p-5">
      <div className="flex-1 min-w-[300px] p-5 border border-gray-300 rounded-lg bg-gray-100">
        <h2 className="mb-5 text-xl">
          {editingId ? 'Edit Food Item' : 'Add Food Item'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-1">Food Name:</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Vendor:</label>
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              required
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Image URL:</label>
            <input
              type="text"
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
              required
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-400 text-red-600 font-bold py-2 px-4 rounded hover:bg-yellow-300"
          >
            {editingId ? 'Update Food Item' : 'Add Food Item'}
          </button>
        </form>
      </div>
      <div className="flex-1 min-w-[300px] p-5 border border-gray-300 rounded-lg bg-gray-100">
        <h3 className="mb-5 text-xl">Food Items List</h3>
        {foodItems.length > 0 ? (
          <ul className="space-y-5">
            {foodItems.map((food) => (
              <li key={food._id} className="flex items-center border-b pb-4">
                <img
                  src={food.poster}
                  alt={food.foodName}
                  className="w-24 h-24 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold">{food.foodName}</h4>
                  <p className="text-green-600">{food.description}</p>
                  <p className="text-black">Rs. {food.price}</p>
                  <p>{food.vendor}</p>
                </div>
                <div className="ml-auto flex space-x-2">
                  <button
                    onClick={() => handleEdit(food)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No food items found.</p>
        )}
      </div>
    </div>
  )
}

export default AdminFood
