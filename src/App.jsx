

import './App.css'
import NewHOmeLoan from './components/NewHomeLoan/NewHomeLoan';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


function App() {

  

  return (

      <Tabs>
      <TabList>
        <Tab>New Home Loan</Tab>
        <Tab>Existing Home Loan</Tab>
      </TabList>

      <TabPanel>
        <NewHOmeLoan/>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
 
  )
}

export default App
