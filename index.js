const surveyJson = {
    elements: [{
        name: "FirstName",
        title: "Enter your first name:",
        type: "text"
    }, {
        name: "LastName",
        title: "Enter your last name:",
        type: "text"
    // }, {
    //       type: "image",
    //       name: "question2",
    //       imageLink: "img/CT1.png",
    //       imageFit: "cover",
    //       imageHeight: "contain",
    //       imageWidth: "50%",
    //       imageAlign: "center"
    }, {
        name: "third",
        title: "Enter something:",
        type: "text"
    }, {
          type: "rating",
          name: "nps_score",
          title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
          isRequired: true,
          rateCount: 11,
          rateMin: 0,
          rateMax: 10,
          minRateDescription: "(Most unlikely)",
          maxRateDescription: "(Most likely)"
    }
]
};

const survey = new Survey.Model(surveyJson);

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

function alertResults (sender) {
    const results = JSON.stringify(sender.data);
    alert(results);
}

survey.onComplete.add(alertResults);

document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
});
