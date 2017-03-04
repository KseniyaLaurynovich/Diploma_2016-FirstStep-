import HomeView from './components/HomeView'
import requireAuthorization from '../requireAuthorization'

// Sync route definition
export default {
  component : requireAuthorization(HomeView)
}
