import { useRef, useState } from "react";
import styled from "styled-components";
import FileCard from "./FileCard";
import ImageContainer from "./ImageContainer";
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
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);

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

    if (files.length) {
      const file = files[0];
      const fileSize = Math.floor(file.size / Math.pow(1024, 2));

      if (fileSize < 10) {
        setFile(files[0]);
        setFileSizeExceeded(false);
        return;
      }

      setFileSizeExceeded(true);
    }
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
        fileSizeExceeded={fileSizeExceeded}
      >
        {!file ? (
          <ImageContainer imageClassName={imageClassName} inputRef={inputRef}>
            <TextContainer>
              {fileSizeExceeded ? (
                <>
                  <ErrorText>sorry your files are too heavy</ErrorText>
                </>
              ) : (
                <Text center>
                  Drop Your files here or
                  <span onClick={() => inputRef?.current?.click()}>browse</span>
                </Text>
              )}
            </TextContainer>
          </ImageContainer>
        ) : (
          <FileCard
            file={file}
            handleFileRemoval={handleFileRemoval}
            handleFileUpload={handleFileUpload}
            setFile={setFile}
          />
        )}
        {renderFileInput()}
      </DropZone>
    </UploadContainer>
  );
};

export default Container;

const UploadContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 17px 18px 3px #0000001f;
  margin: 25px;
`;

const DropZone = styled.div<{
  draggedOver: boolean;
  fileSizeExceeded: boolean;
}>`
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
  background-color: ${({ fileSizeExceeded }) => fileSizeExceeded && `#F04747`};
  input {
    display: none;
  }
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
const TextContainer = styled.div`
  padding: 12px;
`;

const ErrorText = styled.h2`
  font-weight: bold;
  color: #fbd1d1;
`;
