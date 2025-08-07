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

  // ✅ Create the model
  const model = new Survey.Model(surveyJson);

  // ✅ Wrap in Survey.Survey UI component
  const surveyUI = new Survey.Survey(model);

  // ✅ Render into the container
  surveyUI.render(container);
});
