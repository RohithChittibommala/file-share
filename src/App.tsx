import { useRef, useState } from "react";
import Container, { Text } from "./components/Container";
import ProgressBar from "./components/ProgressBar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import messages from "./utlis";

interface Props {}

const uploadUrl = `https://innshare.herokuapp.com/api/files`;

const App = (props: Props) => {
  const [width, setWidth] = useState(0);
  const [isFileSelected, setFileSelected] = useState<boolean>(false);
  const canceller = useRef((message?: string) => {});

  const emitToast = (type: "success" | "info") => {
    const toastEmitter = toast[type];
    toastEmitter(messages[type], {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const uploadOptions = {
    onUploadProgress: (progressEvent: ProgressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = (loaded / total) * 100;
      setWidth(Math.round(percentage));
    },
  };

  const handleFileUpload = async (file: File) => {
    const _cancelToken = axios.CancelToken.source();
    setFileSelected(true);
    canceller.current = _cancelToken.cancel;
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
        emitToast("success");
        console.log(res);
      })
      .catch((er) => console.log(er));
  };

  const cancelFileUpload = () => {
    canceller.current("user asked to cancel");
    emitToast("info");
    setWidth(0);
    setFileSelected(false);
  };

  return (
    <div className="app">
      <ToastContainer />
      <Container handleFileUpload={handleFileUpload}></Container>
      {isFileSelected && (
        <div>
          <ProgressBar width={width} cancelFileUpload={cancelFileUpload} />
          <Text center>{width}% completed</Text>
        </div>
      )}
    </div>
  );
};

export default App;
