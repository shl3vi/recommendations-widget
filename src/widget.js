import styles from "./styles/index.css";
import { createWidgetContent } from "./components/widget-content.js";

const WIDGET_WRAPPER_ELEMENT_ID = "taboola-recommendations-widget-placeholder";

export const addWidgetToSite = async () => {
  try {
    const widget = await createWidgetContent();
    const widgetElement = `<div id="taboola-recommendations-widget">${widget}</div>`;
    document.getElementById(WIDGET_WRAPPER_ELEMENT_ID).innerHTML =
      widgetElement;
  } catch (e) {
    console.log(e.message);
    console.log(
      "Something went wrong, widget wont load. Maybe better to monitor this cases"
    );
  }
};

addWidgetToSite();
