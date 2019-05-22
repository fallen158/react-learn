import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef
} from 'react';
import MyContext from './my_context';

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state;
  }
}

function index() {
  const [count, dispatchCount] = useReducer(countReducer, 0);
  const [name, setName] = useState('jocky');
  const context = useContext(MyContext);
  const inputRef = useRef();
  useEffect(() => {
    console.log(inputRef);
    console.log('effect invoked');
    return () => console.log('effect deteched');
  }, [name]);
  return (
    <>
      <input
        ref={inputRef}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => dispatchCount({ type: 'add' })}>
        Add {count}
      </button>
      <p>{context}</p>
    </>
  );
}

export default index;
