import { FC, memo } from "react";
import { EventItem } from "./Home";

interface  IProps {
    eventList: EventItem[],
    loading: boolean
}


export const Analytics: FC<IProps> = memo(({ eventList, loading })=>{
    
    return <div className="w-full h-full flex flex-col gap-4 overflow-auto">
       <h1 className="p-2 z-[99] rounded-md bg-white/20 backdrop-blur-sm text-3xl font-bold tracking-tight text-gray-600 sticky top-0 w-full">Diffrences</h1>
       <div className="flex flex-col">
            <ul className="mt-1 flex space-x-1 font-normal leading-4 text-gray-500 flex flex-col gap-2">
                {eventList.length > 0 && eventList.map((event: EventItem, index)=>{
                    return <li className="shadow-sm backdrop-blur-sm bg-white/10 inset-6 rounded-md" key={index}>
                            <h3 className="text-xl text-gray-800 font-medium p-2">
                                {event.name}
                            </h3>
                            <ol className="m-4">
                            {event.diffList.length > 0 && event.diffList.map((item, index)=>{
                                return <li className="text-md mt-2" key={`${event.name}-diff-${index}`}>{item}</li>
                            }) }
                            </ol>
                    </li>
                })}
            </ul>
           { loading ? <div className="flex justify-center mt-2">
                <svg className="animate-spin -ml-1 mr-3 h-16 w-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#7e22ce" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="#3b0764" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div> : null}
       </div>
    </div>
})