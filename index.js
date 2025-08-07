const surveyJson = {
  elements: [
    {
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    },
    {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }
  ]
};

const survey = new Survey.Model(surveyJson);

// ✅ This line renders the survey inside the div
document.addEventListener("DOMContentLoaded", function () {
  survey.render("surveyContainer");
});