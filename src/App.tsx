import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import Container, { Text } from "./components/Container";
import ProgressBar from "./components/ProgressBar";
import { toast, ToastContainer } from "react-toastify";
import messages from "./utlis";
import SharableLinkContainer from "./components/SharableLinkContianer";
import styled from "styled-components";
import QRCode, { QRCodeProps } from "react-qr-code";

interface Props {}

ReactModal.setAppElement("#root");

type uploadedUrl = {
  link: string;
  fileName: string;
  time: number;
};

const uploadUrl = `https://innshare.herokuapp.com/api/files`;

const App = (props: Props) => {
  const [width, setWidth] = useState(0);
  const [isFileSelected, setFileSelected] = useState<boolean>(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<uploadedUrl[]>([]);
  const [qrCodeLink, setQrCodeLink] = useState("a");
  const canceller = useRef((message?: string) => {});

  useEffect(() => {
    const linksArray = localStorage.getItem("links");
    if (linksArray) {
      setUploadedFileUrl(JSON.parse(linksArray));
    }
  }, []);

  const emitToast = (type: "success" | "info", message?: string) => {
    const toastEmitter = toast[type];
    toastEmitter(message || messages[type], {
      position: "top-center",
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

  const updateLocalStorage = (item: uploadedUrl) => {
    const linksArrayJSON = localStorage.getItem("links");
    const linksArray = JSON.parse(linksArrayJSON || "[]");
    localStorage.setItem("links", JSON.stringify([...linksArray, item]));
  };

  const handleFileUpload = async (file: File) => {
    const _cancelToken = axios.CancelToken.source();
    setFileSelected(true);
    canceller.current = _cancelToken.cancel;
    const formData = new FormData();

    formData.append("myfile", file);
    console.log(formData);

    try {
      const { data } = await axios.post(uploadUrl, formData, {
        ...uploadOptions,
        cancelToken: _cancelToken.token,
      });

      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}?key=${process.env.REACT_APP_API_KEY}&short=${data.file}`
      );

      const fileUrl = {
        fileName: file.name,
        time: Date.now(),
        link: res.data.url["shortLink"],
      };

      setUploadedFileUrl((prev) => [...prev, fileUrl]);
      updateLocalStorage(fileUrl);
      setWidth(0);
      setFileSelected(false);
      emitToast("success");
      console.log(data);
    } catch (er) {
      console.log(er);
    }
  };

  const cancelFileUpload = () => {
    canceller.current("user asked to cancel");
    emitToast("info");
    setWidth(0);
    setFileSelected(false);
  };

  const handleQrCodeSelect = (qrCodeLink: string) => {
    setQrCodeLink(qrCodeLink);
  };

  return (
    <div>
      <div className="app">
        <Modal
          isOpen={qrCodeLink.length > 0}
          onRequestClose={() => setQrCodeLink("")}
          style={{ overlay: { backgroundColor: "#ebebeb" } }}
        >
          <QRCode value={qrCodeLink} className="qr-code" size={350} />
        </Modal>
        <ToastContainer />
        {!qrCodeLink && (
          <Container handleFileUpload={handleFileUpload}></Container>
        )}
        {isFileSelected && (
          <div className="progress-bar-div">
            <ProgressBar width={width} cancelFileUpload={cancelFileUpload} />
            <Text center>{width}% completed</Text>
          </div>
        )}
      </div>
      <div>
        {uploadedFileUrl.map((url) => (
          <SharableLinkContainer
            {...url}
            key={url.time}
            emitToast={emitToast}
            setQrcode={handleQrCodeSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

const Modal = styled(ReactModal)`
  position: absolute;
  top: 35%;
  left: 35%;
  z-index: 999;
  width: 30%;
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 12px;
  min-width: 350px;
  outline: none;

  @media (max-width: 500px) {
    left: 7%;
  }
`;
