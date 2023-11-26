import "./Button.css";
import RegisterModal from "./RegisterModal";
const Button = ({ type, variant, icon, className, onClick, children }) => {
  return (
    <button
      className= "btn"
      type={type ? type : "button"}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
