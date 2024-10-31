import './i18next';

import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import { QueryProvider } from '@miti/query/provider';

import Body from './Body';
import { DarkModeProvider } from './components/DarkModeProvider';

const App = () => {
  return (
    <BrowserRouter>
      <QueryProvider>
        <DarkModeProvider>
          <Body />
          <Toaster position="bottom-center" />
        </DarkModeProvider>
      </QueryProvider>
    </BrowserRouter>
  );
};

export default App;
