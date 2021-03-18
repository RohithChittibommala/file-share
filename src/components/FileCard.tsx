import LinesEllipsis from "react-lines-ellipsis";
import styled from "styled-components";
interface Props {
  handleFileUpload: (files: File) => void;
  file: File;
  handleFileRemoval: () => void;
  setFile: (value: React.SetStateAction<File | null>) => void;
}

const FileCard = (props: Props) => {
  const { handleFileUpload, file, handleFileRemoval, setFile } = props;

  return (
    <FileCardContainer>
      <div>
        <LinesEllipsis text={file.name} maxLine="1" className="file-name" />
        <p className="remove" onClick={handleFileRemoval}>
          remove
        </p>
      </div>
      <Button
        onClick={() => {
          setFile(null);
          handleFileUpload(file);
        }}
      >
        Upload
      </Button>
    </FileCardContainer>
  );
};

export default FileCard;

const FileCardContainer = styled.div`
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
