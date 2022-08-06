import React from 'react';
import { NavBar } from './components/NavBar';
import {CreateBratkov} from './screens/CreateBratkov';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (<QueryClientProvider client={new QueryClient()}>
    
  
  <NavBar />
  <CreateBratkov />
  </QueryClientProvider>);
}

export default App;


