import imageDone from '../images/done.jpg';
import imageError from '../images/error.jpg';
import React from 'react';

const InfoTooltip = ({ isSuccess, isOpen, onClose }) => {
  const signUpResult = {
    success: 'Вы успешно зарегистрировались!',
    fail: 'Что-то пошло не так! Попробуйте ещё раз.',
  };

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button className="popup__close" type="button" onClick={onClose} />
        <div
          className="popup__tooltip-image"
          style={{
            backgroundImage: `url(${isSuccess ? imageDone : imageError})`,
          }}
        ></div>
        <p className="popup__tooltip-text">
          {isSuccess ? signUpResult.success : signUpResult.fail}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
