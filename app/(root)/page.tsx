import { Footer } from "./_components/Footer";
import { Heading } from "./_components/Heading";


export default function Home() {
  return (
    <div className='min-h-full flex flex-col dark:bg-[#1f1f1f]'>
      <div className=' flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
        <Heading/>
      </div>
      <Footer/>
    </div>
  );
}
