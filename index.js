const surveyJson = {
  title: "NPS Survey Question",
  logoHeight: "60px",
  completedHtml: "<h3>Thank you for your feedback</h3>",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "question1"
        }
      ]
    }
  ],
  headerView: "advanced"
};

// Create Survey model
const survey = new Survey.Model(surveyJson);

// Render when page loads
document.addEventListener("DOMContentLoaded", function () {
  survey.render("surveyContainer");
});