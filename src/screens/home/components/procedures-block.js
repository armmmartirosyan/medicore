import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {HeadText, ProcedureCard} from '@components';
import {useNavigation} from '@react-navigation/native';
import {useGetVisitProcedures} from '@api-hooks';
import {useQueryClient} from 'react-query';
import {getSize} from '@utils';

export function ProceduresBlock() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [procedures, setProcedures] = useState([]);
  const [allowNext, setAllowNext] = useState(false);
  const [page, setPage] = useState(1);

  useGetVisitProcedures({
    page,
    options: {
      onSuccess: data => {
        setAllowNext(data?.data?.allowNext);
        setProcedures(prev => [...prev, ...data?.data?.data]);
      },
    },
  });

  const handleEndReached = () => {
    if (allowNext) {
      setPage(prev => ++prev);
    }
  };

  const onSuccess = () => {
    setProcedures([]);
    setAllowNext(false);
    setPage(1);
    queryClient.invalidateQueries(['get-visit-procedures']);
    navigation.goBack();
  };

  return (
    <>
      <HeadText style={styles.headText}>Procedures</HeadText>
      <FlatList
        data={procedures}
        style={styles.list}
        keyExtractor={p => p.id}
        onEndReached={handleEndReached}
        renderItem={({item}) => (
          <ProcedureCard
            key={item.key}
            procedure={item}
            onPress={() =>
              navigation.navigate('ProcedureDetails', {
                onSuccess,
                id: item.id,
              })
            }
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  headText: {
    marginTop: getSize(10),
    marginBottom: getSize(20),
    textAlign: 'center',
  },
});
