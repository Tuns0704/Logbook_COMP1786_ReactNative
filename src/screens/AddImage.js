import React, { useState } from 'react'
import {
  TextInput,
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useDbContext } from "../context/DbContext";
import { insertImage } from "../services/db-service";


const AddImage = ({ navigation }) => {
  const [url, setUrl] = useState([]);
  const [error, setError] = useState(null);
  const db = useDbContext();

  function handleUrlChange(text) {
    setUrl(text);
  }

  function validateURL(url) {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    return regex.test(url);
  }

  async function handleUrlSubmit() {
    if (validateURL(url)) {
      try {
        await insertImage(db, url);
        Alert.alert(
          'Success',
          'Add Image successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home')
            }
          ],
          { cancelable: false }
        );
      } catch (e) {
        setError(`An error occurred while adding the Trip: ${e.message}`);
      }
    } else {
      Alert.alert("Please enter a valid URL", "The URL you entered is not valid!");
    }
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Enter image url"
        value={url}
        onChangeText={handleUrlChange}
      />
      <View style={styles.button}>
        <Button
          onPress={handleUrlSubmit}
          title="Add"
          color="#47B5FF"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: 350,
    alignSelf: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AddImage