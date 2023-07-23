// Write your code here
import './index.css'

const SuggestionItem = props => {
  const {carDetails} = props
  return (
    <div className="listItem">
      <li>
        <p>
          <span>car model: </span>
          {carDetails.carName}
        </p>
        <p>
          <span>seating capacity: </span>
          {carDetails.seatingCapacity}
        </p>
        <p>
          <span>city: </span>
          {carDetails.city}
        </p>
      </li>
    </div>
  )
}
export default SuggestionItem
