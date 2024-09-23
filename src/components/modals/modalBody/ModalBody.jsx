/* eslint-disable react/prop-types */

const ModalBody = ({ modal }) => {
  return (
    <div className="fixed inset-0 bg-background bg-opacity-90 flex items-center justify-center  z-50 overflow-y-auto">
      {modal}
    </div>
  );
};

export default ModalBody;
