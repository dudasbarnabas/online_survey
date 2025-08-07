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

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM is loaded");
  const container = document.getElementById("surveyContainer");
  console.log("🔍 container:", container);
  survey.render("surveyContainer");
});
