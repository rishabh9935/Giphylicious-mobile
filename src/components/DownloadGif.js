import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';
import { Button, View } from 'react-native';
import * as Location from 'expo-location';

const DownloadGif = ({gifUrl}) => {

    const handleDownload = async () => {
        let date = moment().format('YYYYMMDDhhmmss')
        let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
        try {
            const res = await FileSystem.downloadAsync(gifUrl, fileUri)
            saveFile(res.uri);
        } catch (err) {
            console.log("FS Err: ", err)
        }
        
    }

    const saveFile = async (fileUri) => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
            try {
                alert("Downloaded!")
                const asset = await MediaLibrary.createAssetAsync(fileUri);
                const album = await MediaLibrary.getAlbumAsync('Download');
                if (album == null) {
                    await MediaLibrary.createAlbumAsync('Download', asset, false);
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }
                
            } catch (err) {
                console.log("Save err: ", err)
            }
            
        } else if (status === "denied") {
            alert("please allow permissions to download")
        }
}

return (
    <View>
        <Button
            title="Download"
            onPress={handleDownload}
        />
    </View>
    )
}

export default DownloadGif;