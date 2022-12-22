document.addEventListener("DOMContentLoaded", async (event) => {
  console.log("DOM fully loaded and parsed");
  fetch("http://localhost:5000/ranklist")
    .then((result) => {
      return result.text();
    })
    .then((content) => {
      //   console.log(content);
      document.getElementById("p1").innerHTML = content;
    });
});
