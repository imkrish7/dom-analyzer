/* eslint-disable @typescript-eslint/no-explicit-any */
import {Dispatch,  FC,  SetStateAction, memo, useEffect, useRef} from "react";
import {DOMExample1} from "./DOMS/DOMExample1"
import axios from "axios";
import { toast } from "react-toastify";

interface IProps {
    addNewEvent: (items: string[])=> void,
    handleLoading: Dispatch<SetStateAction<boolean>>
}


export const VirtualDom: FC<IProps> = memo(({ addNewEvent, handleLoading })=>{
    const domRef = useRef<HTMLDivElement>(null);
    const currentRef= useRef<HTMLDivElement>(null);
    const previousRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef(false);

    const mutationCallback = ()=>{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentRef.current = document.getElementById('testDOM')?.outerHTML;
        
        if(currentRef.current && previousRef.current){
            
            const currentDOM = JSON.stringify(currentRef.current);
            const oldDOM = JSON.stringify(previousRef.current);
           
            if(!counterRef.current){
                counterRef.current = true;
                handleLoading(true);
                axios({
                    url: import.meta.env.VITE_BACKEND_URI,
                    method: 'POST',
                    data: {oldDOM, currentDOM}
                }).then(res=>{
                    counterRef.current = false;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    previousRef.current = currentRef.current;
                    
                    addNewEvent(res.data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                }).catch((_)=>{
                    counterRef.current = false;
                    toast.error('Something went wrong');
                    handleLoading(false);
                });
            }
            
        }
    }

    useEffect(()=>{
        const observer = new MutationObserver(mutationCallback);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        previousRef.current = document.getElementById('testDOM')?.outerHTML;
        if(domRef.current){
            observer.observe(domRef.current, {childList: true, subtree: true, attributes: true, attributeOldValue: true, characterData: true, characterDataOldValue: true})
        }
        
        return ()=>{
            observer.disconnect();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return <div className="w-full bg-white h-full rounded-lg shadow-xl shadow-inner">
            <div className="w-full h-full scale-1">
                <DOMExample1 ref={domRef} />
            </div>
    </div>
})
