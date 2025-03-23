import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS, COLORS} from '@constants';
import {getSize} from '@utils';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

export function Select({
  data,
  onSelect,
  placeholder,
  renderCurrentItem,
  onScrollEndReached,
  containerStyle = {},
}) {
  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      showsVerticalScrollIndicator={false}
      onScrollEndReached={onScrollEndReached}
      dropdownStyle={styles.dropdownMenuStyle}
      renderButton={(selectedItem, isOpen) => {
        const hasSelectedItem = selectedItem && renderCurrentItem(selectedItem);

        return (
          <View style={{...styles.dropdownButtonStyle, ...containerStyle}}>
            <Text
              style={{
                ...styles.dropdownButtonTxtStyle,
                ...(hasSelectedItem && {color: COLORS.PRIMARY_BLUE}),
              }}>
              {hasSelectedItem || placeholder}
            </Text>
            <FontAwesomeIcon
              icon={isOpen ? faAngleUp : faAngleDown}
              size={15}
              color={
                hasSelectedItem ? COLORS.PRIMARY_BLUE : COLORS.PLACEHOLDER_BLUE
              }
            />
          </View>
        );
      }}
      renderItem={(item, _, isSelected) => (
        <View
          style={{
            ...styles.dropdownItemStyle,
            ...(isSelected && {backgroundColor: COLORS.SOLITUDE_BLUE}),
          }}>
          <Text
            style={{
              ...styles.dropdownItemTxtStyle,
              ...(isSelected && {color: COLORS.PRIMARY_BLUE}),
            }}>
            {renderCurrentItem(item)}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '100%',
    height: getSize(45),
    paddingHorizontal: getSize(13),
    borderRadius: getSize(13),
    backgroundColor: COLORS.SOLITUDE_BLUE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: getSize(18),
    color: COLORS.PLACEHOLDER_BLUE,
    fontFamily: FONTS.REGULAR,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: 'red',
  },
  dropdownMenuStyle: {
    backgroundColor: 'white',
    borderRadius: getSize(13),
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: getSize(13),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: getSize(18),
    color: COLORS.PROFOUND_BLACK,
    fontFamily: FONTS.REGULAR,
  },
});
