import { useSession } from "next-auth/react";

const Body = ({ Component, pageProps }) => {
    const {data: session, status} = useSession();

    if (status === "authenticated") {
        return <Component {...pageProps} />;
    }

    return (
        <div className='container p-3 justify-content-center  d-flex'>
        <div className="p-lg-5"><h3>Please login to view Administrator Panel!</h3></div>
        </div>
    );
  }
  
export default Body;