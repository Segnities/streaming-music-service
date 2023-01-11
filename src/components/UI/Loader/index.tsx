import loader from "./assets/img/loader.svg";

interface Props {
  title?: string;
}

function Loader(props: Props) {
  const { title } = props;
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <img src={loader} alt={title} className="w-32 h-32 object-contain" />
      <h2 className="font-bold text-white text-2xl mt-2">
        {title || "Loading..."}
      </h2>
    </div>
  );
}

export default Loader;
