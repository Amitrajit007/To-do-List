// DOM elements
// inputs
const input1 = document.querySelector(".input1");
const input2 = document.querySelector(".input2");
// buttons
const btn1 = document.querySelector(".btn1");
const cleareBtn = document.querySelector(".clearallBtn");
//display area
const displayArea1 = document.querySelector(".displayArea1");
// Global variables
let taskArray = [];
let localData = localStorage.getItem("key");
if (localData) {
  taskArray = JSON.parse(localData);
  renderTasks();
}
// function
function remainderAlert(message) {
  const box = document.getElementById("alertBox");
  const msg = document.getElementById("alertMessage");
  msg.textContent = message;
  box.style.display = "block";
}
remainderAlert(`Please use the Clear button before closing
 |
   Or else it will remain in your Local sorage.`);
function closeAlert() {
  document.getElementById("alertBox").style.display = "none";
} //there is onclick

function LocalStore() {
  localStorage.setItem("key", JSON.stringify(taskArray));
}
function addtoArray() {
  const data1 = input1.value.trim();
  const value = input2.value;
  if (data1 === "") {
    input1.classList.add("error");
  }
  if (!value) {
    input2.classList.add("error");
  }
  if (data1 === "" || value === "") return;
  const dateObj = new Date(value);
  const formated = dateObj.toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  console.log(formated);

  taskArray.push({
    task: data1,
    dateTime: formated,
  });
  LocalStore();
  input1.value = "";
  input2.value = "";

  renderTasks();
}
function renderTasks() {
  let renderHTML = "";
  taskArray.forEach((task, i) => {
    let slNO = i + 1;
    renderHTML += `
      <div class="task-block" data-index="${i}">
        <div  style=" 
        font-weight: 550;" class="task_container">
        <p class="slno">${slNO}.</p>
        <p class="customColor">${task.task}</p>
        <p style=" color: #555;">
            ${task.dateTime}
          </p>
        </div>
        <button type="button" class="deleteBtn" data-index="${i}">Delete</button>
        <div class="container">
          <button type="button" class="colorCHange" data-index="${i}">⚙</button>
          <div id="dropdownMenu" class="dropdown hidden">
            <a href="#">🟥 Crimson</a>
            <a href="#">🟦 Dodger Blue</a>
            <a href="#">🟩 Sea Green</a>
          </div>
        </div>
      </div>
    `;
    displayArea1.innerHTML = renderHTML;
    // Colorchanging eventListner
    const btns = document.querySelectorAll(".colorCHange");

    btns.forEach((dropbtn) => {
      const container = dropbtn.closest(".task-block");
      const menu = container.querySelector("#dropdownMenu");
      const taskParagraph = container.querySelector(".customColor");
      // Toggle menu
      dropbtn.addEventListener("click", (e) => {
        menu.classList.toggle("hidden");
        e.stopPropagation(); // Prevent immediate closing
      });

      // Handle color selection
      menu.addEventListener("click", (e) => {
        const choice = e.target.innerText;
        taskParagraph.classList.remove("fontCrimson", "fontBlue", "fontGreen");
        if (choice === "🟥 Crimson") {
          taskParagraph.classList.add("fontCrimson");
          taskParagraph.classList.remove("fontBlue", "fontGreen");
        } else if (choice === "🟦 Dodger Blue") {
          taskParagraph.classList.add("fontBlue");
          taskParagraph.classList.remove("fontCrimson", "fontGreen");
        } else if (choice === "🟩 Sea Green") {
          taskParagraph.classList.add("fontGreen");
          taskParagraph.classList.remove("fontCrimson", "fontBlue");
        }

        menu.classList.add("hidden"); // Close after selection
      });

      // Click outside to close
      document.addEventListener("click", (e) => {
        if (!dropbtn.contains(e.target) && !menu.contains(e.target)) {
          menu.classList.add("hidden");
        }
      });
    });

    // deletBtn EventListner
    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        // const index = btn.dataset.index;
        taskArray.splice(i, 1);
        LocalStore();
        if (taskArray.length === 0) {
          displayArea1.innerHTML = `All task is completed. `;
        } else {
          renderTasks();
        }
      });
    });
  });
}
// clear button
cleareBtn.addEventListener("click", () => {
  displayArea1.innerHTML = `You Currently Have No Task`;
  taskArray = [];
  renderTasks();
  input1.value = "";
  input2.value = "";
  input1.classList.remove("error");
  input2.classList.remove("error");
  localStorage.removeItem("key");
  localStorage.clear();
});
//
input1.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addtoArray();
  }
});
input1.addEventListener("input", () => {
  input1.classList.remove("error");
});
input2.addEventListener("input", () => {
  input2.classList.remove("error");
});
btn1.addEventListener("click", () => {
  addtoArray();
});
// window.addEventListener("beforeunload", function (e) {
//   if (taskArray.length > 0) {
//     e.preventDefault(); // required for some browsers
//     e.returnValue =
//       "Please use the Clear button before closing | Or else it will remain in your Local storage.";
//   }
// });
