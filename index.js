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

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM is loaded");

  const container = document.getElementById("surveyContainer");
  console.log("🔍 container:", container);

  const model = new Survey.Model(surveyJson);
  const surveyUI = new Survey.Survey(model); // ✅ use the UI wrapper

  surveyUI.render(container); // ✅ pass DOM element
});
