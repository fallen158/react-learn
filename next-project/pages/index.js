import 'antd/dist/antd.css'
import { Button } from 'antd'
import '../style.css'
import Comp from '../components/Comp'
import Link from 'next/link'
import Router from 'next/router'

export default () => {
  function goToRouterA() {
    Router.push(
      {
        pathname: '/b',
        query: {
          id: 10
        },
      },
      '/b/10'
    )
  }
  return (
    <>
      <Link href="/b?id=1" as="/b/1">
        <div>
          <Comp>Index121321321</Comp>
        </div>
      </Link>
      <Button type="primary" onClick={goToRouterA}>
        Primary
      </Button>
    </>
  )
}
