import React from 'react'

// functional component
export default () => {
    // ES6 allows you to embedd JS with the {}?
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear() } MyMernProject 
    </footer>
  )
}
