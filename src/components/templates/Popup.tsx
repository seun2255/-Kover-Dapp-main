interface PopupProps {
  visible: boolean;
  children?: JSX.Element | JSX.Element[];
  maxWidth?: string;
  width?: string;
  height?: string
  onClose?: () => void;
}

function Popup({ visible, children, maxWidth, height, width, onClose, ...rest }: PopupProps) {
  return visible ? (
    <div
      {...rest}
      className=" fixed right-0 left-0 bottom-0 p-4 flex justify-center items-center  z-[1019] sm:fixed top-0 pt-[20px]">
      <div className="drak bg-dark-700 bg-opacity-90 absolute top-0 right-0 bottom-0 left-0 -z-10"
        onClick={onClose} />
      <div className={`h-auto popup-margin dark:bg-white dark:text-dark-800 bg-dark-600 rounded  ${maxWidth || "max-w-[780px]"} ${width || ''} ${height || ''}  mb-[40px] sm:m-0 `} >
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Popup;