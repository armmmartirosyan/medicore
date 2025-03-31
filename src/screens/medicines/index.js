import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useGetMedicinesAssigned} from '@api-hooks';
import {HeadText, MedicineCard} from '@components';
import {withSafeArea} from '@hoc';
import {useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {getSize} from '@utils';

function MedicinesComponent() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [medicinesAssigned, setMedicinesAssigned] = useState([]);
  const [allowNext, setAllowNext] = useState(false);
  const [page, setPage] = useState(1);

  useGetMedicinesAssigned({
    page,
    options: {
      onSuccess: data => {
        setAllowNext(data?.data?.allowNext);
        setMedicinesAssigned(prev => [...prev, ...data?.data?.data]);
      },
    },
  });

  const handleEndReached = () => {
    if (allowNext) {
      setPage(prev => ++prev);
    }
  };

  const onSuccess = () => {
    setMedicinesAssigned([]);
    setAllowNext(false);
    setPage(1);
    queryClient.invalidateQueries(['get-medicines-assigned']);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeadText style={styles.headerText}>Assigned Medicines</HeadText>
      <FlatList
        style={styles.list}
        data={medicinesAssigned}
        keyExtractor={ma => ma.id}
        onEndReached={handleEndReached}
        renderItem={({item}) => (
          <MedicineCard key={item.key} medicine={item} onSuccess={onSuccess} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getSize(20),
  },
  headerText: {
    textAlign: 'center',
    marginTop: getSize(20),
    marginBottom: getSize(20),
  },
  list: {
    flex: 1,
  },
});

export const Medicines = withSafeArea(MedicinesComponent);
