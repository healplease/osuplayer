import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Home from './components/pages/home/Home';
import Upload from './components/pages/upload/Upload';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/upload',
        element: <Upload />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode><RouterProvider router={router} /></React.StrictMode>);
