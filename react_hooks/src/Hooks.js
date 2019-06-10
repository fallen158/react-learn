import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useCallback,
  useMemo
} from 'react'

/**
 * 通过useRef,避免useEffect的闭包陷阱,拿到最新的state值
 */
// 自定义 Hooks
// function useCurrentVaue (value) {
//   const ref = useRef(value)
//   useEffect(
//     () => {
//       ref.current = value
//     },
//     [value]
//   )
//   return ref
// }
// const Index = () => {
//   const [count, setCount] = useState(0)
//   const currentCount = useCurrentVaue(count)
//   useEffect(() => {
//     currentCount.current = count
//     return () => console.log('close')
//   })

//   const log = () => {
//     console.log(count)
//     setCount(count + 1)
//     setTimeout(() => {
//       console.log(currentCount.current)
//     }, 3000)
//   }

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={log}>Click me</button>
//     </div>
//   )
// }
// export default Index

// class Index extends React.Component {
//   state = {
//     count: 0
//   }
//   handleClick = () => {
//     this.setState({
//       count: this.state.count + 1
//     })

//     setTimeout(() => {
//       console.log(this.state.count)
//     }, 3000)
//   }
//   render () {
//     return (
//       <div>
//         <p>You clicked {this.state.count} times</p>
//         <button onClick={this.handleClick}>Click me</button>
//       </div>
//     )
//   }
// }

// export default Index

/**
 * 通过 Reducer 解决多个state变量累加的问题
 */
// function reducer (state, action) {
//   switch (action.type) {
//     case 'tick':
//       return {
//         ...state,
//         count: state.count + state.step
//       }
//     default:
//       return state
//   }
// }
// const initialState = {
//   count: 0,
//   step: 1
// }
// function Index () {
//   const [state, dispatch] = useReducer(reducer, initialState)
//   const { count, step } = state

//   useEffect(
//     () => {
//       const id = setInterval(() => {
//         dispatch({ type: 'tick' })
//       }, 1000)
//       return () => clearInterval(id)
//     },
//     [dispatch]
//   )

//   return (
//     <h1>
//       {count}
//     </h1>
//   )
// }
// export default Index

/**
 * 通过 userCallback 把函数抽到useEffect外部,
 * 可以看到，useCallback 也有第二个参数 - 依赖项，我们将 getFetchUrl 函数的依赖项通过 useCallback 打包到新的
 * getFetchUrl 函数中，那么 useEffect 就只需要依赖 getFetchUrl 这个函数，就实现了对 count 的间接依赖。
 */
// function Counter () {
//   const [count, setCount] = useState(0)

//   const getFetchUrl = useCallback(
//     () => {
//       return 'https://v?query=' + count
//     },
//     [count]
//   )

//   useEffect(
//     () => {
//       getFetchUrl()
//     },
//     [getFetchUrl]
//   )

//   return (
//     <>
//       <h1>{count}</h1>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </>
//   )
// }
// export default Counter

/**
 *
 * @param {*} count
 * @param {*} step
 * 观察可以发现，count 与 step 都会频繁变化，每次变化就会导致 useFetch 中 useCallback 依赖的变化，
 * 进而导致重新生成函数。然而实际上这种函数是没必要每次都重新生成的，反复生成函数会造成大量性能损耗。
 */
// function useFetch (count, step) {
//   return useCallback(
//     () => {
//       const url = 'https://v/search?query=' + count + '&step=' + step
//       console.log(url)
//     },
//     [count, step]
//   )
// }
// function Parent () {
//   const [count, setCount] = useState(0)
//   const [step, setStep] = useState(0)
//   const [other, setOther] = useState(0)
//   const fetch = useFetch(count, step) // 封装了 useFetch

//   useEffect(
//     () => {
//       fetch()
//     },
//     [fetch]
//   )

//   return (
//     <div>
//       <button onClick={() => setCount(c => c + 1)}>setCount {count}</button>
//       <button onClick={() => setStep(c => c + 1)}>setStep {step}</button>
//       <button onClick={() => setOther(c => c + 1)}>setOther {other}</button>
//     </div>
//   )
// }
// export default Parent

/**
 * useMemo 主要用于渲染过程优化，两个参数依次是计算函数（通常是组件函数）和依赖状态列表
 * ，当依赖的状态发生改变时，才会触发计算函数的执行。如果没有指定依赖，则每一次渲染过程都会执行该计算函数。
 */
// function Time() {
// 	return <p>{Date.now()}</p>;
// }

// function Counter() {
//   const [count, setCount] = useState(0);
//   const [name,setName] = useState('zhangsan')

//   const memoizedChildComponent = useMemo((count) => {
//     return <Time />;
//   }, [count]);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={() => setCount(count + 1)}>+</button>
//       <div>{memoizedChildComponent}</div>
//     </div>
//   );
// }

// export default Counter

/**
 * HOC
 */

// import PropTypes from 'prop-types'

// // 属性代理
// class Show extends React.Component {
//   static propTypes = {
//     children: PropTypes.element,
//     visible: PropTypes.bool
//   }

//   render () {
//     const { visible, children } = this.props
//     return visible ? children : null
//   }
// }

// // 反向继承
// function Show (WrappedComponent) {
//   return class extends WrappedComponent {
//     render () {
//       if (this.props.visible === false) {
//         return null
//       } else {
//         return super.render()
//       }
//     }
//   }
// }

// function App () {
//   return <Show visible={Math.random() > 0.5}>hello</Show>
// }

// export default App

/**
 * 发送数据请求
 */

import axios from 'axios'
const Index = () => {
  const [data, setData] = useState({ hots: [] })
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'http://hn.algolia.com/api/v1/search?query=redux'
      )

      setData(result.data)
    }
    fetchData()
  }, [])

  return (
    <>
      <div>Hello async</div>
      <ul>
        {data.hots.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Index
