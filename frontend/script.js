function setLocalStorage(value) {
  chrome.storage.local
    .set({
      key: value,
    })
    .then(() => {
      console.log("Value is set");
    });
}

//setLocalStorage([
//  "https://x.com/",
//  "https://www.reddit.com/",
//  "https://twitter.com/",
//]);

function renderAddButton(container, array) {
  const button = document.createElement("button");

  button.innerText = "+";
  button.className = "add-button";

  const div = document.createElement("div");
  div.className = "add-button-container";

  button.addEventListener("click", (event) => {
    array.push([""]);
    setLocalStorage(array);
    renderList(container, array);
  });

  div.appendChild(button);
  container.appendChild(div);
}

function renderList(container, array) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const div = document.createElement("div");
    div.className = "list-item-div";
    const input = document.createElement("input");
    input.value = array[i];

    input.addEventListener("change", (event) => {
      array[i] = event.target.value.replace(/^https?:\/\//, "");
      setLocalStorage(array);
    });

    div.appendChild(input);

    const button = document.createElement("button");
    button.innerText = "X";

    button.addEventListener("click", (event) => {
      array.splice(i, 1);
      setLocalStorage(array);
      renderList(container, array);
    });

    div.appendChild(button);

    container.appendChild(div);
  }

  renderAddButton(container, array);
}

const container = document.getElementById("container");
chrome.storage.local.get(["key"]).then((result) => {
  const array = result.key;

  renderList(container, array);
});
