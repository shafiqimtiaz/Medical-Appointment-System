import React, { useState } from 'react'
import {Typography, Radio, Space, Layout} from 'antd';
const {Text} = Typography;
const {Content} = Layout;

const contentStyle = {
    display: 'flex',
    marginTop: '10px',
    flexDirection: 'column',
    marginLeft: '20px',
    marginRight: '20px',
    paddingBottom: '20px'
  };
  const textStyle = {
    paddingBottom: '10px',
    fontSize: '14px',
    
};

export default function SingleAssessment({data}) {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);  
    }  
  return (
    <Content style={contentStyle}>
    <Text style={textStyle}>{data.question}</Text>
    <Radio.Group onChange={onChange} value={value}>
    <Space direction="vertical">
        <Radio value={1}>{data.options[0].option1}</Radio>
        <Radio value={2}>{data.options[0].option2}</Radio>
        <Radio value={3}>{data.options[0].option3}</Radio>
        <Radio value={4}>{data.options[0].option4}</Radio>
    </Space>
    </Radio.Group>
    </Content>
  )
}
