import { useState } from "react";
import styles from "./car-info-cover.module.css";

type ICarInfoCoverProps = {
  coverImages: File[] | string[];
};

const CarInfoCover = ({ coverImages }: ICarInfoCoverProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const moveSlide = (direction: number) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
      newIndex = coverImages.length - 1;
    } else if (newIndex >= coverImages.length) {
      newIndex = 0;
    }
    setCurrentIndex(newIndex);
    if (newIndex < thumbnailStartIndex) {
      setThumbnailStartIndex(newIndex);
    } else if (newIndex >= thumbnailStartIndex + 4) {
      setThumbnailStartIndex(newIndex - 3);
    }
  };

  const remainingImages = coverImages.length - (thumbnailStartIndex + 4);
  return (
    <div className={styles.cover_info_container}>
      <div className={styles.header_container}>
        <div className={styles.car_image_cover_container}>
          <div
            className={styles.car_image_container}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {coverImages.map((image, index) => (
              <img
                key={index}
                className={styles.car_image}
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt={`Cover ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div
          onClick={() => moveSlide(1)}
          className={`${styles.image_container} ${styles.next_image_container}`}
        >
          <svg
            className={`${styles.icon} ${styles.next_icon}`}
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
          >
            <path
              d="M7.04664 4.95107L3.63784 1.61804C3.60453 1.58568 3.57821 1.54713 3.56043 1.50466C3.54266 1.46219 3.53379 1.41666 3.53436 1.37079C3.53493 1.32491 3.54493 1.27961 3.56375 1.23758C3.58257 1.19554 3.60984 1.15762 3.64395 1.12606C3.7137 1.0614 3.80653 1.02585 3.9027 1.02697C3.99888 1.02808 4.09082 1.06577 4.15898 1.13202L7.8197 4.71154C7.85282 4.74366 7.87905 4.7819 7.89685 4.82403C7.91466 4.86616 7.92368 4.91134 7.9234 4.95691C7.92311 5.00249 7.91352 5.04755 7.8952 5.08947C7.87687 5.13139 7.85017 5.16931 7.81665 5.20103L3.96355 8.87597C3.89457 8.94101 3.80243 8.97736 3.70654 8.97736C3.61066 8.97736 3.51851 8.94101 3.44954 8.87597C3.41583 8.84401 3.38904 8.80577 3.37074 8.76351C3.35244 8.72126 3.34302 8.67585 3.34302 8.62998C3.34302 8.5841 3.35244 8.53869 3.37074 8.49644C3.38904 8.45419 3.41583 8.41595 3.44954 8.38399L7.04664 4.95107Z"
              fill="#4C4C4C"
            />
          </svg>
        </div>
        <div
          className={`${styles.image_container} ${styles.prev_image_container}`}
          onClick={() => moveSlide(-1)}
        >
          <svg
            className={`${styles.icon} ${styles.prev_icon}`}
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
          >
            <path
              d="M5.06241 6.16924L8.8729 9.65366C8.91012 9.68748 8.94018 9.72842 8.9613 9.77406C8.98241 9.81971 8.99415 9.86912 8.99582 9.91939C8.99749 9.96965 8.98906 10.0197 8.97102 10.0667C8.95298 10.1136 8.92571 10.1565 8.89081 10.1927C8.81943 10.2669 8.72194 10.3103 8.61905 10.3138C8.51616 10.3172 8.41598 10.2804 8.3398 10.2111L4.2477 6.46903C4.2107 6.43547 4.18075 6.39486 4.15962 6.34959C4.13849 6.30432 4.1266 6.25529 4.12464 6.20537C4.12268 6.15545 4.13069 6.10564 4.14821 6.05885C4.16572 6.01206 4.19239 5.96923 4.22665 5.93287L8.16403 1.72176C8.23456 1.64719 8.33128 1.60291 8.43381 1.59826C8.53633 1.59361 8.63667 1.62895 8.71365 1.69682C8.75128 1.73018 8.78183 1.77076 8.80349 1.81614C8.82515 1.86152 8.83749 1.91079 8.83977 1.96102C8.84205 2.01126 8.83422 2.06144 8.81676 2.10859C8.79929 2.15575 8.77254 2.19892 8.73809 2.23556L5.06241 6.16924Z"
              fill="#4C4C4C"
            />
          </svg>
        </div>
      </div>
      <div className={styles.three_dots}>
        {coverImages.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.dot_current : ""
            }`}
          ></span>
        ))}
      </div>
      <div className={styles.car_images_container}>
        {coverImages
          .slice(thumbnailStartIndex, thumbnailStartIndex + 4)
          .map((image, index) => (
            <div
              key={thumbnailStartIndex + index}
              className={styles.next_image_container}
            >
              <img
                onClick={() => setCurrentIndex(thumbnailStartIndex + index)}
                className={styles.next_image}
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt={`Thumbnail ${thumbnailStartIndex + index + 1}`}
              />
              {index === 3 && remainingImages > 0 && (
                <div className={styles.overlay}>+{remainingImages} more</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
export default CarInfoCover;
