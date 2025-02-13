import { config } from "@/utils/config";
import Image from "next/image";
import LoadingPoster from "./LoadingPoster";
import Skelton from "../Atoms/Skelton";
import _ from 'lodash';
import Video from "../Atoms/Video";
import Button from "../Atoms/Button";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";

interface ModalMovieProps {
    data: any
    isLoading: boolean
};
const ModalMovie = ({data, isLoading}: ModalMovieProps) => {
    const [ isTrailer, setIsTrailer ] = useState(false)    
    console.log(data)    

    if(isLoading){
        return (
            <div className="flex flex-col gap-2 justify-center">
                <Skelton height={'350px'} width={'100%'}></Skelton>
                <Skelton height={'30px'} width={'50%'}></Skelton>
            </div>
        )
    }
  return (    
    <div className="relative">   
        <div className="relative">
            {
                isTrailer ? 
                <div className="z-20">
                    <Video id={data?.trailer?.key}/>
                </div>   :
                <Image                     
                    priority
                    style={{
                    width: '100%',
                    height: '100%',      
                    maxHeight: '400px',
                    objectFit: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundSize: '200px',
                    overflow: 'hidden'
                    }} 
                    src={`${config.url.img + data?.detail?.backdrop_path}`} 
                    width={500} 
                    height={500}                 
                    alt={data?.detail?.title}
                />
            }
            {
                !isTrailer &&
                <Button onClick={()=>setIsTrailer(true)} className="absolute z-20 top-[50%] p-5! md:top-44 left-[40%] md:left-[46.5%]"><FaPlay/></Button>               
            }            
        </div>     
        {
            !isTrailer &&
            <div className="bg-gradient-to-t from-zinc-700 from-10% to-transparent via-30% absolute bottom-0 w-full h-full">
            </div>            
        }
        <h1 className="text-2xl md:text-3xl text-white font-semibold absolute bottom-3 left-3">
            {data?.detail?.title} ({data?.detail?.release_date?.split('-')[0]})
        </h1>                
        <div className="text-white z-50">
            <span>
                {data?.detail?.runtime/60}
            </span>
        </div>
    </div>        
  )
};
export default ModalMovie;
