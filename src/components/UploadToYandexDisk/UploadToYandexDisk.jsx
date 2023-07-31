import { useState } from "react";
import axios from "axios";

const FileUploader = ({ idToken }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successfully, setSuccessfully] = useState(false);
  const [isloading, setIsloading] = useState(false);
  
  const handleFileUpload = async () => {
    const url = "https://cloud-api.yandex.net/v1/disk/resources/upload";

    selectedFiles.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setIsloading(true);
        const response = await axios.get(url, {
          headers: {
            Authorization: idToken,
          },
          params: {
            path: `/${file.name}`,
            overwrite: true,
          },
        });

        const uploadUrl = response.data.href;
        await axios.put(uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSuccessfully(true);
        console.log(`File ${file.name} uploaded successfully.`);
      } catch (error) {
        setIsloading(false);
        console.error(`Error uploading file ${file.name}:`, error);
      }
      finally{
        setSuccessfully(false);
      }
      
    });
    
    setSelectedFiles([]);
   
  };

  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 100) {
      alert("You can't select more than 100 files.");
      return;
    }
    setSelectedFiles(files);
  };

  return (
    <div>
      {idToken !== "" ? (
        <div>
          {successfully === false ? (
            <div>
              <div>
                <input type="file" multiple onChange={handleFileSelection} />
                <button onClick={handleFileUpload}>Upload</button>
              </div>
              {isloading === true ? <p>loading...</p> : null}
            </div>
          ) : (
            <p>Успешно отправлено!</p>
          )}
        </div>
      ) : (
        <div>
          <h2>Login using Yandex</h2>
          <div id="container"></div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
