import _ from "lodash";
import "./style/style.css";
import Icon from "./assets/icon.svg";

function component() {
  const element = document.createElement("div");
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  //Add image to the div
  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
