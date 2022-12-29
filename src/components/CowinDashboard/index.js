import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    formatted7DaysVaccinationData: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCowinData()
  }

  formattedData = eachDayData => ({
    dose1: eachDayData.dose_1,
    dose2: eachDayData.dose_2,
    vaccineDate: eachDayData.vaccine_date,
  })

  getCowinData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      console.log(response)
      const formatted7DaysVaccinationData = data.last_7_days_vaccination.map(
        eachDayData => this.formattedData(eachDayData),
      )

      this.setState({
        formatted7DaysVaccinationData,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getDisplayData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getSuccessView()

      case apiStatusConstants.inProgress:
        return this.getLoadingView()
      case apiStatusConstants.failure:
        return this.getFailureView()

      default:
        return null
    }
  }

  getSuccessView = () => {
    const {
      formatted7DaysVaccinationData,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <div className="charts-container">
        <VaccinationCoverage
          sevenDaysVaccinationData={formatted7DaysVaccinationData}
        />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  // testid="loader"

  getLoadingView = () => (
    <div testid="loader" className="loading-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  getFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  render() {
    return (
      <div className="home-container">
        <div className="logo-and-text-container">
          <img
            className="co-win-logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <p className="logo-name">Co-WIN</p>
        </div>
        <h1 className="co-win-heading">CoWIN Vaccination in India</h1>
        {this.getDisplayData()}
      </div>
    )
  }
}

export default CowinDashboard
