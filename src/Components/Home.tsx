import { useState } from "react"
import { Analytics } from "./Analytics"
import { VirtualDom } from "./VirtualDom"

export interface EventItem {
    name: string;
    diffList: string[]
}


export const Home = ()=>{
    const [analysis, setAnalysis] = useState<EventItem[]>([])
    const [loading, setLoading] = useState<boolean>(false);
   
    const addNewEvent = (items: string[])=>{
        items = items.filter((item)=> item !== null && item !== undefined)
       if(items.length > 0){
        setAnalysis((prevState)=> [...prevState, {name: `Event ${prevState.length + 1}`,
            diffList: [...items]}]);
       }
        setLoading(false);

    }

    return <div className="w-full h-full grid grid-rows-1 grid-cols-1 bg-zinc-50 sm:grid-cols-3 p-4">
        <Analytics loading={loading} eventList={analysis}/>
        <div className="w-full h-full p-1 sm:col-span-2 rounded-lg">
            <VirtualDom handleLoading={setLoading} addNewEvent={addNewEvent}/>
        </div>
    </div>
}