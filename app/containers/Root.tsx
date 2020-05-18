import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { MarkdownContextProvider } from './MarkdownContext';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../redux/reducers/types';
import Routes from '../Routes';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <StoreProvider store={store}>
    <MarkdownContextProvider>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </MarkdownContextProvider>
  </StoreProvider>
);

export default hot(Root);
