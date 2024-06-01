import { useState, useEffect } from 'react'
import TopBar from './TopBar.tsx'
import DisplayRequests from './DisplayRequests'
import { useLocation } from 'react-router-dom'
import { baseURL, baseDomain } from '../utils.ts';


const RequestsPage = () => {
  const [appData, setAppData] = useState([]);
  const location = useLocation();
  const binName = location.pathname.replace('/view/','');

  const makeRequest = async () => {
    let url = `${baseURL}/api/${binName}/requests`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log('RequestsPage: data', data)
      return data;
    } catch (error) {
      console.log('>>>>> makeRequest error', error);
    }
  };

  useEffect(() => {
    makeRequest().then(data => {
      if (data) setAppData(data);
    });
  }, []);

  return (
    <>
      <TopBar url={`https://${binName}.${baseDomain}`} />
      <DisplayRequests data={appData} binName={binName}/>
    </>
  );
};

export default RequestsPage;