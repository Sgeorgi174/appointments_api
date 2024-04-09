import { useState } from "react";
import styles from "./ImageUploader.module.css";

function ImageUploader({ name, botSetting, setBotSetting, handleSubmit }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
    setBotSetting({ ...botSetting, [name]: imageFile });
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className={styles.imageUploader}>
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
          id="fileInput"
        />
        <label htmlFor="fileInput" className={styles.customButton}>
          Выберете файл
        </label>
        {selectedImage && (
          <div>
            <img
              src={selectedImage}
              alt="Selected"
              className={styles.previewImage}
            />
          </div>
        )}
      </div>
    </form>
  );
}

export default ImageUploader;
