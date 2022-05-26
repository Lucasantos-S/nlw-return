import React, {useRef, useState} from "react";
import { View, TouchableOpacity } from "react-native";
import {ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC} from 'react-native-gesture-handler'
import { styles } from "./styles";
import { theme } from "../../theme";
import { Options} from '../Options'
import { Success} from '../Success'
import { Form} from '../Form'
import {feedbackTypes} from '../../utils/feedbackTypes'

export type FeedbackTypes = keyof typeof feedbackTypes;

 function Widget() {
  const [feedbackTypes, setFeedbackTypes] = useState<FeedbackTypes | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)
  const buttonSheetRef =  useRef<BottomSheet>(null)
  function handleOpen() {
    buttonSheetRef.current?.expand()
  }

  function handleRestartFeedback() {
    setFeedbackTypes(null);
    setFeedbackSent(false)
  }

  function handleFeedbackSent() {
    setFeedbackSent(true)
  }
  return(

    
    <>
    <TouchableOpacity 
      style={styles.button}
      onPress= {handleOpen}
    >
      <ChatTeardropDots
      size ={24}
      weight="bold"
      color ={theme.colors.text_on_brand_color}
      >
        
      </ChatTeardropDots>

    </TouchableOpacity>
    <BottomSheet 
    ref={buttonSheetRef}
    snapPoints = {[1, 280]}
    backgroundStyle= {styles.modal}
    handleIndicatorStyle = {styles.indicator}
    >
    {
      feedbackSent ? 
      <Success onSendAnotherFeedback ={handleRestartFeedback}/>
      :
      <>
        {
          feedbackTypes ? 
          <Form 
          
            feedbackType={feedbackTypes}
            onFeedbackCanceled ={handleRestartFeedback}
            onFeedbackSent ={handleFeedbackSent}
        
        />
        :
        <Options onFeedbackTypeChanged={setFeedbackTypes}/>
        }
      </>
    }

    </BottomSheet>
    </>
  )
  
}

export default gestureHandlerRootHOC(Widget)
