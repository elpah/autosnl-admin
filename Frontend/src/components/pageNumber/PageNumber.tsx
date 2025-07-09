import styles from "./page-number.module.css";

type PageNumberProps = {
  currentPage?: number;
  totalPages?: number;
  pageNumbers?: number[];
  handlePrevClick?: () => void;
  handleNextClick?: () => void;
  handlePageNumberClick?: (curNumber: number) => void;
};
const PageNumber = ({
  currentPage,
  totalPages,
  pageNumbers,
  handlePrevClick,
  handleNextClick,
  handlePageNumberClick,
}: PageNumberProps
) => {
  return (
    <div className={styles.next_cars_container}>
      {currentPage &&  currentPage > 1 && (
        <div className={styles.next_icon_container} onClick={handlePrevClick}>
          <svg
            className={styles.next_icon}
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M3.28385 8.34571C3.32698 8.38893 3.37821 8.42322 3.43462 8.44662C3.49103 8.47001 3.5515 8.48206 3.61257 8.48206C3.67364 8.48206 3.73411 8.47001 3.79051 8.44662C3.84692 8.42322 3.89815 8.38893 3.94128 8.34571L7.02785 5.26029C7.06229 5.22594 7.0896 5.18514 7.10824 5.14023C7.12688 5.09531 7.13647 5.04716 7.13647 4.99853C7.13647 4.94991 7.12688 4.90176 7.10824 4.85684C7.0896 4.81193 7.06229 4.77113 7.02785 4.73678L3.94128 1.65136C3.75928 1.46943 3.46585 1.46943 3.28385 1.65136C3.10185 1.8333 3.10185 2.12661 3.28385 2.30855L5.973 5.00039L3.28014 7.69224C3.10185 7.87046 3.10185 8.16749 3.28385 8.34571Z"
              fill="#4C4C4C"
              transform="rotate(180 5 5)"
            />
          </svg>
        </div>
      )}

      {totalPages && totalPages > 1 &&
        pageNumbers?.map((pageNumber, index) => {
          const isHidden =
          currentPage &&  pageNumber < currentPage - 2 && pageNumber !== 1
              ? true
              : currentPage && pageNumber > currentPage + 2 && pageNumber !== totalPages
              ? true
              : false;

          const showBeforeLast =
            pageNumber === totalPages - 1 && currentPage && totalPages - currentPage > 3;

          const showAfterFirst = pageNumber === 2 &&  currentPage && currentPage > 4;

          if (isHidden && !showBeforeLast && !showAfterFirst) {
            return null;
          }
          return showBeforeLast || showAfterFirst ? (
            <p key={`ellipsis-${index}`} className={styles.three_dots}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </p>
          ) : (
            <div
            //   onClick={() => handlePageNumberClick(pageNumber)}
              key={pageNumber}
              className={`${styles.car_page_number} ${
                pageNumber === currentPage ? styles.current_page_number : ""
              }`}
            >
              {pageNumber}
            </div>
          );
        })}

      {currentPage && totalPages && currentPage < totalPages && (
        <div className={styles.next_icon_container} onClick={handleNextClick}>
          <svg
            className={styles.next_icon}
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M3.28385 8.34571C3.32698 8.38893 3.37821 8.42322 3.43462 8.44662C3.49103 8.47001 3.5515 8.48206 3.61257 8.48206C3.67364 8.48206 3.73411 8.47001 3.79051 8.44662C3.84692 8.42322 3.89815 8.38893 3.94128 8.34571L7.02785 5.26029C7.06229 5.22594 7.0896 5.18514 7.10824 5.14023C7.12688 5.09531 7.13647 5.04716 7.13647 4.99853C7.13647 4.94991 7.12688 4.90176 7.10824 4.85684C7.0896 4.81193 7.06229 4.77113 7.02785 4.73678L3.94128 1.65136C3.75928 1.46943 3.46585 1.46943 3.28385 1.65136C3.10185 1.8333 3.10185 2.12661 3.28385 2.30855L5.973 5.00039L3.28014 7.69224C3.10185 7.87046 3.10185 8.16749 3.28385 8.34571Z"
              fill="#4C4C4C"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
export default PageNumber;