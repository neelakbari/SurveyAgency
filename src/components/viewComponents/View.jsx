import Layout from "./Layout";
import Components from "../InputComponents";
import "../../scss/View.scss";

const View = ({  dropDown,currentUserIndex }) => {
  const ComponentToRender = Components[dropDown.component];
  let disabled = false;
  if (
    dropDown.component === "Textbox" ||
    dropDown.component === "Textarea" ||
    dropDown.component === "Date"
  ) {
    disabled = true;
  }
  return (
    <div className="view">
      <Layout
        ComponentToRender={ComponentToRender}
        disabled={disabled}
        currentUserIndex={currentUserIndex}
      />
    </div>
  );
};

export default View;
