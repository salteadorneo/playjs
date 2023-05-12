export default function Console ({ lines, result }) {
  return (
    <div className='flex pt-[24px]'>
      <div
        style={{
          width: '68px',
          textAlign: 'center'
        }}
      >
        {Array.from(Array(lines).keys()).map((index) => {
          return (
            <span
              key={index}
              style={{
                display: 'block',
                width: '68px',
                color: '#858585',
                fontSize: '14px',
                lineHeight: '19px'
              }}
            >
              {index + 1}
            </span>
          )
        })}
      </div>

      <div className='console'>
        {result}
      </div>

    </div>
  )
}
