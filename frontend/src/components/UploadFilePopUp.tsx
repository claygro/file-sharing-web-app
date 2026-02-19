import { useState, type ChangeEvent } from "react";
import connection from "../config/connection.config";

const UploadFilePopUp = () => {
  const [files, setFiles] = useState<string | Blob>();
  const [title, setTitle] = useState<string>("");

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFiles(selected);
  };
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  console.log(files);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (files) {
        formData.append("file", files);
      }
      connection.post("/uploadFile/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(formData);
      console.log(title);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Error in uploading file ${error}`);
      } else {
        console.log(`Error in uploading file ${error}`);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input onChange={handleChangeTitle} type="text" name="title" />
        </div>
        <div>
          <input onChange={handleChangeFile} type="file" name="file" />
        </div>
        <button>Upload</button>
      </form>
    </>
  );
};

export default UploadFilePopUp;
