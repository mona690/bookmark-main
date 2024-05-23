var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");

var bookmarkList;

if (localStorage.getItem("bookmarkList") == null) {
  bookmarkList = [];
} else {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  display(bookmarkList);
}

function addBookmark() {
  var bookmark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value,
  };
  console.log(siteNameInput.value, siteUrlInput.value);
  if (
    siteNameInput.value != "" &&
    siteUrlInput.value != "" &&
    validateInputs(siteNameInput)
    // && validateInputs(siteNameInput)
  ) {
    bookmarkList.push(bookmark);
    console.log("not null");
  } else {
    console.log(" null");
    document.getElementById("liveToast").classList.add("display-none-rev");
    document.getElementById("liveToast").classList.remove("hide");
  }

  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  display(bookmarkList);
  clearInput();
}

function clearInput() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

function display(list) {
  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    console.log(list[i].siteUrl);
    cartona += `
        <tr>
                <td scope="row">${i + 1}</td>
                <td class="text-capitalize">${list[i].siteName}</td>
                <td>
                  <button
                    class="btn btn-success btn-sm px-4 py-2 fw-bolder fs-6"
                  >
                    <a class="text-decoration-none text-light" href="${
                      list[i].siteUrl
                    }" target="_blank">
                      <i class="fa-solid fa-eye pe-2"></i>Visit</a>
                  </button>
                </td>
                <td>
                  <button
                  onclick="deleteBookmark(${i})"
                    class="btn btn-danger btn-sm px-3 py-2 fw-bolder fs-6"
                  >
                    <i class="fas fa-trash-alt pe-2" ></i> Delete
                  </button>
                </td>
              </tr>
        
        `;
  }
  document.getElementById("table-body").innerHTML = cartona;
}

function deleteBookmark(deletedOne) {
  bookmarkList.splice(deletedOne, 1);
  display(bookmarkList);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
}

function validateInputs(element) {
  var value = element.value;
  var id = element.id;
  var inputsRegex = {
    siteName: /^[a-zA-z0-9]{3,}$/,
     siteUrl: /^.{1,}$/,
    // siteUrl: /^[a-zA-Z0-9]{1,}\.[a-zA-Z0-9]{2,}$/,
  };

  if (inputsRegex[id].test(value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    console.log("match");
    return true;
  } else {
    console.log("mismatch");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

function closeToast() {
  document.getElementById("liveToast").classList.remove("display-none-rev");
  document.getElementById("liveToast").classList.add("hide");
}
