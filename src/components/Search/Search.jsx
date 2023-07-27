
import './search.css'
import { motion } from 'framer-motion'
const Search = () => {
  return (
    <motion.div className='search'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{
        ease: "linear",
        duration: .5,
      }}

    >Search</motion.div>
  )
}

export default Search