import _ from "lodash"
import {
  isUserLoggedIn,
  isCompanyMember,
  isUSCitizen,
  isUSResident,
  isForPrimeTrustKYC,
  hasPassedKYC,
  isKYCRejectedForever,
  hasSSN,
  hasAddress,
  getUserKYCStatus,
  mapProfile,
} from "./user-util"
import store from "../../redux/store";
import { KYC_STATUSES, PRIMETRUST_KYC_STATES } from "../../constants/DATA";
import mockUserStore from "../../../celsius-app-creds/mock-data/mockUserStore";
import SELECT_VALUES from "../../constants/SELECT_VALUES";

/* eslint-disable no-undef */
jest.mock('../../redux/store', () => ({
  /* eslint-disable no-undef */
  getState: jest.fn(),
}))

let mockState
store.getState = () => mockState

let nonPTStates
const initialState = {
  user: { profile: mockUserStore.profile.postman13 }
}

beforeEach(() => {
  mockState = _.cloneDeep(initialState)
})
afterEach(() => {
  mockState = _.cloneDeep(initialState)
})

describe("isUserLoggedIn()", () => {
  it("should return true if a profile with id is set", () => {
    expect(isUserLoggedIn()).toBeTruthy()
  })
  it("should return false if a profile doesn't have an id", () => {
    mockState = { user: { profile: {}}}
    expect(isUserLoggedIn()).toBeFalsy()
  })
})

describe("isCompanyMember()", () => {
  it("should return true if email is from @mvpworkshop.co", () => {
    mockState.user.profile.email = "test@mvpworkshop.co"
    expect(isCompanyMember()).toBeTruthy()
  })
  it("should return true if email is from @celsius.network", () => {
    mockState.user.profile.email = "test@celsius.network"
    expect(isCompanyMember()).toBeTruthy()
  })
  it("should return false if email is not from MVPW or CN", () => {
    mockState.user.profile.email = "test@gmail.com"
    expect(isCompanyMember()).toBeFalsy()
  })
})

describe("isUSCitizen()", () => {
  it("should return true if citizenship is US", () => {
    mockState.user.profile.citizenship = "United States"
    expect(isUSCitizen()).toBeTruthy()
  })
  it("should return true if country is US", () => {
    mockState.user.profile.country = "United States"
    expect(isUSCitizen()).toBeTruthy()
  })
  it("should return false if both citizenship and country are not US", () => {
    mockState.user.profile.citizenship = "France"
    mockState.user.profile.country = "Italy"
    expect(isUSCitizen()).toBeFalsy()
  })
})

describe("isUSResident()", () => {
  it("should return true if country is US", () => {
    mockState.user.profile.country = "United States"
    expect(isUSResident()).toBeTruthy()
  })
  it("should return false if country is not US", () => {
    mockState.user.profile.citizenship = "United States"
    mockState.user.profile.country = "Italy"
    expect(isUSResident()).toBeFalsy()
  })
})

describe("isForPrimeTrustKYC()", () => {
  beforeEach(() => {
    mockState = _.cloneDeep(mockState)
    mockState.forms = { formData: {}}
    nonPTStates = SELECT_VALUES.STATE
      .map(s => s.value)
      .filter(s => !PRIMETRUST_KYC_STATES.includes(s))
  })
  it("should return true if state on profile is NY or WA", () => {
    mockState.user.profile.state = "New York"
    expect(isForPrimeTrustKYC()).toBeTruthy()

    mockState.user.profile.state = "Washington"
    expect(isForPrimeTrustKYC()).toBeTruthy()
  })
  it("should return true if formData.state is NY or WA", () => {
    mockState.user.profile.state = null
    mockState.forms.formData.state = "New York"
    expect(isForPrimeTrustKYC()).toBeTruthy()

    mockState.forms.formData.state = "Washington"
    expect(isForPrimeTrustKYC()).toBeTruthy()
  })
  it("should return false if profile state is not in PRIMETRUST_KYC_STATES", () => {
    mockState.user.profile.citizenship = "United States"
    mockState.user.profile.country = "United States"
    nonPTStates.forEach(state => {
      mockState.user.profile.state = state
      expect(isForPrimeTrustKYC()).toBeFalsy()
    })
  })
  it("should return false if formData.state is not in PRIMETRUST_KYC_STATES", () => {
    mockState.user.profile.state = null
    nonPTStates.forEach(state => {
      mockState.forms.formData.state = state
      expect(isForPrimeTrustKYC()).toBeFalsy()
    })
  })
})

