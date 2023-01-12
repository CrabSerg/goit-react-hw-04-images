import { ThreeDots } from 'react-loader-spinner';
import { DotsWrap } from './Loader.styled';

export const Loader = () => {
  return (
    <DotsWrap>
      <ThreeDots
        height="100"
        width="100"
        radius="11"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </DotsWrap>
  );
};
