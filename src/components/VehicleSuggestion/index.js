// Write your code here
import {Component} from 'react'
import SuggestionItem from '../SuggestionItem'
import './index.css'

class VehicleSuggestion extends Component {
  state = {fromCity: '', toCity: '', date: '', data: [], showResult: false}

  onChangeFromCity = event => {
    this.setState({fromCity: event.target.value, showResult: false})
  }

  onChangeToCity = event => {
    this.setState({toCity: event.target.value, showResult: false})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value, showResult: false})
  }

  searchCars = async () => {
    const {fromCity, toCity, date} = this.state
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/sai7santosh/1bc66fd047c638f6f36dbdd88b428bd1/raw/8e1fdd67a76633a9543bd7ac45944103851e18f0/dummyJsonData.json',
      )
      const data = await response.json()
      if (fromCity !== '' && toCity !== '' && date !== '') {
        this.setState({data, showResult: true})
      } else {
        alert('Please fill all the details')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  render() {
    const {fromCity, toCity, date, data, showResult} = this.state
    const availableCars = data.filter(
      eachCar => eachCar.city.toLowerCase() === fromCity.toLowerCase(),
    )
    const fromCityError = showResult && fromCity.length === 0
    const toCityError = showResult && toCity.length === 0
    const dateError = showResult && date === ''

    console.log(fromCity)
    return (
      <div className="bg-container">
        <div className="contentContainer">
          <div className="itemsContainer">
            <div>
              <label htmlFor="fromCity">From </label>
              <input
                value={fromCity}
                id="fromCity"
                onChange={this.onChangeFromCity}
              />
              {fromCityError && <p className="error">please enter city</p>}
            </div>

            <div>
              <label htmlFor="toCity">To </label>
              <input
                value={toCity}
                onChange={this.onChangeToCity}
                id="toCity"
              />
              {toCityError && <p className="error">please enter city</p>}
            </div>

            <div>
              <label htmlFor="date">Date:</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={this.onChangeDate}
              />
              {dateError && <p className="error">please enter date</p>}
            </div>

            <div>
              <button
                type="button"
                className="searchButton"
                onClick={this.searchCars}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {showResult && (
          <div>
            <ul className="resultsContainer">
              {availableCars.map(eachCar => (
                <SuggestionItem carDetails={eachCar} key={eachCar.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default VehicleSuggestion
