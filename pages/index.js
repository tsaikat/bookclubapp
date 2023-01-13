import { useSession } from "next-auth/react"


export default function Home() {
  const {data: session} = useSession();

  return (
    <div className='container p-3 justify-content-center  d-flex'>
      <div className="p-lg-5">
        <h3> Hi {session.user.name}, <br/> Welcome to Administrator Panel </h3></div>
    </div>
  )
}
