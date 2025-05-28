import React from 'react'
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import GaugeChart from 'react-gauge-chart'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

// Mock data - replace with real data in a production environment
const mockData = {
  testCaseCoverage: 85,
  firstPassYield: 70,
  defectDensity: 2.5,
  defectLeakage: 15,
  defectSeverity: {
    Critical: 5,
    High: 15,
    Medium: 30,
    Low: 50,
  },
  avgDefectTurnaroundTime: 2.5, // days
  testExecutionRate: 20, // per day
  automatedTestCoverage: 60,
  cycleTimeQA: 3, // days
  integrationTestPassRate: 80,
  regressionTestEffectiveness: 75,
  testerUtilizationRate: 85,
  qaStoryPointsCompleted: 40,
  defectReopenRate: 10,
  correctionCycleDuration: 1.5, // days
  customerReportedDefects: 5,
  overallSprintQualityRating: 4, // out of 5
}

export default function QADashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">QA Metrics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Story-Level Testing KPIs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Story-Level Testing KPIs</h2>
          <GaugeChart 
            id="test-case-coverage" 
            nrOfLevels={3} 
            percent={mockData.testCaseCoverage / 100} 
            textColor="#000000"
          />
          <p className="text-center mt-2">Test Case Coverage: {mockData.testCaseCoverage}%</p>
          <GaugeChart 
            id="first-pass-yield" 
            nrOfLevels={3} 
            percent={mockData.firstPassYield / 100} 
            textColor="#000000"
          />
          <p className="text-center mt-2">First Pass Yield: {mockData.firstPassYield}%</p>
        </div>

        {/* Defect Management KPIs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Defect Management KPIs</h2>
          <Bar 
            data={{
              labels: ['Defect Density', 'Defect Leakage'],
              datasets: [{
                label: 'Defect Metrics',
                data: [mockData.defectDensity, mockData.defectLeakage],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
              }]
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
          <Pie 
            data={{
              labels: Object.keys(mockData.defectSeverity),
              datasets: [{
                data: Object.values(mockData.defectSeverity),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 205, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                ],
              }]
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Defect Severity Distribution'
                }
              }
            }}
          />
        </div>

        {/* Testing Efficiency KPIs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Testing Efficiency KPIs</h2>
          <Line 
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              datasets: [{
                label: 'Test Execution Rate',
                data: [18, 20, 22, 19, 21],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
          <GaugeChart 
            id="automated-test-coverage" 
            nrOfLevels={3} 
            percent={mockData.automatedTestCoverage / 100} 
            textColor="#000000"
          />
          <p className="text-center mt-2">Automated Test Coverage: {mockData.automatedTestCoverage}%</p>
        </div>

        {/* Integration & Regression Testing KPIs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Integration & Regression Testing KPIs</h2>
          <Doughnut 
            data={{
              labels: ['Pass', 'Fail'],
              datasets: [{
                data: [mockData.integrationTestPassRate, 100 - mockData.integrationTestPassRate],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
              }]
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Integration Test Pass Rate'
                }
              }
            }}
          />
          <p className="text-center mt-4">Regression Test Effectiveness: {mockData.regressionTestEffectiveness}%</p>
        </div>

        {/* QA Resource Utilization KPIs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">QA Resource Utilization KPIs</h2>
          <GaugeChart 
            id="tester-utilization" 
            nrOfLevels={3} 
            percent={mockData.testerUtilizationRate / 100} 
            textColor="#000000"
          />
          <p className="text-center mt-2">Tester Utilization Rate: {mockData.testerUtilizationRate}%</p>
          <p className="text-center mt-4">QA Story Points Completed: {mockData.qaStoryPointsCompleted}</p>
        </div>

        {/* Defect Correction Efficiency KPIs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Defect Correction Efficiency KPIs</h2>
          <Bar 
            data={{
              labels: ['Defect Reopen Rate', 'Correction Cycle Duration'],
              datasets: [{
                label: 'Defect Correction Metrics',
                data: [mockData.defectReopenRate, mockData.correctionCycleDuration],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
              }]
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>

        {/* Product Quality KPIs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Product Quality KPIs</h2>
          <p className="text-center text-2xl font-bold">Customer-Reported Defects: {mockData.customerReportedDefects}</p>
          <div className="mt-4">
            <p className="text-center">Overall Sprint Quality Rating</p>
            <div className="flex justify-center items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-8 h-8 ${
                    star <= mockData.overallSprintQualityRating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}