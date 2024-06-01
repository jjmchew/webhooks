import classes from './TopBar.module.css';
interface TopBarProps {
  url: string,
}

const TopBar = ({ url }: TopBarProps) => {
  const clickHandler = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className={classes.container}>
      <div className={classes.bar}>Send webhooks to <span className={classes.url}>{url}</span></div>
      <button onClick={clickHandler} >COPY</button>
    </div>
  )
};

export default TopBar;
