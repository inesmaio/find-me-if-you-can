import { Button } from "grommet";
import { Link } from "react-router-dom";

export const ButtonComponent = ({label, buttonAction, path}) => (<Link to={path}><Button label={label} onClick={buttonAction}></Button></Link>)


