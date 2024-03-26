import React from 'react';
import { FaUser } from 'react-icons/fa';
import { MdPhoneInTalk } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


const ReactIcons = () => {
  const userIcon = <FaUser />;
  const phoneIcon = <MdPhoneInTalk />
  const emailIcon = <MdEmail />
  const passwordIcon = <RiLockPasswordFill />
  
  return { userIcon, phoneIcon, emailIcon, passwordIcon };
};

export default ReactIcons;
