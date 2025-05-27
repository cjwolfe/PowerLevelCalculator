

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent the default form submission
    
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; // get the selected file
    
    if (!file) {
        document.getElementById('output').innerText = "No file selected.";
        return;
    }
    
    // Log or handle the file (e.g., show name or send to server)
    document.getElementById('output').innerText = `Selected file: ${file.name}`;
    });
    

// Chart api info: https://www.w3schools.com/ai/ai_chartjs.asp

const myChart = new Chart("myChart", {
        type: "bar",
        data: {
            labels:xValues,
            datasets:[{
                backgroundColor: barColors,
                data:yValues,
            }]
        },
        options: {
        title: {
            display: true,
            text: "Mana Value of Your Submitted Decklist"
            }
        }
      });

var numBars = 16;
var xValues = [];
var yValues = [];
var barColors = "black";
for (i = 1; i < numBars; i++){
    xValues.push("MV " + i);
}
for (i = 0; i < numBars; i++){
    yValues.push(Math.random()*i);
}

