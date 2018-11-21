import './sass/index.scss';
import React from 'react';
import { render } from 'react-dom';
import Root from './Root.jsx';
import { Provider } from 'react-redux';
import Store from './redux/Store';

render(
    <Provider store={ Store }>
        <Root />
    </Provider>,
    document.getElementById('root')
);
