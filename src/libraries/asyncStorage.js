import AsyncStorage from "@react-native-async-storage/async-storage"


const getUserDetails = async () => {
  return JSON.parse(await AsyncStorage.getItem('userDetails'))
}

const setUserDetails = async (userDetails) => {
  await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails))
}


export {
  getUserDetails,
  setUserDetails
}