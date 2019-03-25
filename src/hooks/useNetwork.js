import { useEffect } from 'react'

import { usePersistedState } from './usePersistedState'
import { assertNetwork, isValidNetwork } from '../helpers/api'

export const useNetwork = () => {
  const [network, setNetwork] = usePersistedState('network')

  const coercedNetwork = isValidNetwork(network) ? network : 'mainnet'

  const coercedSetNetwork = (network) => {
    assertNetwork(network)
    setNetwork(network)
  }

  useAttatchToWindow(coercedNetwork, 'network')
  useAttatchToWindow(coercedSetNetwork, 'setNetwork')

  return [coercedNetwork, coercedSetNetwork]
}

const useAttatchToWindow = (thing, keyName) => useEffect(() => {
  window[keyName] = thing
  return () => delete window[keyName]
}, [thing])
