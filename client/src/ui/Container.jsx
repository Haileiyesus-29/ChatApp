import PropTypes from 'prop-types'

function Container({ children }) {
   return (
      <div className='bg-slate-900 rounded-xl h-full container'>{children}</div>
   )
}
export default Container

Container.propTypes = {
   children: PropTypes.node,
}
