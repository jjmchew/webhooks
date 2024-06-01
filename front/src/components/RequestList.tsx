import classes from './RequestList.module.css';
import { printDateTime } from '../utils.ts';

interface RequestListProps {
  data: any[],
  handleClick: any,
}


const RequestList = ({ data, handleClick }: RequestListProps) => {
  const display = data.map(obj => {
    return (
      <div key={obj.requesthash} className={classes.rowWrap} onClick={() => handleClick(obj.requesthash)}>
        <div className={classes.date}>{printDateTime(obj.datetimestr)} </div>
        <div className={classes.method}>{obj.method}</div>
        <div className={classes.path}>{obj.hostname}</div>
      </div>
    );
  });

  return (
    <>
      <div className={classes.container}>
        <h1>Received Requests</h1>
        {display}
      </div>
    </>
  )
};

export default RequestList;

