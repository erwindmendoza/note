import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import logo from '../assets/note.png'

const About = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text style={styles.aboutText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum vestibulum dui vel finibus. Praesent iaculis, erat et fermentum volutpat, nunc augue vulputate metus, ac aliquet sapien mauris quis eros. Cras mollis viverra porta. Nulla arcu nulla, cursus sit amet libero et, pharetra sollicitudin elit. In in dignissim leo. Pellentesque cursus nulla eget ex vestibulum ultricies. Cras quam nisl, sollicitudin sit amet nisl ut, vulputate sagittis nulla. Nullam in arcu id elit pharetra vulputate. Donec vel cursus nulla, sed consequat ligula. Maecenas sit amet tempus dui, vel tempus odio. Proin et imperdiet metus. Quisque sit amet lectus quis magna scelerisque lobortis ut sed ex. Vestibulum commodo luctus egestas. Etiam id leo in sem vehicula tristique. Aenean magna lectus, laoreet vitae mauris eu, suscipit convallis orci. Etiam eget molestie justo.
        </Text>
      </View>
      <Text style={styles.versionText}>
        App Version 1.0.0
      </Text>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
    display:'flex',
    justifyContent:'space-between',
  },
  wrapper: {
    display:'flex',
    alignItems:'center'
  },
  content: {
    padding:20,
    display:'flex',
    alingItems:'center',
    backgroundColor:'white',
    maxWidth:200,
    borderRadius:10,
    marginBottom:20,
  },
  logo: {
    width:150,
    height:150,
    borderRadius:10,
    opacity:0.7
  },
  aboutText: {
    color:'#404040',
    marginBottom:15,
    textAlign:'justify'
  },
  versionText: {
    textAlign:'center',
    color:'#9f9f9f'
  }
})