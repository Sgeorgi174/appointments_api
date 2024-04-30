import HashLoader from "react-spinners/HashLoader";

export const Loader = () => {
  return (
    <div className="flex justify-center items-centr pt-40">
      <HashLoader size={250} color="#7c36d6" />
    </div>
  );
};
