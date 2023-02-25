import React from 'react'
import {Layout, Button} from 'antd'
import SingleAssessment from './SingleAssessment';
const  {Content, Footer} = Layout;

const data = [
  {
    key: '1',
    question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?',
    options:[
      {
      option1:'Not At all',
      option2:'Several Days',
      option3:'More Than Half the Days',
      option4:'Nearly Every Day',
     }
    ]
  },
  {
    key: '2',
    question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopless?',
    options:[
      {
        option1:'Not At all',
        option2:'Several Days',
        option3:'More Than Half the Days',
        option4:'Nearly Every Day',
       }
    ]
  },
  {
    key: '3',
    question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?',
    options:[
      {
        option1:'Not At all',
        option2:'Several Days',
        option3:'More Than Half the Days',
        option4:'Nearly Every Day',
       }
    ]
  },
  {
    key: '4',
    question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?',
    options:[
      {
        option1:'Not At all',
        option2:'Several Days',
        option3:'More Than Half the Days',
        option4:'Nearly Every Day',
       }
    ]
  },
  {
    key: '5',
    question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?',
    options:[
      {
        option1:'Not At all',
        option2:'Several Days',
        option3:'More Than Half the Days',
        option4:'Nearly Every Day',
       }
    ]
  },
  {
    key: '6',
    question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that you are a failure or have let yourself or your family down?',
    options:[
      {
        option1:'Not At all',
        option2:'Several Days',
        option3:'More Than Half the Days',
        option4:'Nearly Every Day',
       }
    ]
  },
  {
    key: '7',
    question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?',
    options:[
      {
        option1:'Not At all',
        option2:'Several Days',
        option3:'More Than Half the Days',
        option4:'Nearly Every Day',
       }
    ]
  },
  {
    key: '8',
    question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?',
    options:[
      {
        option1:'Not At all',
        option2:'Several Days',
        option3:'More Than Half the Days',
        option4:'Nearly Every Day',
       }
    ]
  },
  {
    key: '9',
    question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?',
    options:[
      {
        option1:'Not At all',
        option2:'Several Days',
        option3:'More Than Half the Days',
        option4:'Nearly Every Day',
       }
    ]
  },


]

const contentStyle = {
  display: 'flex',
  marginTop: '10px',
  flexDirection: 'column',
  marginLeft: '50px'
};

const footerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export default function Assessment() {
  return (
    
    <Content style={contentStyle}>
      {data.map( data =>(
      <SingleAssessment data ={data} key={data.key}/>
      ))}
      <Footer style={footerStyle}>
      <Button type='primary' size='large'> Submit</Button>
      </Footer>
    </Content>
  )
}
