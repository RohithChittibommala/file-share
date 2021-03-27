import { useParams } from "react-router";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {}

type file = {
  createdAt: string;
  fileName: string;
  id: string;
  path: string;
  size: number;
  updatedAt: string;
};

const Download = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<file>();

  console.log(file);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/files/${id}`)
      .then((res) => setFile(res.data));
  }, [id]);

  const handleFileDownload = async () => {
    const res = await axios({
      url: `${process.env.REACT_APP_API_URL}/api/files/download/${id}`,
      method: "GET",
      responseType: "blob",
    });
    console.log(res);

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${file?.fileName}`);
    document.body.appendChild(link);
    link.click();
  };

  const presentTime = Date.now();
  const linkCreatedTime = Date.parse(
    file?.createdAt || "2021-03-26T12:38:39.127Z"
  );
  const timeElapsed = (presentTime - linkCreatedTime) / (1000 * 60);
  const timeLeft =
    Math.floor((24 * 60 - timeElapsed) / 60) +
    " hours " +
    Math.floor((24 * 60 - timeElapsed) % 60) +
    " minutes";

  return (
    <Wrapper>
      {file && (
        <DownloadContainer>
          <ImageContainer>
            <img src={require("../download-sd.svg").default} alt="" />
          </ImageContainer>
          <FileTitle>{file?.fileName}</FileTitle>
          <LinkExpiryContainer>
            <Text color="#ca389a">
              Link Expires in <span>{timeLeft}</span>
            </Text>
          </LinkExpiryContainer>
          <Text>{file?.size ? Math.round(file.size / 1000) : 0}kb</Text>

          <LinkExpiryContainer>
            <DownloadBtn onClick={handleFileDownload}>Download</DownloadBtn>
          </LinkExpiryContainer>
        </DownloadContainer>
      )}
      {!file && (
        <Text color="black">We don't have this file or link is expired</Text>
      )}
    </Wrapper>
  );
};

export default Download;

const DownloadContainer = styled.div`
  background: #fff;
  box-shadow: 0px 9px 10px 9px #00000021;
  min-height: 250px;
  width: 50%;
  min-width: 350px;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  justify-content: center;
`;

const ImageContainer = styled.div`
  width: 125px;
  margin: 10px auto;

  img {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 2vw 3vw;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
  }
`;

const FileTitle = styled.h1`
  text-align: center;
  font-weight: 800;
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  /* color: #8a4baf; */

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Text = styled.p<{ color?: string }>`
  color: ${({ color }) => color};
  font-size: 20px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  text-align: center;

  span {
    color: #36ee3f;
  }
  @media (max-width: 768px) {
    span {
      display: block;
      margin: 5px 0;
    }
  }
`;

const LinkExpiryContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const DownloadBtn = styled.div`
  width: 120px;
  padding: 4px 16px;
  background-color: #0d96f2;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  transition: 350ms ease background;
  &:hover {
    background-color: #004ca3;
  }
`;
