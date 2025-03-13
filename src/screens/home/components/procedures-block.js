import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {HeadText, ProcedureCard} from '@components';
import {
  Procedure1 as procedure1,
  Procedure2 as procedure2,
  Procedure3 as procedure3,
} from '@images';
import {useNavigation} from '@react-navigation/native';
import {useGetProcedures} from '@api-hooks';

const procedures = [
  {
    id: 1,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Procedure',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [],
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: '2025-02-02',
  },
  {
    id: 2,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Teeth Cleaning',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: '2025-02-02',
  },
  {
    id: 3,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Root Canal',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
  {
    id: 4,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Whitening',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
  {
    id: 5,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Procedure',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
  {
    id: 6,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Teeth Cleaning',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
  {
    id: 7,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Root Canal',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
  {
    id: 8,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Whitening',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
];

export function ProceduresBlock() {
  const navigation = useNavigation();
  const [allowNext, setAllowNext] = useState(false);
  const [page, setPage] = useState(1);

  const {data: proceduress} = useGetProcedures({
    page,
    options: {
      onSuccess: data => {
        setAllowNext(data?.allowNext);
      },
    },
  });

  const handleEndReached = () => {
    if (allowNext) {
      setPage(prev => ++prev);
    }
  };

  console.log({proceduress});

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
              navigation.navigate('ProcedureDetails', {procedure: item})
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
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
});
