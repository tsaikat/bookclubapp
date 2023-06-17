import Link from "next/link";

const Error404 = () => {
  return (
    <div className=" container text-center font-weight-bold text-dark p-lg-5">
      <h3>404 : Nothing to see here</h3>
      <h3>
        Go <Link href="/">Home</Link>!
      </h3>
    </div>
  );
};

export default Error404;
