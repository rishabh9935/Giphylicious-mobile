import { StyleSheet, Text, View, Animated, TouchableOpacity, Linking, Button, useColorScheme } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import GifPlayer from 'react-native-gif'
import DownloadGif from './DownloadGif'
import themeContext from './themeContext'
import theme from './theme'

const GifCard = ({gifUrl, title, from, imgUrl}) => {
  const theme = useContext(themeContext);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleTogglePlay = () => {
    setIsPlaying(isp => !isp);
  }

  const shareToWhatsApp = (text) => {
    Linking.openURL(`whatsapp://send?text=${text}`);
  }

  return (
    <View style = {[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <TouchableOpacity activeOpacity={0.5} onPress={handleTogglePlay}>
        {isPlaying ? (
          <GifPlayer
           style={styles.gifImage}
           source={{uri: gifUrl}}
           paused={!isPlaying}
         />
        ) : (
          <GifPlayer
            style={styles.gifImage}
            source={{uri: imgUrl}}
            />
        )}
       
      </TouchableOpacity>        
      <Text style={{fontWeight:'bold', margin: 5, color: theme.color}} >{title} by {from}</Text>
      <TouchableOpacity onPress={() => shareToWhatsApp(`Please checkout this gif: ${gifUrl}`)}>
      <DownloadGif gifUrl = {gifUrl} />
      <Button
        onPress={() => shareToWhatsApp(`Please checkout this gif: ${gifUrl}`)}
        title="Share on Whatsapp"
        color="#25D366"
        accessibilityLabel="Learn more about this purple button"
      />
      </TouchableOpacity>
    </View>
  )
}

export default GifCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#383838',
        margin: 10,
        borderRadius: 10
    },
    gifImage: {
      width: "100%" , height: 300, borderTopLeftRadius: 10, borderTopRightRadius: 10

    }
})