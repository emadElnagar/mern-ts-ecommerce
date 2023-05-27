import { Box } from "../styles/main";

const ErrorBox = (props: any) => {
  const message = props.message;
  return (
    <Box className="error">{ message }</Box>
  )
}

export default ErrorBox;
