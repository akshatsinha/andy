import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

export default class Andy extends Component {

  state = {
    url: `http://blank.org/`,
    text_for_html: '',
    status: `No Page Loaded`,
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    scalesPageToFit: true,
    isImage: false
  }

  constructor(props) {
    super(props)
  }

  onWebLoad() {
    setInterval(() => {
      fetch(`https://thawing-springs-46050.herokuapp.com/result_url`)
      // fetch(`http://localhost:8080/result_url`)
        .then(resp => resp.json())
        .then(res => {
          console.log('====> ', res)
          var toOpen = res.uri;
          if (toOpen != this.state.url) {
            this.setState({
              url: toOpen,
              text_for_html: res.text_for_html,
              isImage: toOpen === 'http://reallancastercounty.com/wp-content/uploads/2012/03/auction-bid-2-lg-gt_full_width_landscape.jpg' ? true : false
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 2000);
  }

  render() {
    return (

        <View style={{flex: 1, paddingTop: 23}}>
          {
            !this.state.isImage &&
            <WebView
              onLoad={this.onWebLoad.bind(this)}
              source={{uri: this.state.url}}
              style={{marginBottom: 0, flex: 1}}
              scalesPageToFit={true}
            />
          }

          {
            this.state.isImage &&
            <Image
              source={{uri: this.state.url}}
              style={{resizeMode: "cover", flex: 1}}
            />
          }

          <View style={{backgroundColor: '#ffe300', height: 3}} />

          <View style={{backgroundColor: '#e6eff4', height: 150, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#0d024a', fontFamily: 'Arial', fontSize: 36}}>{this.state.text_for_html}</Text>
          </View>

        </View>

    );
  }
}

// const styles = StyleSheet.create({
//   // linear-gradient(90deg,#ffe300 0,#ffe300 33%,#59cf1f 0,#59cf1f 66%,#0099ed 0,#0099ed)
//   // container: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   //   backgroundColor: '#F5FCFF',
//   // }
// });

AppRegistry.registerComponent('Andy', () => Andy);
