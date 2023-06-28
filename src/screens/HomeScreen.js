import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Animated, useColorScheme, Switch } from "react-native";
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import GifCard from "../components/GifCard";
import themestyle from "../components/themestyle";
import ThemeContext from "../context/ThemeContext";
import { TRENDING_API_URL, API_KEY } from '@env';

const HomeScreen = ({ navigation }) => {
  const [gif, setGif] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchPressed, setSearchPressed] = useState(false);
  const {theme, toggleTheme} = useContext(ThemeContext);

  const getGif = async () => {
    try {
      setLoading(true);
      await fetch(`${TRENDING_API_URL}?api_key=${API_KEY}&offset=${offset}&limit=10`)
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
      headerStyle: { backgroundColor: themestyle[theme].background },
      headerTitleStyle: { color: themestyle[theme].color },
      headerRight: () => (
        <View style={{ marginRight: 10, backgroundColor: themestyle[theme].background }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={() => setSearchPressed((searchPressed) => !searchPressed)}>
            <AntDesign name="search1" size={24} color={themestyle[theme].color} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [theme]);

  return (
    <View style={{ flex: 1, backgroundColor: themestyle[theme].background}}>
      <Switch 
          value={theme === 'light' ? false : true}
          onValueChange={(value) => {
            toggleTheme();
          }}
      />
        <>
          {searchPressed ? <SearchBar setGif={setGif} getGif={getGif} setOffset={setOffset} /> : null}
          {gif.length === 0  ? (
            <Text style={{ color: "white", fontSize: 20, textAlign: "center", marginTop: "50%", color: theme.color }}>Loading...</Text>
          ) : (
              <FlatList
                data={gif}
                keyExtractor={(item) => item.id}
                initialNumToRender={10}
                onMomentumScrollBegin={() => {this.onEndReachedCalledDuringMomentum = false;}}
                onEndReached={() => {
                  if(!this.onEndReachedCalledDuringMomentum){
                    handleLoadMore();
                    this.onEndReachedCalledDuringMomentum = true;
                  }
                }}
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