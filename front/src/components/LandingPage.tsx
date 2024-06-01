// import classes from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../utils.ts'

const LandingPage = () => {

  const navigate = useNavigate();
  const handleClick = async () => {
    const url = `${baseURL}/api/new`;

    try {
        const response = await fetch(url, {method: 'post'});
        const data = await response.json();
        navigate(`/view/${data.binName}`);
    } catch (e) {
        console.log(e)
    }
  };

  return (
    <>
      <h1>webhooks</h1>
      <div>
        <button onClick={handleClick}>create new dumpster</button>
      </div>
    </>
  );
};

export default LandingPage;