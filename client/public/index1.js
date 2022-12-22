const btn = document.getElementById("sub_btn");

var form = document.getElementById("myform");
async function handleForm(event) {
  console.log("here");
  event.preventDefault();

  // id = "AIR";
  // id = "cat_rank";
  // id = "category";
  // id = "state";
  // id = "gen";

  const air = document.getElementById("AIR").value;
  const cat_rank = document.getElementById("cat_rank").value;
  const category = document.getElementById("category").value;
  const state = document.getElementById("state").value;
  const gen = document.getElementById("gen").checked;

  console.log(air);
  console.log(cat_rank);
  console.log(category);
  console.log(state);
  console.log(gen);

  console.log("DOM fully loaded and parsed");
  fetch("http://localhost:5000/ranklist", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      AIR: air,
      cat_rank: cat_rank,
      category: category,
      state: state,
      gen: gen,
    }),
  })
    // fetch("http://localhost:5000/ranklist")
    .then((result) => {
      return result.text();
    })
    .then((content) => {
      //   console.log(content);
      // document.getElementById("sub_btn").appendChild(content);
      // console.log(content);
      document.getElementById("table_here").innerHTML = content;
      // const table = document.getElementById("table_here");
      const table = document.getElementsByClassName("dataframe")[0];
      // html2pdf(table, {
      //   jsPDF: { format: "a3" },
      // });
      console.log("clikced");
    });
}
form.addEventListener("submit", handleForm);
