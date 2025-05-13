import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { Bounce, ToastContainer } from "react-toastify"
import { store } from "./app/store"
import AppRoutes from "./routes/AppRoutes"

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  )
}

export default App
