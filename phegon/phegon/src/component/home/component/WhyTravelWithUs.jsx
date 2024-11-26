
const WhyTravelWithUs = () => {
  return (
    <section className="container grid grid-cols-2 mt-[150px] gap-[130px]">
        <div>
            <img src="http://localhost:5173/image/beach.svg" alt="" className="w-[570px] h-[570px] rounded-[20px] object-cover"/>
        </div>
        <div className="flex flex-col justify-center ">
            <h3 className="text-[52px] font-bold leading-[52px]">Why travel with us around the world?</h3>
                <p className="text-[#4E5358] text-[18px] leading-[30px] pt-[18px]">We’ve been trusted by customers around the world since 2005 to provide service they can rely on; that makes travel dreams come true in the most value-added way possible.</p>
            <ul className="pt-[10px] text-[22px] font-bold leading-[28px]">
                <li className="before:content-['•'] before:mx-2 pt-[18px]">Philosophy & values</li>
                <li className="before:content-['•'] before:mx-2 pt-[18px]">Unique itinerarie</li>
                <li className="before:content-['•'] before:mx-2 pt-[18px]">We are for good</li>
            </ul>
        </div>
    </section>
  )
}

export default WhyTravelWithUs