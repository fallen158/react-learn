import { withRouter } from 'next/router'
import Comp from '../components/Comp'

const B = ({ router }) => <Comp>BBBBBB{router.query.id}</Comp>

export default withRouter(B)
