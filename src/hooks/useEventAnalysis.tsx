import axios from "axios";
import { useState } from "react"


export const useEventAnalysis = ()=>{
    const [data, setData] = useState<string[]| null>(null);
    const [error, setError] = useState<boolean>(false);
    const handleEvent = (oldDOM: string, currentDOM: string)=>{
        console.log('CAllo') 
        axios({
                url: 'http://localhost:3000/analyze',
                method: 'POST',
                data: {oldDOM, currentDOM}
            }).then(res=>{
                setData(res.data)
                // counterRef.current = 0;
                // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // // @ts-ignore
                // previousRef.current = currentRef.current;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            }).catch((_)=>{
                // console.log(err)
                setError(true);
            });
    }
    return { data, error, handleEvent }
}