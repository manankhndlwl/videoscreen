import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from 'app/context/Buyer/userContext'
import { useContext, useRef } from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import YoutubePlayer from 'react-native-youtube-iframe'

const Screen2 = ({ route, navigation }) => {
  const { video } = route.params

  const VerificationModal = useRef<BottomSheetModal>(null)
  const { userDetails } = useContext(UserContext)

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          gap: 10,
          padding: 20,
        }}
      >
        <View
        //   style={{
        //     width: w(80),
        //     height: h(25),
        //     backgroundColor: COLORS.surface,
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //   }}
        >
          <YoutubePlayer height={300} play={true} videoId={'iee2TATGMyI'} />
        </View>
        <Text>{video}</Text>
      </ScrollView>
    </>
  )
}

export default Screen2
