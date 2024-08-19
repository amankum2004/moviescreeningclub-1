const Food = require('@/models/food/food.model')

const getFoodItemsByShowTime = async (req, res) => {
  try {
    const { showTimeId } = req.params
    const foodItems = await Food.find({
      showtime: showTimeId
    })
    res.status(200).json(foodItems)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
const getFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find()
    res.status(200).json(foodItems)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createFoodItem = async (req, res) => {
  try {
    const {
      name,
      vendor,
      price,
      description,
      poster,
      quantity,
      showTimeId,
      available
    } = req.body
    console.log(req.body)
    const foodItem = new Food({
      name,
      price,
      vendor,
      description,
      poster,
      quantity,
      available,
      showtime: showTimeId
    })

    const newFoodItem = await foodItem.save()
    if (!newFoodItem) {
      return res.status(400).json({ message: 'Failed to save food item' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error saving food item:', err)
    res.status(400).json({ message: err.message })
  }
}

const updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const updatedFoodItem = await Food.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    })

    if (!updatedFoodItem) {
      return res.status(404).json({ message: 'Food item not found' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    res.status(400).json({ message: 'Error updating food item', error })
  }
}

const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params
    const deletedFoodItem = await Food.findByIdAndDelete(id)
    if (!deletedFoodItem) {
      return res.status(404).json({ message: 'Food item not found' })
    }
    return res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting food item', error })
  }
}

module.exports = {
  getFoodItems,
  getFoodItemsByShowTime,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem
}
