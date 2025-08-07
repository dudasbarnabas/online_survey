const surveyJson = {
    elements: [{
        name: "FirstName",
        title: "Enter your first name:",
        type: "text"
    }, {
        name: "LastName",
        title: "Enter your last name:",
        type: "text"
    }]
};

const survey = new Survey.Model(surveyJson);

  // Example 1: Log results to the console
  console.log("Survey results:", results);

  // Example 2: Display on screen (optional)
  document.getElementById("surveyContainer").innerHTML =
    `<h3>Thanks, ${results.FirstName} ${results.LastName}!</h3>`;

// document.addEventListener("DOMContentLoaded", function() {
//     survey.render(document.getElementById("surveyContainer"));
// });
