import { TailSpin } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="pl-1">
      <TailSpin height={25} width={70} color="white" ariaLabel="loading" />
    </div>
  );
}
