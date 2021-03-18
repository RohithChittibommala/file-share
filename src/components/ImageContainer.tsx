import { ReactChild } from "react";
import styled from "styled-components";
import { Text } from "./Container";

interface Props {
  imageClassName: string;
  inputRef: React.RefObject<HTMLInputElement>;
  children: ReactChild;
}

const renderFileImage = (className: string) => (
  <img
    src={require("../file.svg").default}
    alt="document svg"
    draggable={false}
    className={className}
  />
);

const ImageContainer = ({ imageClassName, inputRef, children }: Props) => {
  return (
    <div>
      <ImageContainerDiv>
        {renderFileImage(`center ${imageClassName}`)}
        {renderFileImage(`left ${imageClassName}`)}
        {renderFileImage(`right ${imageClassName}`)}
      </ImageContainerDiv>
      {children}
    </div>
  );
};

export default ImageContainer;

const ImageContainerDiv = styled.div`
  height: 85px;
  width: 75px;
  margin: 0 auto;
  img {
    width: 75px;
    object-fit: contain;
    position: absolute;
    transition: transform 250ms ease-in-out;
    transform-origin: bottom;
  }
  .center {
    z-index: 3;
  }
  .dragged.center {
    transform: translateY(-10px);
  }
  .dragged.left {
    transform: rotate(15deg) translateX(20px) scale(0.9);
    filter: grayscale(0.8);
  }
  .dragged.right {
    filter: grayscale(0.8);
    transform: rotate(-15deg) translateX(-20px) scale(0.9);
  }
`;
