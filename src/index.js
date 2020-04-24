import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase/app';
import Jotly from './Jotly';

import 'firebase/auth';
import 'firebase/firestore';

render(
	<Jotly />,
	document.getElementById('__root__')
);