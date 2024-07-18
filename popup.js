document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.getElementById("registerButton");
  const stopBtn = document.getElementById("stopButton");

  registerBtn.addEventListener("click", function () {
    const courseName = "PULSE WIDTH MODULATION FOR POWER CONVERTERS";
    const courseId = "EE419";
    const frequency = 3000;

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
