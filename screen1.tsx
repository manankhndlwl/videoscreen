import { BottomSheetModal } from '@gorhom/bottom-sheet'
import FallbackSpinner from 'app/components/common/fallbackSpinner'
import VerificationModalContainer from 'app/components/common/VerificationModal'
import { Suspense, lazy, useContext, useEffect, useRef, useState } from 'react'
import Routes from '../../../navigation/native/Buyer/routes'
import SentryErrorBoundary from './errorBoundary'
import { useQuery } from '@apollo/client'
import { GET_KYC_DOCUMENT_BUYER } from 'app/schema/queries/buyer-queries'
import { UserContext } from 'app/context/Buyer/userContext'
import { CommonActions, useNavigation } from '@react-navigation/native'
import BuyerRoutes from '../../../navigation/native/Buyer/routes'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { View, Text, Pressable } from 'react-native'
import { h, w } from 'app/styles/util.style'
import { COLORS } from 'app/styles/theme.style'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Screen1 = ({ route, navigation }) => {
  const VerificationModal = useRef<BottomSheetModal>(null)
  const { userDetails } = useContext(UserContext)
  const { user } = route.params
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('clickedVideos')
        if (storedData) {
          setData(JSON.parse(storedData))
        }
      } catch (error) {
        console.error('Failed to fetch data from AsyncStorage:', error)
      }
    }

    fetchData()
  }, [])

  const onPress = async (video) => {
    console.log(`Navigating to Screen2 with video: ${video}`)
    navigation.navigate(BuyerRoutes.Screen2, { video, user })

    try {
      const newEntry = { user, video }
      const updatedData = [...data, newEntry]
      setData(updatedData)
      await AsyncStorage.setItem('clickedVideos', JSON.stringify(updatedData))
    } catch (error) {
      console.error('Failed to save data to AsyncStorage:', error)
    }
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          gap: 10,
          padding: 20,
        }}
      >
        <Pressable onPress={() => onPress('Video 1')}>
          <View
            style={{
              width: w(80),
              height: h(25),
              backgroundColor: COLORS.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Video 1</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => onPress('Video 2')}>
          <View
            style={{
              width: w(80),
              height: h(25),
              backgroundColor: COLORS.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Video 2</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => onPress('Video 3')}>
          <View
            style={{
              width: w(80),
              height: h(25),
              backgroundColor: COLORS.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Video 3</Text>
          </View>
        </Pressable>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{`${item.user} clicked ${item.video}`}</Text>
              </View>
            )
          }}
        />
      </ScrollView>
    </>
  )
}

export default Screen1
