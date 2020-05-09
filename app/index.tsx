import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './redux/store/configureStore';
import './utils/normalize.css';

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);

// * Note!
// ? When files/folders are renamed, saved, moved, deleted, a redux action is dispatched, which runs the side-effect of filesystem interactions via Node's fs module, gets new data from Node fs, and reducer updates filesystem state in redux store.
