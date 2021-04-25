import { Button } from "antd";
import { setLinkProps } from "hookrouter";

const NavButton = (props) => <Button {...setLinkProps(props)} />;

export default NavButton;
