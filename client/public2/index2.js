// start from here
// start from here
// start from here

const a = document.getElementById("but");
a.addEventListener("click", () => {
  const table = document.getElementsByClassName("dataframe")[0];
  html2pdf(table, {
    jsPDF: { format: "a3" },
  });
  console.log("clikced");
});
