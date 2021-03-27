import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Container, { Text } from "./Container";
import ProgressBar from "./ProgressBar";
import { toast, ToastContainer } from "react-toastify";
import SharableLinkContainer from "./SharableLinkContianer";
import { checkIsLinkValid, messages } from "../utlis";
import styled from "styled-components";
import ReactModal from "react-modal";
import QRCode from "react-qr-code";
interface Props {}
type uploadedUrl = {
  link: string;
  fileName: string;
  time: number;
};

const uploadUrl = `${process.env.REACT_APP_API_URL}/api/files`;
const Home = (props: Props) => {
  const [width, setWidth] = useState(0);
  const [isFileSelected, setFileSelected] = useState<boolean>(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<uploadedUrl[]>([]);
  const [qrCodeLink, setQrCodeLink] = useState("");
  const canceller = useRef((message?: string) => {});

  useEffect(() => {
    const linksArray: Array<uploadedUrl> = JSON.parse(
      localStorage.getItem("links") || "[]"
    );

    if (linksArray.length) {
      setUploadedFileUrl(
        linksArray.filter((link) => link && checkIsLinkValid(link.time))
      );
      updateLocalStorage();
    }
    console.log(uploadedFileUrl);
  }, [uploadedFileUrl]);

  const emitToast = (type: "success" | "info" | "error", message?: string) => {
    const toastEmitter = toast[type];
    toastEmitter(message, {
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
  const updateLocalStorage = (item?: uploadedUrl) => {
    const linksArrayJSON = localStorage.getItem("links");
    let linksArray: uploadedUrl[] = JSON.parse(linksArrayJSON || "[]");
    linksArray = linksArray.filter(
      (link) => link && checkIsLinkValid(link.time)
    );
    localStorage.setItem("links", JSON.stringify([item, ...linksArray]));
  };

  const handleFileUpload = async (file: File) => {
    const _cancelToken = axios.CancelToken.source();
    setFileSelected(true);
    canceller.current = _cancelToken.cancel;
    const formData = new FormData();

    formData.append("my-file", file);
    console.log(formData);

    try {
      const { data } = await axios.post(uploadUrl, formData, {
        ...uploadOptions,
        cancelToken: _cancelToken.token,
      });

      console.log(data.file);

      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}?key=${process.env.REACT_APP_API_KEY}&short=${data.file}`
      );

      console.log(res);

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
      emitToast("error", er.message);
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
          style={{ overlay: { backgroundColor: "#4e4a4a" } }}
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

export default Home;

const Modal = styled(ReactModal)`
  position: absolute;
  top: 35%;
  left: 35%;
  z-index: 999;
  width: 30%;
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 20px;
  min-width: 350px;
  border-radius: 25px;
  outline: none;

  @media (max-width: 500px) {
    left: 7%;
  }
`;
