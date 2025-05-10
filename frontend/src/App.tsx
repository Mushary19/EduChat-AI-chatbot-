import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Bounce, ToastContainer } from "react-toastify"
import AppRoutes from "./routes/AppRoutes"

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <AppRoutes />
      </QueryClientProvider>
    </>
  )
}

export default App
