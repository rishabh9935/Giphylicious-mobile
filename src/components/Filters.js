import {  Text, View } from 'react-native'
import React, {useState} from 'react'
import ModalDropdown from 'react-native-modal-dropdown';
import { AntDesign } from '@expo/vector-icons';
import config from '../config';

const Filters = ({setNews, getNews}) => {
    const [value, setValue] = useState('General');
    const search_query = async(filter) =>  {
        await fetch(`https://newsapi.org/v2/everything?q=${filter}&language=en&sortBy=relevancy&apiKey=${config.API_KEY}`)
        .then(response => response.json())
        .then(responseJson => {
          setNews(responseJson.articles);
        }).catch(error => {
          console.error(error);
        })
      }
  return (
    <View style={{height: 40, borderWidth:2 , margin: 5,padding: 5, backgroundColor: '#DDDDDD' }} >
      <ModalDropdown
        style = {{flex:1,}}
        animated = {true}
        options = {['General', 'Top-Headlines', 'Business', 'Entertainment', 'Science', 'Sports', 'Technology']}
        defaultValue = "General"
        dropdownTextStyle = {{color: 'black', fontSize: 20}}
        dropdownStyle = {{width: '100%'}}
        dropdownTextHighlightStyle = {{fontWeight: 'bold'}}
        onSelect = {(index, value) => {
            if(value === "General") getNews();
            search_query(value)
            setValue(value) 
        }}
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style = {{fontSize: 20 , fontWeight: 'bold'}}>{value}</Text>
          <AntDesign name="caretdown" size={20} color="black" />
        </View>
      </ModalDropdown>
    </View>
  )
}

export default Filters
