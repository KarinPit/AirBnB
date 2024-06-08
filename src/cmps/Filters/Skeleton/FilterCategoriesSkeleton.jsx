import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export function FilterCategoriesSkeleton() {
    return (
        <div className="filter-categories-wrapper skeleton-filter-categories-wrapper full">
            {Array(13).fill(0).map((element, index) => (
                <label key={index} className="filter-categories-label skeleton-filter-categories-label">
                    <input
                        id={`input-${index}`}
                        className="filter-categories-scroller"
                    />
                    <span><Skeleton circle width={30} height={30} /></span>
                    <span><Skeleton width={50} height={15} /></span>
                </label>
            ))
            }
        </div >
    );
}