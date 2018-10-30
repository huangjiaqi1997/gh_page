import React from 'react';
import Head from './container/head/head';
import PlayList from './container/playList/playList';
import Side from './container/side/side';
import Controller from './container/controller/controller';

function MusicApp() {
  return (
    <div className="music-app">
      <Head />
      <div className="list-side-wrapper">
        <PlayList />
        <Side />
      </div>
      <Controller />
    </div>
  );
}

export default MusicApp;
