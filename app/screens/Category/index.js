import React, {useState, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  CategoryFull,
  CategoryIcon,
  TextInput,
  Text,
} from '@components';
import * as Utils from '@utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {productActions} from '@actions';
import {settingSelect} from '@selectors';
import {FilterModel} from '@models';

export default function Category({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const setting = useSelector(settingSelect);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [modeView, setModeView] = useState('full');
  const [category, setCategory] = useState([]);
  const [origin, setOrigin] = useState([]);

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  /**
   * on Load data
   *
   */
  const loadData = () => {
    dispatch(
      productActions.onFetchCategory(null, (data) => {
        setCategory(data);
        setOrigin(data);
        setLoading(false);
        setRefreshing(false);
      }),
    );
  };
  /**
   * on Refresh category
   */
  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  /**
   * call when change mode view
   */
  const onChangeView = () => {
    Utils.enableExperimental();
    switch (modeView) {
      case 'full':
        setModeView('icon');
        break;
      case 'icon':
        setModeView('full');
        break;
    }
  };

  /**
   * call when search category
   */
  const onSearch = (search) => {
    if (!search) {
      setCategory(origin);
    } else {
      setCategory(
        category.filter((item) => {
          return item.title.toUpperCase().includes(search.toUpperCase());
        }),
      );
    }
  };

  /**
   * render Item category
   * @param {*} item
   * @param {*} index
   * @returns
   */
  const renderItem = (item, index) => {
    switch (modeView) {
      case 'icon':
        return (
          <CategoryIcon
            // icon={Utils.iconConvert(item.icon)}
            // color={item.color}
            title={item.title}
            releaseYear={item.releaseYear}
            // subtitle={item.count.toString()}
            onPress={() => {
              const filter = new FilterModel();
              filter.category = [item];
              filter.perPage = setting.perPage;
              navigation.navigate('List', {filter});
            }}
            style={[styles.itemIcon, {borderColor: colors.border}]}
          />
        );
      case 'full':
        return (
          <CategoryFull
            image={item.image?.full}
            // color={item.color}
            // icon={Utils.iconConvert(item.icon)}
            title={item.title}
            // subtitle={item.count.toString()}
            releaseYear={item.releaseYear}
            onPress={() => {
              const filter = new FilterModel();
              filter.category = [item];
              filter.perPage = setting.perPage;
              navigation.navigate('List', {filter});
            }}
            style={{
              marginBottom: 15,
            }}
          />
        );
      default:
        break;
    }
  };

  /**
   * render content
   * @returns
   */
  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerView}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <TextInput
            onChangeText={(text) => setSearch(text)}
            placeholder={t('search')}
            value={search}
            onSubmitEditing={() => onSearch(search)}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setSearch('');
                  onSearch('');
                }}>
                <Icon name="times" size={16} color={BaseColor.grayColor} />
              </TouchableOpacity>
            }
          />
        </View>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={category ?? []}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item, index}) => renderItem(item, index)}
          ListEmptyComponent={
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <Icon
                  name="frown-open"
                  size={18}
                  color={colors.text}
                  style={{marginBottom: 4}}
                />
                <Text>{t('data_not_found')}</Text>
              </View>
            </View>
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('category')}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Icon
              name={modeView == 'full' ? 'th-large' : 'th-list'}
              size={20}
              color={BaseColor.grayColor}
            />
          );
        }}
        onPressRight={onChangeView}
      />
      {renderContent()}
    </SafeAreaView>
  );
}
