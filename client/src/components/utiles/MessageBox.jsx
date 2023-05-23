import React from 'react';
import Alert from 'react-bootstrap/Alert';  

// This is the message function which holds the message from the backend with preferable bg  colors
// The background color for each meassage is determined by the "color" variable assigned to variant

const MessageBox = (color) => {
  return (
    <Alert variant={color.variant || 'info'} className="message-box">
      {color.children}
    </Alert>
  );
};

export default MessageBox;
