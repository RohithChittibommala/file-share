import { useRef, useState } from "react";
import Container from "./components/Container";
import ProgressBar from "./components/ProgressBar";
import axios from "axios";

interface Props {}

const uploadUrl = `https://innshare.herokuapp.com/api/files`;

const App = (props: Props) => {
  const [width, setWidth] = useState(0);
  const [isFileSelected, setFileSelected] = useState<boolean>(false);
  const canceller = useRef((message?: string) => {});

  console.log(width);

  const uploadOptions = {
    onUploadProgress: (progressEvent: ProgressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = (loaded / total) * 100;
      setWidth(Math.round(percentage));
    },
  };

  const handleFileUpload = async (files: FileList) => {
    const _cancelToken = axios.CancelToken.source();
    setFileSelected(true);
    canceller.current = _cancelToken.cancel;
    const file = files[0];
    const formData = new FormData();

    formData.append("myfile", file);
    console.log(formData);
    axios
      .post(uploadUrl, formData, {
        ...uploadOptions,
        cancelToken: _cancelToken.token,
      })
      .then((res) => {
        setWidth(0);
        setFileSelected(false);
      })
      .catch((er) => console.log(er));
  };

  const cancelFileUpload = () => {
    canceller.current("user asked to cancel");
    setWidth(0);
    setFileSelected(false);
  };

  return (
    <div className="app">
      <Container handleFileUpload={handleFileUpload} />
      {isFileSelected && (
        <ProgressBar width={width} cancelFileUpload={cancelFileUpload} />
      )}
    </div>
  );
};

export default App;
