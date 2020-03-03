import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'


// import BalanceViewStyle from "./BalanceView.styles";
import CelText from '../../atoms/CelText/CelText'
import formatter from '../../../utils/formatter'

const BalanceView = props => {
  // const style = BalanceViewStyle();
  const { crypto, usd, coin } = props

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10
      }}
    >
      <CelText align='right' type='H7'>
        Balance:{' '}
        {`${formatter.getEllipsisAmount(
          formatter.removeDecimalZeros(crypto),
          -8
        )} ${coin}  |  $ ${formatter.floor10(usd, -2)} USD`}
      </CelText>
    </View>
  )
}

BalanceView.propTypes = {
  usd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  crypto: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default BalanceView
