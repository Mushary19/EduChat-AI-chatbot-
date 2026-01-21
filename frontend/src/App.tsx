import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import AppRoutes from "./routes/AppRoutes"

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            duration: 4000,
            removeDelay: 1000,
            success: {
              duration: 3000,
            },
          }}
        />
        <AppRoutes />
      </QueryClientProvider>
    </>
  )
}

export default App
