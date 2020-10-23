import React from "react"
import { observer } from "mobx-react-lite"
import { useNavigation, useRoute } from "@react-navigation/native"
import { StyleSheet, TextStyle, Image, ViewStyle, View, SectionList, Alert, SafeAreaView, Dimensions} from "react-native"
import { Button, Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography} from "../../theme"
import { Goal, useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  alignItems: "center",
 // justifyContent: "center",
}

const Separator = () => (
  <View style={styles.separator} />
);

const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}

const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
  marginTop: spacing[5],
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}

const FULL: ViewStyle = { 
  flex: 1 
}


export const GoalDetailScreen = observer(function GoalDetailScreen({  }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const route = useRoute()
  //const {LTgoal, STgoals, id} = route.params as Goal

  const LTgoal = "hello"
  const STgoals = [{text: "hi", monday: [100], tuesday: [200], wednesday: [], thursday: [100], friday: [], saturday: [], sunday: []}, {text: "bye", monday: [24], tuesday: [225], wednesday: [], thursday: [10], friday: [88], saturday: [], sunday: []}]
 
  // const nextScreen = () => navigation.navigate("signInScreen")
  
  var monday = []
  var tuesday = []
  var wednesday = []
  var thursday = []
  var friday = []
  var saturday = []
  var sunday = []

  for (let goal of STgoals){
    if (goal.monday.length > 0) monday.push([goal.monday[0], goal.text])
    if (goal.tuesday.length > 0) tuesday.push([goal.tuesday[0], goal.text])
    if (goal.wednesday.length > 0) wednesday.push([goal.wednesday[0], goal.text])
    if (goal.thursday.length > 0) thursday.push([goal.thursday[0], goal.text])
    if (goal.friday.length > 0) friday.push([goal.friday[0], goal.text])
    if (goal.saturday.length > 0) saturday.push([goal.saturday[0], goal.text])
    if (goal.sunday.length > 0) sunday.push([goal.sunday[0], goal.text])
  }

  function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
  }

  const allSTGoals = [
    {
      title: "Monday",
      data: monday.sort(sortFunction)
    },
    {
      title: "Tuesday",
      data:  tuesday.sort(sortFunction)
    },
    {
      title: "Wednesday",
      data: wednesday.sort(sortFunction)
    },
    {
      title: "Thursday",
      data: thursday.sort(sortFunction)
    },
    {
      title: "Friday",
      data: friday.sort(sortFunction)
    },
    {
      title: "Saturday",
      data: saturday.sort(sortFunction)
    },
    {
      title: "Sunday",
      data: sunday.sort(sortFunction)
    }
  ];

  const createTwoButtonAlert = () =>
  Alert.alert(
    "Delete Goal",
    "This cannot be undone.",
    [
      {
        text: "No",
       // onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );

  const Item = ({ title }) => {

    var mins = title[0]%60;
    var hrs = Math.floor(title[0]/60);

    return(
      <View style={styles.item}>
        <Text style={{color: '#000'}}>{title[1]}</Text>
        <Text style={styles.right}>{hrs}:{mins}</Text>
      </View>
    )
  };

  return (
    <View style={FULL}>
      <Screen style={ROOT} backgroundColor={color.transparent}>
        <Header style={HEADER} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE}>[   {LTgoal}   ]</Text>
        </Text>
        < Separator />
        <Image source={require("../../../assets/hiking.png")} style={styles.image} />
        < Separator />
        <SafeAreaView style={{flex: 1}}>
          <SectionList
            style={{flex: 1, width:350}}
            sections={allSTGoals}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item title={item} />}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        </SafeAreaView>
        <View style={styles.fixToText}>
          <Button
            style={styles.button}
            text="Edit"
            onPress={() => navigation.navigate("editGoal")}
          />
          <Button
            style={styles.button}
            text="Delete"
            onPress={createTwoButtonAlert}
          />
        </View>
      </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width:75,
    height:75,
  },
  button: {
    marginRight:10,
    marginLeft:10
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    textAlign: 'right',
    flex: 1,
    color: '#000'
  },
  header: {
    fontSize: 32,
    backgroundColor: "#f9f",
    flex: 1
  },
  item: {
    backgroundColor: "#fff",
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    flex: 1
  },
  flatlist: {
    marginTop: 40,
    overflow: 'scroll',
    height: 400,
    width: Dimensions.get('window').width - 20
  },
})
