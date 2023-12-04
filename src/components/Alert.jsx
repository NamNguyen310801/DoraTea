import { Alert } from "antd";
const AlertX = ({ type, message }) => {
  if (type === "success") {
    return (
      <Alert
        message={message}
        type="success"
        showIcon
        className="fixed z-[52] top-32 right-12 px-4 py-2 transition ease-in-out duration-300"
      />
    );
  }
  if (type === "info") {
    return (
      <Alert
        message={message}
        type="info"
        className="fixed z-[52] top-32 right-12 px-4 py-2 transition ease-in-out duration-300"
        showIcon
      />
    );
  }
  if (type === "warning") {
    return (
      <Alert
        message={message}
        type="warning"
        showIcon
        closable
        className="fixed z-[52] top-32 right-12 px-4 py-2 transition ease-in-out duration-300"
      />
    );
  }
  if (type === "error") {
    return (
      <Alert
        message={message}
        type="error"
        className="fixed z-[52] top-32 right-12 px-4 py-2 transition ease-in-out duration-300 max-w-[350px] flex-wrap"
        showIcon
      />
    );
  }
};

export default AlertX;
