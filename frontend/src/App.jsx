import React from "react";
import Display from "./components/Display";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
       
          <Display/>
        
      </QueryClientProvider>
    </>
  );
}

export default App;
