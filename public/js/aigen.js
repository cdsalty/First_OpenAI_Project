function onSubmit(e) {
  e.preventDefault();

  // Make sure we start off with empty values
  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please use some kind of an imigination");
  }

  // test out functionality before continuing. Once it works, we need to create an async function to handle the request and generate the image
  // console.log("Submit properly works");

  requestAiImage(prompt, size);
}

// 3) create the async function to requestAiImage
async function requestAiImage(prompt, size) {
  try {
    displaySpinner();
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    if (!response.ok) {
      removeSpinner();
      throw new Error("Image could not be generated.");
    }
    const data = await response.json();
    // console.log(data);
    const imageUrl = data.data;

    document.querySelector("#image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

// 4) Create functions to show or hide a spinner
function displaySpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// 1) Start off by adding event listener to the form
document.querySelector("#image-form").addEventListener("submit", onSubmit);
