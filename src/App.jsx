// THIRD PARTY MODULES
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

// COMPONENTS
import ProtectedRoute from './ui/ProtectedRoute.jsx';
import AppLayout from './ui/AppLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import GlobalStyles from './styles/GlobalStyles.js';
import Bookings from './pages/Bookings.jsx';
import Account from './pages/Account.jsx';
import Users from './pages/Users.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Cabins from './pages/Cabins.jsx';
import Booking from './pages/Booking.jsx';
import Checkin from './pages/Checkin.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback.jsx';
import DarkModeContextProvider from './contexts/DarkModeContext.jsx';

// LOADERS;
import { loader as cabinsLoader } from './features/cabins/CabinTable.jsx';
import { loader as bookingsLoader } from './features/bookings/useBookings.js';

const clientQuery = new QueryClient({
  defaultOptions: {
    queries: {
      // This defines the time (in ms) that the query will be considered stale(outdated) which will trigger a refetch
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace('/')}
      >
        <ProtectedRoute />,
      </ErrorBoundary>
    ),
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate replace={true} to={'/dashboard'} />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'bookings',
            element: <Bookings />,
            loader: bookingsLoader(clientQuery),
          },
          {
            path: 'bookings/:bookingId',
            element: <Booking />,
          },
          {
            path: 'checkin/:bookingId',
            element: <Checkin />,
          },
          {
            path: 'cabins',
            element: <Cabins />,
            loader: cabinsLoader(clientQuery),
          },
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'account',
            element: <Account />,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={clientQuery}>
      <ReactQueryDevtools />
      <GlobalStyles />
      <DarkModeContextProvider>
        <RouterProvider router={router} />

        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 3500,
            },
            style: {
              fontSize: '1rem',
              maxWidth: '500px',
              padding: '1rem 1.5rem',
              backgroundColor: 'var(--color-grey-100)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </DarkModeContextProvider>
    </QueryClientProvider>
  );
}
