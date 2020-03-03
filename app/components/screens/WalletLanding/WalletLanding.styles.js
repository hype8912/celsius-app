import { getThemedStyle, widthPercentageToDP } from '../../../utils/styles-util';


const base = {
  coinCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  addMoreCoinsGrid: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    width: widthPercentageToDP("50%") - 28, // same width as Card.styles.js style half
    minHeight: 130,
    borderColor: 'gray',
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  addMoreCoinsList: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    width: '100%',
    height: 80,
    borderColor: 'gray',
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  coinsTextGrid: {
    marginTop: '35%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between'

  },

  coinsTextList: {
    marginTop: '15%',
    alignItems: 'center',
    alignContent: 'center',
    // justifyContent: 'space-between'
  }
}

const themed = {
  light: {
  },

  dark: {
  },

  celsius: {
  }
}

const WalletLandingStyle = () => getThemedStyle(base, themed);

export default WalletLandingStyle
