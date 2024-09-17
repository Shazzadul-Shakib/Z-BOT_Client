/* eslint-disable react/prop-types */

const ModalBody = ({modal}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center py-16 z-50 overflow-y-auto-auto">
            {modal}
        </div>
    );
};

export default ModalBody;