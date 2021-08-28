import React from 'react';
import Navs from './Navs';
import Title from './Title';

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="Ayan's Box Office App"
        subtitle=" Are you looking for a movie or an Actor?"
      />

      <Navs />

      {children}
    </div>
  );
};

export default MainPageLayout;
