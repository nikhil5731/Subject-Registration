document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.getElementById("registerButton");
  const stopBtn = document.getElementById("stopButton");

  registerBtn.addEventListener("click", function () {
    const courseName = "DATA STRUCTURES";
    const courseId = "CO201";
    const frequency = 1500;

    chrome.runtime.sendMessage({
      action: "startApplying",
      courseName: courseName,
      courseId: courseId,
      frequency: frequency,
    });
  });
  stopBtn.addEventListener("click", function () {
    chrome.runtime.sendMessage({
      action: "stopApplying",
    });
  });
});
