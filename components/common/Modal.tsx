import React, { FunctionComponent } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { useAppSelector } from '../../hooks';
import Button from './Button';
import HeaderText from './typography/headerText';

const Modal:FunctionComponent = () => {
  const { isOpen, content } = useAppSelector((state) => state.modal);
  if (!isOpen || !content) return null;

  const handleCloseFunc = () => {
    if (content.outsideClick) {
      return content.closeFunc();
    }
    return () => {};
  };

  if (content.children && !content.renderWithDefaultBody) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center h-screen w-screen bg-black bg-opacity-60">
        <OutsideClickHandler onOutsideClick={handleCloseFunc}>
          <div>
            {content.children}
          </div>
        </OutsideClickHandler>
      </div>
    );
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center h-screen w-screen bg-black text-white bg-opacity-60">
      <OutsideClickHandler onOutsideClick={handleCloseFunc}>
        <div className="px-4 py-8 bg-gray-100 dark:bg-tmrev-gray-dark rounded w-full max-w-2xl flex-col justify-center items-center space-y-4">
          <HeaderText>
            {content.title}
          </HeaderText>
          <p className="">{content.description}</p>
          {content.children}
          <div className="!mt-8 flex space-x-4">
            {content.buttons && content.buttons.map((button: any) => (
              <Button
                key={button.title}
                className="w-full"
                type={button.type}
                variant={button.variant}
                onClick={button.onClick}
              >
                {button.title}
              </Button>
            ))}
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Modal;
