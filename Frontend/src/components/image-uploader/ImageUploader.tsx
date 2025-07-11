import { useContext, useState } from "react";
import { upload_icon } from "../../assets/images/images";
import { FaTrash } from "react-icons/fa";
import styles from "./image-uploader.module.css";
import { GlobalContext } from "../../context/GlobalContext";

const MAX_TOTAL_SIZE = 150 * 1024 * 1024;

const ImageUploader = () => {
  const globalContext = useContext(GlobalContext);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTotalSize = (files: File[]) => {
    return files.reduce((acc, file) => acc + file.size, 0);
  };

  const bytesToMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

  const checkTotalSize = (newFiles: File[]) => {
    const totalSize = [...globalContext.carData.carImages, ...newFiles].reduce(
      (acc, file) => acc + file.size,
      0
    );
    if (totalSize > MAX_TOTAL_SIZE) {
      setError(
        `Total upload size exceeds ${MAX_TOTAL_SIZE / (1024 * 1024)} MB.`
      );
      return false;
    }
    setError(null);
    return true;
  };
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);

    if (checkTotalSize(fileArray)) {
      globalContext.setCarData((prev) => ({
        ...prev,
        carImages: [...prev.carImages, ...fileArray],
      }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (!files) return;
    const fileArray = Array.from(files);

    if (checkTotalSize(fileArray)) {
      globalContext.setCarData((prev) => ({
        ...prev,
        carImages: [...prev.carImages, ...fileArray],
      }));
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleRemoveImage = (index: number) => {
    globalContext.setCarData((prev) => {
      const newCarImages = prev.carImages.filter((_, i) => i !== index);
      return { ...prev, carImages: newCarImages }; 
    });
  };
  const currentSize = getTotalSize(globalContext.carData.carImages);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.images_upload_container}>
          <label htmlFor="file-upload" className={styles.upload_images}>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className={styles.hidden_input}
            />
            <div
              className={`${styles.upload_wrapper} ${
                dragging ? styles.dragging : ""
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <img src={upload_icon} alt="upload icon" />
              <p className={styles.upload_text}>
                Drag and drop images here <br /> or <br />
                <span>Browse</span>
              </p>
            </div>
          </label>

          <div className={styles.current_selections}>
            {globalContext.carData.carImages.map((file, index) => (
              <div className={styles.selection_item} key={index}>
                <img
                  className={styles.icon}

                  src={
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  }
                  alt={file.name}
                />
                <p className={styles.file_name}>{file.name}</p>
                <FaTrash onClick={()=>handleRemoveImage(index)} className={styles.delete_icon} />
              </div>
            ))}
          </div>
        </div>
        <p className={styles.total_size}>
          Total size: {bytesToMB(currentSize)} MB / {bytesToMB(MAX_TOTAL_SIZE)}{" "}
          MB
        </p>
        {error && <p className={styles.error_message}>{error}</p>}
      </div>
    </>
  );
};

export default ImageUploader;
