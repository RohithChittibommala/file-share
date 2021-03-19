import { useState } from "react";
import styled from "styled-components";

interface Props {}

const setOnScrollListener = (
  setHasMinHeight: React.Dispatch<React.SetStateAction<boolean>>
) =>
  window.addEventListener("scroll", (e) => {
    window.scrollY > 10 ? setHasMinHeight(true) : setHasMinHeight(false);
  });

const NavBar = (props: Props) => {
  const [hasMinHeight, setHasMinHeight] = useState(false);
  setOnScrollListener(setHasMinHeight);

  console.log("rerendered");
  return (
    <Wrapper hasBoxShadow={hasMinHeight}>
      <Logo>Anonymous Share</Logo>
      <Button>
        <a href="https://github.com/RohithChittibommala/file-share">GitHub</a>
      </Button>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.div<{ hasBoxShadow: boolean }>`
  display: flex;
  padding: 2.5vw 4vw;
  background-color: #ebf2f0;
  z-index: 4;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  transition: 200ms ease-in all;
  box-shadow: ${({ hasBoxShadow }) =>
    hasBoxShadow && "1px 7px 20px 7px #00000038"};
`;

const Logo = styled.h1`
  font-family: "Rakkas", cursive;
  color: #212a6d;
  font-size: 1.5rem;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  color: #646894;
  padding: 5px 15px;
  outline: none;
  border: 2px solid #646894;
  border-radius: 6px;

  a {
    text-decoration: none;
  }
`;
