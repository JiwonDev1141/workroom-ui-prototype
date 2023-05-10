import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const toast = ({ title, description, type, timeout }) => {
  createToast(
    {
      title,
      description,
    },
    {
      type,
      timeout,
      hideProgressBar: "true",
      position: "bottom-right",
    }
  );
};

export default toast;
