import group1 from '../../../../public/image/Group18742.svg'
import group2 from '../../../../public/image/Group18741.svg'
import group3 from '../../../../public/image/Group18678.svg'

const Help = () => {
  return (
    <div className="flex pb-[100px] grid grid-cols-3 gap-[30px] mt-[70px]" >
                        <div className="flex flex-col justify-center items-center bg-white px-[20px] py-[38px] hover:shadow-md shadow-slate-600">
                            <img className="w-[60px] h-[60px] object-contain" src={group1} alt="" />
                            <span className="text-[24px] font-bold pt-[30px]">Destinations</span>
                            <p className="text-center pt-[16px]">Explore destinations around the world from 
                                110 countries. We are providing the best 
                                 travel guide services.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-white px-[20px] py-[38px] hover:shadow-md shadow-slate-600">
                            <img className="w-[60px] h-[60px] object-contain" src={group2} alt="" />
                            <span className="text-[24px] font-bold pt-[30px]">Itineraries </span>
                            <p className="text-center pt-[16px]">Discover detailed itineraries from 3 days to 1 week fro multiple destinations . We are providing the best travel guide services.</p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-white px-[20px] py-[38px] hover:shadow-md shadow-slate-600">
                            <img className="w-[60px] h-[60px] object-contain" src={group3} alt="" />
                            <span className="text-[24px] font-bold pt-[30px]">Travel Tips</span>
                            <p className="text-center pt-[16px]">Learn from the best. Travel tips gathered from our 10 years of full-time travel. We are providing the best travel guide services.</p>
                        </div>
                    </div>
  )
}

export default Help