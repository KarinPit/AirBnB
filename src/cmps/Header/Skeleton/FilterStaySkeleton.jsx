import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export function FilterStaySkeleton() {

    return (
        <div className="skeleton-search-container">
            <form className="skeleton-search-form">
                <div className="skeleton-input-group">
                    <div className="skeleton-input-container">
                        <div>
                            <Skeleton width={30} height={15} />
                            <Skeleton width={100} height={15} />
                        </div>
                    </div>

                    <div className="skeleton-input-container">
                        <div>
                            <Skeleton width={50} height={15} />
                            <Skeleton width={70} height={15} />
                        </div>
                    </div>

                    <div className="skeleton-input-container">
                        <div>
                            <Skeleton width={50} height={15} />
                            <Skeleton width={70} height={15} />
                        </div>
                    </div>

                    <div className="skeleton-input-container">
                        <div>
                            <Skeleton width={30} height={15} />
                            <Skeleton width={50} height={15} />
                        </div>
                        <button type="submit" className="skeleton-search-button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                style={{
                                    display: "block",
                                    fill: "none",
                                    height: "16px",
                                    width: "16px",
                                    stroke: "currentColor",
                                    strokeWidth: 4,
                                }}
                            >
                                <path
                                    fill="none"
                                    d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                                ></path>
                                <span className="search-label">Search</span>
                            </svg>
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}