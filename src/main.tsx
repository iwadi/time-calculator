// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import App from './App.tsx';
// import NotFoundPage from './NotFoundPage/NotFoundPage.tsx';
// import ComputationTime from './content/time/SubtractionOfTime.tsx';
// import ReadingTime from './content/time/ReadingTime.tsx';
// import SubtractionOfTime from './content/time/SubtractionOfTime.tsx';

// const router = createBrowserRouter([
//   { path: "/", element: <App />, errorElement: <NotFoundPage /> },
//   { path: "/ComputationTime", element: <ComputationTime />, errorElement: <NotFoundPage /> },
//   { path: "/ReadingTime", element: <ReadingTime />, errorElement: <NotFoundPage /> },
//   { path: "/SubtractionOfTime", element: <SubtractionOfTime />, errorElement: <NotFoundPage /> },
//   { path: "*", element: <NotFoundPage /> },
// ]);

// createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//         <RouterProvider router={router} />
//     </StrictMode>
// );


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);