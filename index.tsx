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

const BusinessVerificationContainer = (props) => {
  const VerificationModal = useRef<BottomSheetModal>(null)
  const { userDetails } = useContext(UserContext)
  const navigation = useNavigation()

  const onPress = (user) => {
    console.log(`Navigating to Screen2 with video: ${user}`)
    navigation.navigate(BuyerRoutes.Screen1, { user })
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          gap: 10,
          padding: 20,
        }}
      >
        <Pressable onPress={() => onPress('user 1')}>
          <View
            style={{
              width: w(80),
              height: h(25),
              backgroundColor: COLORS.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>User 1</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => onPress('user 2')}>
          <View
            style={{
              width: w(80),
              height: h(25),
              backgroundColor: COLORS.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>User 2</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => onPress('user 3')}>
          <View
            style={{
              width: w(80),
              height: h(25),
              backgroundColor: COLORS.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>User 3</Text>
          </View>
        </Pressable>
      </ScrollView>
    </>
  )
}

export default BusinessVerificationContainer
