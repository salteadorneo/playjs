export default function Console ({ lines, result }) {
  return (
    <div className='flex pt-6'>
      <div className='w-[68px] text-center'>
        {Array.from(Array(lines).keys()).map((index) => {
          return (
            <span
              key={index}
              className='inline-block w-[68px] text-[#858585] text-[14px] leading-[19px]'
            >
              {index + 1}
            </span>
          )
        })}
      </div>

      <div className='w-full h-full text-[#dcdcdc] text-left font-[monospace] text-[14px] leading-[19px] whitespace-pre'>
        {result}
      </div>
    </div>
  )
}
