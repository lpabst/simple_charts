import "./App.css";
import PieChart from "./components/PieChart";

const pieChartTitleData = {
  text: "Budget",
};

const pieChartSectionData = [
  {
    label: "rent",
    value: 1860,
    color: "blue",
  },
  {
    label: "gas",
    value: 250,
    color: "green",
  },
  {
    label: "car payment",
    value: 300,
  },
  {
    label: "groceries",
    value: 650,
  },
  {
    label: "entertainment",
    value: 150,
  },
  {
    label: "personal money",
    value: 40,
  },
];

function App() {
  return (
    <div className="App">
      <div style={{ width: "300px", height: "300px" }}>
        <PieChart data={pieChartSectionData} titleData={pieChartTitleData} />
      </div>
    </div>
  );
}

export default App;
