import React from 'react'
import {Text,View,TextInput,TouchableOpacity,FlatList,StyleSheet} from 'react-native'
import db from '../config'

export default class SearchScreen extends React.Component{
    constructor(props){
        super(props);
this.state = {
    alldonors:[],
    search:'',
    lastVisibleDonor:null
}
    }
    searchDonors=async(text)=>{
var text = text.toUpperCase()
var enteredText = text.split("")
if(enteredText[0].toUpperCase()==='B'){
    const Donor = await db.collection("Donor").where("BloodGroup",'==',text).get()
    Donor.docs.map((doc)=>{
        this.setState({
            alldonors:[...this.state.alldonors,doc.data()],
            lastVisibleDonor:doc
        })
    })
}
    if(enteredText[0].toUpperCase()==='C'){
        const Donor = await db.collection("Donor").where("City",'==',text).get()
        Donor.docs.map((doc)=>{
            this.setState({
                alldonors:[...this.state.alldonors,doc.data()],
                lastVisibleDonor:doc
            })
        })
    }
    }
    fetchMoreDonor=async()=>{
        var text = this.state.search.toUpperCase()
        var enteredText = text.split("")
        if(enteredText[0].toUpperCase()==='B'){
            const Donor = await db.collection("Donor").where("BloodGroup",'==',text).startAfter(this.state.lastVisibleDonor).limit(10).get()
            Donor.docs.map((doc)=>{
                this.setState({
                    alldonors:[...this.state.alldonors,doc.data()],
                    lastVisibleDonor:doc
                })
            })
        }
            if(enteredText[0].toUpperCase()==='C'){
                const Donor = await db.collection("Donor").where("City",'==',text).startAfter(this.state.lastVisibleDonor).limit(10).get()
                Donor.docs.map((doc)=>{
                    this.setState({
                        alldonors:[...this.state.alldonors,doc.data()],
                        lastVisibleDonor:doc
                    })
                })
            }
            }
    componentDidMount=async()=>{
          const query = await db.collection("Donor").limit(10).get(
              query.docs.map((doc)=>{
                  this.setState({
                     alldonors:[],
                     lastVisibleDonor:doc
                  })
              })
          )
      }
   
    render(){
return(
<View style={styles.container}>
<View style={styles.searchbar}>
    <TextInput style={styles.bar}placeholder="Enter BloodGroup"onChangeText={(text)=>{this.setState({
        search:text
    })}}></TextInput>
    <TouchableOpacity style={styles.searchbutton}onPress={()=>{
        this.searchDonors(this.state.search)
        
    }}>
        <Text>Search</Text>
    </TouchableOpacity>
</View>
<FlatList data={this.state.alldonors}
renderItem={({item})=>(
<View style={{borderBottomWidth:2}}>
<Text>{'BloodGroup:'+item.BloodGroup}</Text>
<Text>{'Name:'+item.Name}</Text>
<Text>{'Age:'+item.Age}</Text>
<Text>{'Date:'+item.date.toDate()}</Text>
<Text>{'PhoneNumber:'+item.PhoneNumber}</Text>
<Text>{'City:'+item.City}</Text>
</View>
)} keyExtractor={(item,index)=>index.toString()} onEndReached={this.fetchMoreDonor} onEndReachedThreshold={0.7}>
    
</FlatList>
</View>
);
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20
    },
    searchbar:{
flexDirection:'row',
height:40,
width:'auto',
borderWidth:0.5,
alignItems:'center',
backgroundColor:'white'
    },
    bar:{
borderWidth:2,
height:30,
width:300,
paddingLeft:10
    },
    searchbutton:{
        borderWidth:1,
        height:30,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'green'
    }
})

