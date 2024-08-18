import { useEffect, useState} from 'react';

const vendorPage = () => { 
  const [movies, setMovies] = useState([])
  const [foodItems, setFoodItems] = useState([])

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
  console.log(foodItems);
  return (
    <div>
      <h1>Vendor Page</h1>
      
      <div>
        <h2>Food Items</h2>
        
        <ul>
          {foodItems.map((item) => (
            <li key={item._id}>
              <h3>{item.foodName}</h3>
              <p>{item.vendor}</p>
              <p>{item.price}</p>
              <p>{item.description}</p>
              <img src={item.poster} alt={item.foodName} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default vendorPage