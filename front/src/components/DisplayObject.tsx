import classes from './DisplayObject.module.css';
interface DisplayObjectProps {
  obj: any;
}

const DisplayObject = ({ obj }: DisplayObjectProps) => {
  if (!obj) return null;

  const entryArray: [string, string][] = Object.entries(obj);
  // console.log('DisplayObject', entryArray);

  let content = entryArray.map(entry => {
    return (
      <div key={`${entry[0]}${entry[1]}`} className={classes.row}>
        <div key={entry[0]} className={classes.key}>{entry[0]}</div>
        <div key={entry[1]}>{entry[1]}</div>
      </div>
    )
  });
  return (
    <div className={classes.container}>
      {content}
    </div>
  );
};

export default DisplayObject;