let intervalId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startApplying") {
    const { courseName, courseId,frequency } = request;
    let stopFlag = false;
    

    intervalId = setInterval(async () => {
      console.log(stopFlag);
      if (stopFlag) {
        clearInterval(intervalId); // Stop the interval if the flag is true
      } else {
        let [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        const [results] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: function (courseName, courseId) {
            console.log("AGAIN!");
            const elements = document.querySelectorAll(
              ".table-group-divider"
            )[1];
            // console.log(elements);
            for (let i = 0; i < elements.children.length; i++) {
              const currCourseName =
                elements?.children[i]?.children[0]?.innerText;
              const currCourseId =
                elements?.children[i]?.children[1]?.innerText;
              const registerBtn =
                elements?.children[i]?.children[5]?.children[0]?.children[0];
              const isDisabled =
                elements?.children[i]?.children[5]?.children[0]?.children[0]
                  .disabled;
              const bgcolor = elements?.children[i].getAttribute("bgcolor");

              // if(currCourseName && currCourseId){
              //   if(!bgcolor && !isDisabled) console.log(currCourseName)
              // }

              if (!currCourseName || !currCourseId) continue;

              if (
                currCourseName.includes(courseName) &&
                currCourseId.includes(courseId)
              ) {
                if (!bgcolor && !isDisabled) {
                  registerBtn.click();
                  return true;
                } else {
                  return false;
                }
              }
            }
            return false;
          },
          args: [courseName, courseId],
        });

        if (results.result) {
          stopFlag = true; // Set the flag to true if the course was registered
        } else chrome.tabs.reload(tab.id); // Refresh the page
      }
    }, frequency); // Repeat every 2 seconds
  } else if (request.action === "stopApplying") {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
});
