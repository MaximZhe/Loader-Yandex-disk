import UploadToYandexDisk from "./components/UploadToYandexDisk/UploadToYandexDisk";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [idToken, setIdToken] = useState("");
  function onload() {
    window.YaSendSuggestToken(
      "https://maximzhe.github.io/Loader-Yandex-disk/",
      {
        kek: true,
      }
    );
  }
  useEffect(() => {
    function load() {
      window.YaAuthSuggest.init(
        {
          client_id: `${import.meta.env.VITE_API_KEY}`,
          response_type: "token",
          redirect_uri: "https://maximzhe.github.io/Loader-Yandex-disk/",
        },
        "https://maximzhe.github.io/Loader-Yandex-disk/",
        {
          view: "button",
          parentId: "container",
          buttonView: "main",
          buttonTheme: "light",
          buttonSize: "m",
          buttonBorderRadius: 0,
        }
      )
        .then(({ handler }) => handler())
        .then((data) => setIdToken(data.access_token), onload())
        .catch((error) => console.log("Обработка ошибки", error));
    }
    load();
  }, [idToken]);
  return (
    <>
      <div>
        <UploadToYandexDisk idToken={idToken} />
      </div>
    </>
  );
}

export default App;
