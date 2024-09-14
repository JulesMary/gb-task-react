import { isRouteErrorResponse, useRouteError } from "react-router-dom";

interface ErrorMessageProps {
  message?: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>{error.statusText}</div>;
  }
  return message ? <div>{message}</div> : <div>Something went wrong</div>;
};

export { ErrorMessage };
