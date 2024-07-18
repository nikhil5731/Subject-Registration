document.addEventListener("DOMContentLoaded", function () {
    // Select input elements from the popup.html DOM
    const courseNameInput = document.getElementById("courseName");
    const courseIdInput = document.getElementById("courseId");
    const registerBtn = document.getElementById("registerButton");
  
    let stopFlag = false; // Flag to stop the interval
  
    async function startApplying(courseName, courseId) {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const [results] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: function (courseName, courseId) {
          console.log("emem");
          const elements = document.querySelectorAll(".table-group-divider")[1];
          // console.log(elements)
  
          for (let i = 0; i < elements.children.length; i++) {
            const currCourseName = elements?.children[i]?.children[0]?.innerText;
            const currCourseId = elements?.children[i]?.children[1]?.innerText;
            const registerBtn =
              elements?.children[i]?.children[5]?.children[0]?.children[0];
            const isDisabled =
              elements?.children[i]?.children[5]?.children[0]?.children[0]
                .disabled;
            const bgcolor = elements?.children[i].getAttribute("bgcolor");
  
            if (!currCourseName || !currCourseId) continue;
  
            // if (bgcolor || isDisabled) continue;
  
            if (currCourseName && currCourseId && courseId && courseName) {
              if (
                currCourseName.includes(courseName) &&
                currCourseId.includes(courseId)
              ) {
                if (!bgcolor && !isDisabled) {
                  // registerBtn.click();
                  // console.log("Yes");
                  return true;
                }
                return false;
              }
            }
  
            // console.log(currCourseName);
          }
  
          return false;
        },
        args: [courseName, courseId],
      });
      console.log(results.result);
      if (results.result) {
        stopFlag = true; // Set the flag to true if the course was registered
      }
    }
  
    // Add click event listener to the register button
    registerBtn.addEventListener("click", function () {
      const courseName = "DATA ANALYTICS";
      const courseId = "EC455";
      const intervalId = setInterval(async () => {
        if (stopFlag) {
          clearInterval(intervalId); // Stop the interval if the flag is true
        } else {
          let [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          });
          chrome.tabs.reload(tab.id); // Refresh the page
  
          startApplying(courseName, courseId);
        }
      }, 2000); // Repeat every 3 seconds
    });
  });
  