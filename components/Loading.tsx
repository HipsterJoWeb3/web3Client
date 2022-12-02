import Typewriter from "typewriter-effect"

const Loading = () => {
  return (
    <div className="loading">
      <Typewriter options={{loop: true}} onInit={(typewriter)=> {
           typewriter
            .typeString(`Loading ...`)
            .pauseFor(500)
            .start()
         }}
       />
    </div>
  )
}

export default Loading
