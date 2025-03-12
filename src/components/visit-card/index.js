import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '@constants';
import moment from 'moment';

export function VisitCard({item, visits}) {
  const filteredVisits = useMemo(() => {
    const arr = visits.filter(v => {
      const visitDate = moment(new Date(v.startScheduledDate)).format(
        'YYYY-MM-DD',
      );
      const itemDate = moment(new Date(item)).format('YYYY-MM-DD');

      return moment(itemDate).isSame(visitDate);
    });

    arr.sort((a, b) => {
      const aDate = new Date(a.startScheduledDate);
      const bDate = new Date(b.startScheduledDate);

      return aDate - bDate;
    });

    return arr;
  }, [visits, item]);

  return (
    <View style={styles.container}>
      <View style={styles.dayContainer}>
        <Text style={styles.dayMonth}>{moment(item).format('MMM D')}</Text>
        <Text style={styles.weekDay}>{moment(item).format('dddd')}</Text>
      </View>
      {filteredVisits.length ? (
        filteredVisits.map((visit, index) => (
          <View style={styles.visitCard} key={visit.id}>
            <View style={styles.timeContainer}>
              <Text style={styles.startTime}>
                {moment(visit.startScheduledDate).format('HH:MM')}
              </Text>
              <Text style={styles.endTime}>
                {moment(visit.endScheduledDate).format('HH:MM')}
              </Text>
            </View>
            <View style={styles.dash} />
            <View style={styles.nameContainer}>
              <Text style={styles.doctorName}>{visit.doctorName}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noVisitText}>No Registration</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dayMonth: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.PRIMARY_BLUE,
    fontSize: 18,
  },
  weekDay: {
    fontFamily: FONTS.LIGHT,
    color: COLORS.PRIMARY_BLUE,
    fontSize: 14,
    marginLeft: 10,
  },
  noVisitText: {
    fontFamily: FONTS.LIGHT,
    color: COLORS.GRAYISH,
    fontSize: 14,
    marginLeft: 15,
    marginBottom: 15,
  },
  visitCard: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    width: 70,
  },
  dash: {
    width: 2,
    height: '100%',
    backgroundColor: COLORS.ACTIVE_BLUE,
    borderRadius: 3,
  },
  nameContainer: {
    marginLeft: 15,
  },
  startTime: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    fontSize: 16,
    marginBottom: 5,
  },
  endTime: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAYISH,
    fontSize: 12,
  },
  doctorName: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    fontSize: 16,
  },
});
