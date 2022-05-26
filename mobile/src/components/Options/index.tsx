import React from "react";
import { View , Text } from "react-native";
import { styles } from "./styles";
import { Copyright } from "../Copyright";
import {FeedbackTypes} from '../Widget'

import { feedbackTypes } from '../../utils/feedbackTypes'
import { Option } from "../Option";

interface Props {
  onFeedbackTypeChanged: (feedbackTypes: FeedbackTypes) => void
}

export function Options({onFeedbackTypeChanged}: Props) {
  return (
    <View style={styles.container}>
      <Text style= {styles.title}>
        Deixe seu feedback
      </Text>
    <View 
    style={styles.options}>
      {
        Object
        .entries(feedbackTypes)
        .map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onFeedbackTypeChanged(key as FeedbackTypes)}
          />
        ) )
      }
    </View>
      <Copyright/>
    </View>
  )
  

} 

