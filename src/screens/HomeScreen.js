import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Animated, useColorScheme, Switch } from "react-native";
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import NewsCard from "../components/GifCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import GifCard from "../components/GifCard";
import { EventRegister } from 'react-native-event-listeners';
import themeContext from "../components/themeContext";
import theme from "../components/theme";


const HomeScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useContext(themeContext)
  const [gif, setGif] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchPressed, setSearchPressed] = useState(false);
  

  const getGif = async () => {
    try {
      setLoading(true);
      await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=a5UryVYd2nzN7DDEq47XGAKgxKWjzFIP&offset=${offset}&limit=10`)
        .then((response) => response.json())
        .then((responseJson) => {
          setGif(prevgifs => [...prevgifs, ...responseJson.data]);
          setLoading(false);
          setOffset(offset => offset + 10);
          console.log("api called with offset: ", offset);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleLoadMore = () => {
    if(!loading) {
      getGif();
    }
  }

  // !check
  const renderFooter = () => {
    <View>
      {loading && <ActivityIndicator size="small" color="#000000" />}
    </View>
  }

  useEffect(() => {
    getGif();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Trending Gif",
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: theme.backgroundColor },
      headerTitleStyle: { color: '#0000FF' },
      headerRight: () => (
        <View style={{ marginRight: 10, backgroundColor: theme.backgroundColor}}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={() => setSearchPressed((searchPressed) => !searchPressed)}>
            <AntDesign name="search1" size={24} color="#0000FF" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor}}>
      <Switch 
          value={darkMode}
          onValueChange={(value) => {
            setDarkMode(value)
            EventRegister.emit('ChangeTheme', value)
          }}
        />
      {/* {loading === true ? (
        <Text style={{ color: "white", fontSize: 20, textAlign: "center", marginTop: "50%" }}>Loading...</Text>
      ) : ( */}
        <>
          {searchPressed ? <SearchBar setGif={setGif} getGif={getGif} setOffset={setOffset} /> : null}
          {gif.length === 0  ? (
            <Text style={{ color: "white", fontSize: 20, textAlign: "center", marginTop: "50%", color: theme.color }}>Loading...</Text>
          ) : (
              <FlatList
                data={gif}
                keyExtractor={(item) => item.id}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                bounces={false}
                overScrollMode="never"
                renderItem={({ item }) => {
                  return (
                    <GifCard
                      gifUrl={item.images.fixed_height.url}
                      title={item.title}
                      from={item.username}
                      imgUrl={item.images.fixed_height_still.url}
                    />
                  );
                }}
              />
          )}
        </>
    </View>
  );
};

export default HomeScreen;