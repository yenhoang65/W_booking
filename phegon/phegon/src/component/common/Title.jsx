import PropTypes from 'prop-types'

const Title = ({title,desc=""}) => {
  return (
    <div className="flex flex-col justify-center items-center">
        <h1 className="text-[40px] w-[380px] text-center font-bold  text-[#191B1D]">{title}</h1>
        <p className='text-center pt-[18px] w-[570px]'>{desc}</p>
    </div>
  )
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }

export default Title