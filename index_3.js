document.addEventListener("DOMContentLoaded", function () {
  // (Optional) nicer mobile theme
  Survey.StylesManager.applyTheme("modern");

  const surveyJson = {
    pages: [
      {
        name: "page1",
        elements: [
          { name: "FirstName", title: "Enter your first name:", type: "text" },
          { name: "LastName",  title: "Enter your last name:",  type: "text" },
          { type: "image", name: "question2", imageLink: "img/CT1.png", imageFit: "contain", imageWidth: "100%" }
        ]
      }
    ]
  };

  const model = new Survey.Model(surveyJson);

  // 🔁 Send results to Google Apps Script
  model.onComplete.add(function (sender) {
    const payload = {
      ...sender.data,
      _submittedAt: new Date().toISOString(), // extra metadata, optional
    };

    fetch("YOUR_WEB_APP_URL_HERE", {
      method: "POST",
      headers: {
        // use text/plain to avoid CORS preflight
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    }).then(() => {
      console.log("✅ Sent to Google Sheet");
    }).catch(err => {
      console.error("❌ Failed to send:", err);
    });
  });

  // Render
  const surveyUI = new Survey.Survey(model);
  surveyUI.render(document.getElementById("surveyContainer"));
});
