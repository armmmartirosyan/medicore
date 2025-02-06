import React from 'react';
import {Text} from 'react-native';
import {withSafeArea} from '@hoc';

function ProcedureDetailsComponent() {
  return <Text>ProcedureDetails</Text>;
}

export const ProcedureDetails = withSafeArea(ProcedureDetailsComponent);