describe("hasPassedKYC()", () => {
  beforeEach(() => {
    mockState = _.cloneDeep(mockState)
    mockState.user.profile.kyc = {}
  })
  it("should return true if KYC status is passed", () => {
    mockState.user.profile.kyc.status = KYC_STATUSES.passed
    expect(hasPassedKYC()).toBeTruthy()
  })
  it("should return true if KYC status is ico_passed", () => {
    mockState.user.profile.kyc.status = KYC_STATUSES.ico_passed
    expect(hasPassedKYC()).toBeTruthy()
  })
  it("should return false for other KYC statuses", () => {
    const { passed, ico_passed: icoPassed } = KYC_STATUSES
    const notPassedStatuses = Object.values(KYC_STATUSES).filter(ks => ![icoPassed, passed].includes(ks))
    notPassedStatuses.forEach(ks => {
      mockState.user.profile.kyc.status = ks
      expect(hasPassedKYC()).toBeFalsy()
    })
  })
})

describe("isKYCRejectedForever()", () => {
  beforeEach(() => {
    mockState = _.cloneDeep(mockState)
    mockState.user.profile.kyc = {}
  })
  it("should return true if KYC status is permanently_rejected", () => {
    mockState.user.profile.kyc.status = KYC_STATUSES.permanently_rejected
    expect(isKYCRejectedForever()).toBeTruthy()
  })
  it("should return false for other KYC statuses", () => {
    const { permanently_rejected: permanentlyRejected } = KYC_STATUSES
    const notPassedStatuses = Object.values(KYC_STATUSES).filter(ks => ![permanentlyRejected].includes(ks))
    notPassedStatuses.forEach(ks => {
      mockState.user.profile.kyc.status = ks
      expect(isKYCRejectedForever()).toBeFalsy()
    })
  })
})

describe("hasSSN()", () => {
  it("should return true if user is not from US", () => {
    mockState.user.profile.citizenship = "Zimbabwe"
    mockState.user.profile.country = "Zimbabwe"
    mockState.user.profile.ssn = null
    expect(hasSSN()).toBeTruthy()
  })
  it("should return true if user is from US and has SSN set", () => {
    mockState.user.profile.citizenship = "United States"
    mockState.user.profile.ssn = "1234567890"
    expect(hasSSN()).toBeTruthy()
  })
  it("should return false if user is from US and no SSN was set", () => {
    mockState.user.profile.citizenship = "United States"
    mockState.user.profile.ssn = null
    expect(hasSSN()).toBeFalsy()
  })
})

describe("hasAddress()", () => {
  it("should return true if user has street, city and country", () => {
    mockState.user.profile.street = "Corona Street"
    mockState.user.profile.city = "Mexico City"
    mockState.user.profile.country = "Mexico"
    expect(hasAddress()).toBeTruthy()
  })
  it("should return false if user doesn't hae one of street, city and country", () => {
    mockState.user.profile.street = "Corona Street"
    mockState.user.profile.city = "Mexico City"
    mockState.user.profile.country = null
    expect(hasAddress()).toBeFalsy()

    mockState.user.profile.street = "Corona Street"
    mockState.user.profile.city = null
    mockState.user.profile.country = "Mexico"
    expect(hasAddress()).toBeFalsy()

    mockState.user.profile.street = null
    mockState.user.profile.city = "Mexico City"
    mockState.user.profile.country = "Mexico"
    expect(hasAddress()).toBeFalsy()
  })
})

describe("getUserKYCStatus()", () => {
  it("should return KYC status if user has one", () => {
    mockState.user.profile.kyc = { status: KYC_STATUSES.permanently_rejected }
    expect(getUserKYCStatus()).toBe(KYC_STATUSES.permanently_rejected)
  })
  it("should return collecting if user doesn't have one", () => {
    mockState.user.profile.kyc = null
    expect(getUserKYCStatus()).toBe(KYC_STATUSES.collecting)
  })
})

describe("mapProfile()", () => {
  beforeEach(() => {
    mockState.user.profile.profile_picture = "http://some.random.url/image.png"
  })
  it("should change profile picture url from http -> https", () => {
    const { profile } = mockState.user
    expect(mapProfile(profile).profile_picture).toBe("https://some.random.url/image.png")
  })
  it("should keep other profile props unchanged", () => {
    const changedProps = ["profile_picture"]
    const { profile } = mockState.user
    const profileProps = Object.keys(profile)
    const mappedProfile = mapProfile(profile)
    profileProps.forEach(pp => {
      if (!changedProps.includes(pp)) {
        expect(mappedProfile[pp]).toBe(profile[pp])
      } else {
        expect(mappedProfile[pp]).not.toBe(profile[pp])
      }
    })
  })
})
