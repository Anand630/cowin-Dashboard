import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const DataFormatter = number => {
  if (number > 1000) {
    return `${(number / 1000).toString()}k`
  }
  return number.toString()
}

const VaccinationCoverage = props => {
  const {sevenDaysVaccinationData} = props

  return (
    <div className="vaccination-bar-chart-container">
      <h1 className="vaccination-heading">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={sevenDaysVaccinationData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 0.3,
            fontSize: '12px',
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0.2,
            fontSize: '14px',
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar
          radius={[8, 8, 0, 0]}
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          barSize="20%"
        />
        <Bar
          radius={[10, 10, 0, 0]}
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
