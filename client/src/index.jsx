import React from 'react';
import ReactDOM from 'react-dom';
import PhotoForm from './components/PhotoForm';

function Index() {
  return (
    <div className="App">
      <PhotoForm />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
