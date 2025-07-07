import React from 'react'
import Create from './components/Create';
import List from  './components/List';
import  WeatherApp from './homeworks/WeatherApp/components/WeatherApp';

export default function Day_6() {
  // const [reload, setReload] = React.useState(0);

  // const handleOnCreated = () => setReload(r => r + 1);

  return (
    <div>
      {/* <Create onCreated={handleOnCreated} />
      <List reload={reload} /> */}
      <WeatherApp />

    </div>
    
  );
}
