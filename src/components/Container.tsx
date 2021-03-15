import { useRef, useState } from "react";
import styled from "styled-components";
interface Props {}

type dragEvent = React.DragEvent<HTMLDivElement>;

const renderFileImage = (className: string) => (
  <img
    src={require("../file.svg").default}
    alt="document svg"
    draggable={false}
    className={className}
  />
);

const Container = (props: Props) => {
  const [draggedOver, setDraggedOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileList>();
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(uploadedFiles);
  const imageClassName = draggedOver ? "dragged" : "";

  const handleDragOver = (e: dragEvent) => {
    e.preventDefault();
    !draggedOver && setDraggedOver(true);
  };
  const handleDragLeave = (e: dragEvent) => {
    e.preventDefault();
    draggedOver && setDraggedOver(false);
  };
  const handleOnDrop = (e: dragEvent) => {
    e.preventDefault();
    setDraggedOver(false);
    if (e.dataTransfer.files.length) setUploadedFiles(e.dataTransfer.files);
  };

  return (
    <UploadContainer>
      <DropZone
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleOnDrop}
        draggedOver={draggedOver}
      >
        <ImageContainer>
          {renderFileImage(`center ${imageClassName}`)}
          {renderFileImage(`left ${imageClassName}`)}
          {renderFileImage(`right ${imageClassName}`)}
        </ImageContainer>
        <input type="file" ref={inputRef} onChange={(E) => console.log(E)} />
        <TextContainer>
          <Text>
            Drop Your files here or
            <span onClick={() => inputRef?.current?.click()}>browse</span>
          </Text>
        </TextContainer>
      </DropZone>
    </UploadContainer>
  );
};

export default Container;

const UploadContainer = styled.div`
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px 17px 18px 3px #0000001f;
  margin: 25px;
`;

const DropZone = styled.div<{ draggedOver: boolean }>`
  width: 500px;
  transition: 200ms ease-in all;
  max-width: 100%;
  min-height: 200px;
  background: ${({ draggedOver }) => draggedOver && "#eff5fe"};
  border: ${({ draggedOver }) =>
    draggedOver ? "4px dashed #2196f3" : "2px dashed #0288d147"};
  border-radius: 10px;
  margin: 30px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }
`;

const ImageContainer = styled.div`
  height: 100px;
  width: 75px;
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

const TextContainer = styled.div``;

export const Text = styled.p<{ size?: "large" }>`
  font-size: ${(props) => (props.size === "large" ? "24px" : "16px")};

  span {
    cursor: pointer;
    margin: 0 5px;
    color: #3ddd28;
  }
`;
