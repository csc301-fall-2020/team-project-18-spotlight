import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../EmailContext/AuthProvider";
import { TextInput, Button, RadioButton} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { LinearGradient } from 'expo-linear-gradient';

import CountryPicker from 'react-native-country-picker-modal';
import Constants from 'expo-constants';

const Onboarding = ({ route, navigation }) => {

    const { email } = route.params;

    const [firstName, setFirstName] = useState(route.params.firstName);
    const [lastName, setLastName] = useState(route.params.lastName);
    const [checked, setChecked] = useState('first');
    const [gender, setGender] = useState("Male");
    
    // Country
    const [countryCode, setCountryCode] = useState("");
    const [country, setCountry] = useState(null);
    const [withCountryNameButton, setWithCountryNameButton] = useState(false)
    const [withFlag, setWithFlag] = useState(true);
    const [withEmoji, setWithEmoji] = useState(true);
    const [withFilter, setWithFilter] = useState(true);
    const [withAlphaFilter, setWithAlphaFilter] = useState(false);
    const [withCallingCode, setWithCallingCode] = useState(false);
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
    };
    
    // Date
    const today = new Date();
    const [date, setDate] = useState(today);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // Register
    const { setIsNewUser } = useContext(AuthContext);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };

      const register = () => {
        setIsNewUser(false);
      }

    return (
        <LinearGradient
            colors={['red', 'salmon', 'orange']}
            style={{flex: 1}}
            //  Linear Gradient 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
        <SafeAreaView style={styles.container}>
            
            <View style={styles.info}>
                <Text style={styles.title}>Welcome to Spotlight!</Text>
                <Text style={{textAlign:"center"}}>Please fill in your information below</Text>
                <ScrollView 
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>

                        <TextInput
                            style={{ marginBottom: 5 }}
                            mode="outlined"
                            label="First Name"
                            underlineColorAndroid="transparent"
                            value={firstName}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(firstName) => setFirstName(firstName)}
                            left={
                                <TextInput.Icon
                                    name="account"
                                />
                            }
                        />

                        <TextInput
                            style={{ marginBottom: 5 }}
                            mode="outlined"
                            label="Last Name"
                            underlineColorAndroid="transparent"
                            value={lastName}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(lastName) => setLastName(lastName)}
                            left={
                                <TextInput.Icon
                                    name="account"
                                />
                            }
                        />

                        <TextInput
                            mode="outlined"
                            label="email"
                            underlineColorAndroid="transparent"
                            disabled="true"
                            value={email}
                            autoCorrect={false}
                            autoCapitalize="none"
                            left={
                                <TextInput.Icon
                                    name="email"
                                />
                            }
                        />
                    </View>
            
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Country</Text>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',                        
                            
                        }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius:10,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 5,
                                paddingBottom: 5,
                                width: 150,
                                flexDirection:"row",
                            }}>
                                <CountryPicker
                                    {...{
                                    countryCode,
                                    withFilter,
                                    withFlag,
                                    withCountryNameButton,
                                    withAlphaFilter,
                                    withCallingCode,
                                    withEmoji,
                                    onSelect,
                                    }}
                                />
                                {country !== null && (
                                    <Text style={{fontWeight:"bold", fontSize: 15, marginLeft:10}}>{country.name}</Text>
                                )}
                            </View>
                            {country !== null ? (
                                <Text style={styles.instructions}>press on the flag</Text>
                            ) : (
                                <Text style={styles.instructions}>Press on 
                                    <Text style={{fontWeight: "bold"}} > Select Country</Text>
                                </Text>
                            )}
                            
                        </View>
                        
                        {/* <Text style={styles.instructions}>Press on the flag to open modal</Text>
                        {country !== null && (
                            <Text style={styles.data}>{JSON.stringify(country, null, 2)}</Text>
                        )} */}
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Address for promotions/coupons</Text>

                        <TextInput
                            mode="outlined"
                            label="Address"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="none"
                            left={
                                <TextInput.Icon
                                    name="home"
                                />
                            }
                        />

                        <TextInput
                            mode="outlined"
                            label="City"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="none"
                            left={
                                <TextInput.Icon
                                    name="city"
                                />
                            }
                        />

                        <TextInput
                            mode="outlined"
                            label="State/Province"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="none"
                            left={
                                <TextInput.Icon
                                    name="image-filter-hdr"
                                />
                            }
                        />

                        <TextInput
                            mode="outlined"
                            label="ZIP Code"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="none"
                            left={
                                <TextInput.Icon
                                    name="map-marker"
                                />
                            }
                        />
                    </View>

                    <View style={styles.header, {flex:1, justifyContent:"center", alignContent:"center"}}>
                        <Text style={styles.headerTitle}>Date of Birth</Text>
                        <Text style={{
                            textAlign:"center",
                            fontWeight:"bold",
                            marginTop: 5,
                            marginBottom:10,
                            color: "grey"
                        }}>
                            {moment(date).format("dddd, MMMM D, YYYY")}</Text>
                        <View>
                            <Button
                            icon="calendar"
                            mode="outlined"
                            style={{
                                borderRadius:20,
                                width: 300,
                                borderColor:"purple"
                            }}
                            onPress={showDatepicker} >
                            Pick a Date
                            </Button>
                        </View>
                        {show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            />
                        )}
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Gender</Text>
                        <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
                            <RadioButton.Item label="Male" value="male" />
                            <RadioButton.Item label="Female" value="female" />
                            <RadioButton.Item label="Non-binary" value="non-binary" />
                        </RadioButton.Group>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Phone (To receive text updates)</Text>

                        <TextInput
                            mode="outlined"
                            label="Phone Number"
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType={'numeric'}
                            left={
                                <TextInput.Icon
                                    name="cellphone"
                                />
                            }
                        />
                    </View>

                    <View style={styles.header}>
                    <Button
                        style={styles.register}
                        icon="account-plus"
                        mode="contained"
                        onPress={register}
                    >
                        <Text>I'm ready!</Text>
                    </Button>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "salmon",
    justifyContent: "center",
    alignItems:"center"
  },
  header:{
    marginTop:5,
    marginBottom:5
  },  
  headerTitle:{
      fontWeight:"bold",
      textTransform:"uppercase",
      marginTop:5,
      marginBottom:5
  }, 
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center",
  },
  country:{
      marginTop: 10,
      marginBottom: 60,
      padding: 0,
      backgroundColor:"pink"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    color: '#777'
  },
  register: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "green",
  },
  info: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: "85%",
    marginVertical: 60,
    marginHorizontal:"auto",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 3,
  }
});

export default Onboarding;
