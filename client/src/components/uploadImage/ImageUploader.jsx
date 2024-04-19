import { FileInputButton, FileCard } from "@files-ui/react";
import { useState } from "react";
import styles from "./ImageUploader.module.css";

export const ImageUploader = ({
  name,
  botSetting,
  setBotSetting,
  imageUrl,
  currentKey,
}) => {
  const [value, setValue] = useState(botSetting[name] || undefined);

  const updateFiles = (incommingFiles) => {
    console.log("incomming extFiles", incommingFiles);
    setValue(incommingFiles[0]);
    setBotSetting({ ...botSetting, [name]: incommingFiles[0] });
  };
  const removeFile = () => {
    setValue(undefined);
    setBotSetting({ ...botSetting, [name]: "", [currentKey]: "" });
  };

  const sampleFileProps = value
    ? value
    : {
        id: "fileId",
        size: 0.5 * 1024 * 1024,
        type: "image/jpeg",
        name: " ",
        imageUrl: imageUrl,
      };

  return (
    <div className={styles.uploadBox}>
      {value || imageUrl ? (
        <FileCard {...sampleFileProps} onDelete={removeFile} preview />
      ) : (
        <FileInputButton
          color="#6200EE"
          fakeUpload={true}
          onChange={updateFiles}
          accept="image/*"
          style={{
            fontFamily: '"Golos Text", sans-serif',
            fontWeight: "700",
            borderRadius: "25px",
            padding: "10px 20px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            height: "45px",
          }}
        >
          Выберете файл
        </FileInputButton>
      )}
    </div>
  );
};
