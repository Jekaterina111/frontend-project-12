import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';

const SpinnerLoading = () => {
    const { t } = useTranslation();
  
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <div className="loader-container">
          <div className="loader">
            <Spinner variant="primary" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="loader__message mt-2">
              {t('loading')}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SpinnerLoading;
  