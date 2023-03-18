/// <reference types="../@types/jquery" />

import { Home } from "./home.js";
import { Search } from "./search.js";
import { Category } from "./category.js";
import { Contact } from "./contact.js";
import { Area } from "./area.js";
import { Ingrediants } from "./ingrediants.js";

//--------navbar animation---------
const linkss = $("#nav li");

//close navbar
const w = $("#links").innerWidth();
console.log(w);
$("#nav").animate({ left: -w }, 500);
const w2 = $("#nav ul").innerWidth();
console.log(w2);
linkss.animate({ top: w }, 500);

// ----------home section -----------

if (
  window.location.pathname == "/index.html" ||
  window.location.pathname == "/"
) {
  let home = new Home();
} else if (window.location.pathname == "/search.html") {
  let search = new Search();
} else if (window.location.pathname == "/categories.html") {
  let category = new Category();
} else if (window.location.pathname == "/contact.html") {
  let contact = new Contact();
} else if (window.location.pathname == "/area.html") {
  let area = new Area();
} else if (window.location.pathname == "/ingrediants.html") {
  let ingrediants = new Ingrediants();
}

//---------navbar------------
export let flag = 1;
$("#menu-toggle").click(function () {
  console.log("clicked");
  if (!flag) {
    console.log(w);
    $("#nav").animate({ left: -w }, 500);
    $("#menu-toggle").html('<i class="fa-solid fa-bars"></i>');
    linkss.animate({ top: w }, 500);
    flag = 1;
  } else {
    $("#nav").animate({ left: "0" }, 500);
    $("#menu-toggle").html('<i class="fa-solid fa-xmark"></i>');
    linkss.animate({ top: 0 }, 500);
    flag = 0;
  }
});
