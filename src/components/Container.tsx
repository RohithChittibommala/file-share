import { useRef, useState } from "react";
import styled from "styled-components";
import LinesEllipsis from "react-lines-ellipsis";
interface Props {
  handleFileUpload: (files: File) => void;
}

type dragEvent = React.DragEvent<HTMLDivElement>;
const renderFileImage = (className: string) => (
  <img
    src={require("../file.svg").default}
    alt="document svg"
    draggable={false}
    className={className}
  />
);

const Container = ({ handleFileUpload }: Props) => {
  const [draggedOver, setDraggedOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
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
    const { files } = e.dataTransfer;

    if (files.length) setFile(files[0]);
  };

  const handleFileRemoval = () => {
    setFile(null);
  };

  const renderFileInput = () => (
    <input
      type="file"
      ref={inputRef}
      onChange={(e) => e.target.files && setFile(e.target.files[0])}
    />
  );

  return (
    <UploadContainer>
      <DropZone
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleOnDrop}
        draggedOver={draggedOver}
      >
        {!file ? (
          <>
            <ImageContainer>
              {renderFileImage(`center ${imageClassName}`)}
              {renderFileImage(`left ${imageClassName}`)}
              {renderFileImage(`right ${imageClassName}`)}
            </ImageContainer>
            <TextContainer>
              <Text center>
                Drop Your files here or
                <span onClick={() => inputRef?.current?.click()}>browse</span>
              </Text>
            </TextContainer>
          </>
        ) : (
          <FileCard>
            <div>
              <LinesEllipsis
                text={file.name}
                maxLine="1"
                className="file-name"
              />
              <p className="remove" onClick={handleFileRemoval}>
                remove
              </p>
            </div>
            <Button onClick={() => handleFileUpload(file)}>Upload</Button>
          </FileCard>
        )}
        {renderFileInput()}
      </DropZone>
    </UploadContainer>
  );
};

export default Container;

const UploadContainer = styled.div`
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 0px 17px 18px 3px #0000001f;
  margin: 25px;
`;

const DropZone = styled.div<{ draggedOver: boolean }>`
  width: 500px;
  transition: 200ms ease-in all;
  padding: 0 12px;
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
  height: 85px;
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
const TextContainer = styled.div`
  padding: 12px;
`;

const FileCard = styled.div`
  box-shadow: -1px 2px 14px 0px #3498db2e;
  width: 100%;
  padding: 18px 12px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    width: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;

    .remove {
      position: absolute;
      right: 0;
      color: red;
      height: 100%;
      background-color: #fff;

      cursor: pointer;
    }
  }
`;

const Button = styled.button`
  width: 160px;
  margin: 10px auto;
  border: none;
  color: #fff;
  background: #1c92c0;
  padding: 6px 4px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
`;

export const Text = styled.p<{ size?: "large"; center?: boolean }>`
  font-size: ${(props) => (props.size === "large" ? "24px" : "16px")};
  text-align: ${({ center }) => center && "center"};

  span {
    cursor: pointer;
    margin: 0 5px;
    color: #3ddd28;
  }
`;
