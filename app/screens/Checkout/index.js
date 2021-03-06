import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';

export default function Checkout({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState({
    name: true,
    email: true,
    message: true,
  });
  const [loading, setLoading] = useState(false);
  const [region] = useState({
    latitude: 10.73902,
    longitude: 106.704938,
    latitudeDelta: 0.009,
    longitudeDelta: 0.004,
  });

  /**
   * @description Called when user sumitted form
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const onSubmit = () => {
    if (name == '' || email == '' || message == '') {
      setSuccess({
        ...success,
        email: email != '' ? true : false,
        name: name != '' ? true : false,
        message: message != '' ? true : false,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(true);
        navigation.goBack();
      }, 500);
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={'Checkout'}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 15}}>
            <View style={{
              borderColor: '#fafafa',
              borderRadius: 7,
              backgroundColor: '#f1f1f1',
              paddingBottom:15,
              paddingTop:6,
              marginTop:19,
              shadowColor: "#orange",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2.22,
              elevation: 3,
            }}>
              <View style={{marginVertical: 10, alignItems:'center',}}>
                <Text headline>
                {'Order Details'}
                </Text>
              </View>
              <View style={{
              paddingLeft:13,
            }}>
                <Text style={{fontWeight:'bold', color: "orange", fontSize: 15, marginVertical: 2, marginTop:10}}>ID:</Text>
                <Text style={{marginVertical: 4, fontSize: 15}}>192839983</Text>
                <Text style={{fontWeight:'bold', color: "orange", fontSize: 15, marginVertical: 2}}>Deal:</Text>
                <Text style={{marginVertical: 4, fontSize: 15}}>20% Off Breakfast at Pirate</Text>
                <Text style={{fontWeight:'bold', color: "orange", fontSize: 15, marginVertical: 2}}>Price:</Text>
                <Text style={{marginVertical: 4, fontSize: 15}}>$ 4.99</Text>
              </View>
            </View>
            <TouchableOpacity style={{
              backgroundColor: "#ffc439",
              marginTop: 70,
              borderRadius: 50,
              width:300,
              height: 40,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={()=>{
              navigation.navigate('Deal');
            }}>
              <View>
                <Text style={{
                  color: "#2997D8",
                  fontWeight: "bold",
                  fontSize: 20,
                }}>
                  PayPal
                </Text>  
              </View>
            </TouchableOpacity>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
