import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import useTranslation from 'react-i18next';

const SwitchLang = () => {
    const { i18n } = useTranslation();
   
    const toggleLanguage = (e) => {
       const lang = e.target.dataset.lang;
        i18n.changeLanguage(lang);
      };

  return (
    <ButtonGroup className="me-2" aria-label="Second group">
      <Button data-lang="en" onClick={toggleLanguage}>EN</Button>
      <Button data-lang="ru" onClick={toggleLanguage}>RU</Button> 
    </ButtonGroup>
  );
};

export default SwitchLang;
