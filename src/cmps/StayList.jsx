import {StayPreview} from "./StayPreview"

export function StayList({ stays }) {
    return (
        <div className='stay-list'>
            {stays[0].map(stay => <div className="stay-card" key={stay._id}>
               <StayPreview stay={stay}/>
            </div>)}
        </div>
    )
}