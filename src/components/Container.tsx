import { useRef, useState } from "react";
import styled from "styled-components";
import FileCard from "./FileCard";
import ImageContainer from "./ImageContainer";
interface Props {
  handleFileUpload: (files: File) => void;
}

type dragEvent = React.DragEvent<HTMLDivElement>;

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
    setFile(null);
    const { files } = e.dataTransfer;

    if (files.length) {
      const file = files[0];
      const fileSize = Math.floor(file.size / Math.pow(1024, 2));
      if (fileSize < 25) {
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
    <UploadContainer fileSizeExceeded={fileSizeExceeded}>
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
                  <ErrorTextSmall>
                    Max file size is 25.00 MB please.
                  </ErrorTextSmall>
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

const UploadContainer = styled.div<{ fileSizeExceeded: boolean }>`
  background-color: ${({ fileSizeExceeded }) =>
    fileSizeExceeded ? "#F04747" : "#fff"};
  border-radius: 10px;
  box-shadow: 0px 17px 18px 3px #0000001f;
  height: 300px;
  padding: 25px;
  display: flex;
  align-items: center;
  width: 50%;
  min-width: 350px;
  transition: 200ms ease-in background-color;
`;

const DropZone = styled.div<{
  draggedOver: boolean;
  fileSizeExceeded: boolean;
}>`
  width: 100%;
  transition: 200ms ease-in all;
  padding: 12px;
  max-width: 100%;
  min-height: 200px;
  height: 100%;
  background: ${({ draggedOver }) => draggedOver && "#eff5fe"};
  border: ${({ draggedOver }) =>
    draggedOver ? "4px dashed #2196f3" : "2px dashed #0288d147"};
  border-radius: 10px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ fileSizeExceeded }) => fileSizeExceeded && `#F04747`};
  border: ${({ fileSizeExceeded }) =>
    fileSizeExceeded && "dashed hsla(0,0%,100%,.4)"};
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
  font-weight: 700;
  color: #fbd1d1;
  font-family: "Montserrat", sans-serif;
`;

const ErrorTextSmall = styled.p`
  color: #fbd1d1;
  font-size: 16px;
  text-align: center;
`;
