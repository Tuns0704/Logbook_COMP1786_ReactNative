import React, { useState, useCallback } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useDbContext } from "../context/DbContext";
import { useFocusEffect } from '@react-navigation/native';
import { getImages } from '../services/db-service';
import Swiper from 'react-native-swiper';

const Home = ({ navigation }) => {
  const [images, setImage] = useState([]);
  const [error, setError] = useState(null);
  const db = useDbContext();

  const focusEffect = useCallback(function () {
    async function fetchData() {
      try {
        const images = await getImages(db);
        setImage(images);
      } catch (e) {
        setError(`An error occurred while retrieving the trips: ${e.message}`);
      }
    }
    fetchData();
  }, [db]);
  useFocusEffect(focusEffect);

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>SImage</Text>
      <View style={styles.imageContainer}>
        <Swiper
          showsButtons={true}
          loop
          dot={<View style={styles.dot}></View>}
          activeDot={<View style={styles.activeDot}></View>}
          buttonWrapperStyle={styles.buttonWrapper}
          nextButton={<Text style={styles.navigateButton}> &#8250; </Text>}
          prevButton={<Text style={styles.navigateButton}> &#8249; </Text>}
          paginationStyle={{
            bottom: 50,
          }}
        >
          {
            images.map((item, index) => {
              return (
                <View key={(item) => item.imageId}>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                </View>
              );
            })}
        </Swiper>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("AddImage")}>
        <Text style={styles.addButton}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    width: "100%",
    height: "100%",
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#3AB0FF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    position: "absolute",
    top: 60,
    width: 400,
    height: 400,
    alignSelf: 'center',
    alignContent: 'center',
  },
  image: {
    width: 360,
    height: 380,
    borderRadius: 10,
    alignSelf: 'center',
    alignContent: 'center',
  },
  dot: {
    backgroundColor: "#888",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
  activeDot: {
    backgroundColor: "#3AB0FF",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: -20, left: 0, flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navigateButton: {
    color: '#3AB0FF',
    fontSize: 60,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    textAlign: 'center',
    height: 50,
    width: 50,
    zIndex: 1,
    right: 25,
    bottom: -500,
    color: '#fff',
    backgroundColor: '#3AB0FF',
    fontSize: 30,
    borderRadius: 50,
  }
});

export default Home