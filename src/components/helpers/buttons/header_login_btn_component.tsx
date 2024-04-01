
import { useRouter } from 'next/router';

export default function ButtonLoginHeader() {
    const router = useRouter();
    return (
       <div onClick={(e)=>{
        router.push("/auth/signin");
       }} className='cursor-pointer bg-white text-sm text-blue font-bold py-2 px-8 border-1 rounded-xl border-separate border-blue'>Login</div>
    )
}
