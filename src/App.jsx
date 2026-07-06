import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { AuthContextProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
export function App({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );
}

App.protoTypes = {
  children: PropTypes.element.isRequired,
};
