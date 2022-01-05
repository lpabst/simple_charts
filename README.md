# Charts
Some simple, customizeable charts with actual documentation

## Pie Chart
Here is an example of usage along with what the props should look like
```javascript
<PieChart data={data} title={title}>

// this prop is Optional
const title = {
  text: "Budget", // Optional (if no text is provided, the title won't show up)
  fontSize: 20, // Optional, default is based on chart size
  fontFamily: 'Arial', // Optional, default Arial
  color: 'black' // Optional, default black
};

// this prop is Required. Each object in this array represents a section of the pie chart
const data = [
  {
    label: "rent", // Optional
    value: 1860, // Optional, defaults to 0
    color: "blue", // Optional, defaults to a random color on each render
  },
  {
    label: "gas",
    value: 250,
    color: "green",
  },
];
```