import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import Goals from './pages/Goals'
import Habits from './pages/Habits'
import Tasks from './pages/Tasks'
import Journal from './pages/Journal'
import Finance from './pages/Finance'
import Health from './pages/Health'
import Relationship from './pages/Relationship'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuthStore } from './store/authStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-right" />
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </Routes>
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/health" element={<Health />} />
              <Route path="/relationship" element={<Relationship />} />
            </Routes>
          </Layout>
        )}
      </Router>
    </QueryClientProvider>
  )
}

export default App
