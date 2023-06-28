import {  View, TextInput } from 'react-native'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import config from '../config';

const SearchBar = ({setGif, getGif, setOffset}) => {
  const [search, setSearch] = useState('');
  const search_query = async() =>  {
    await fetch(`https://api.giphy.com/v1/gifs/search?api_key=a5UryVYd2nzN7DDEq47XGAKgxKWjzFIP&q=${search}`)
    .then(response => response.json())
    .then(responseJson => {
      setGif(responseJson.data);
    }).catch(error => {
      console.error(error);
    })
  }
  // not working as expected
  const show_trending = async () => {
    await setGif([]);
    await setOffset(0);
    getGif();
  }
  return (
    <View style={{  flexDirection: 'row', margin: 5, backgroundColor: '#DDDDDD', borderWidth:1 }}>
      <View style={{padding: 5}}><AntDesign name="search1" size={30} color="black" /></View>
      <TextInput
        style={{
          height: 40,
          fontSize: 20,
          flex:1,  
        }}
        placeholder="Search"
        onChangeText={setSearch}
        onSubmitEditing={search.length === 0? show_trending : search_query}
        value = {search}
      />
    </View>
  )
}

export default SearchBar
