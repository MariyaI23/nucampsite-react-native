import React from 'react';
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

//Wrapping the Main Component in the Provider component from react-redux gives the ability to all the components that
//are rendered through the Main component to connect to the sore.

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}


